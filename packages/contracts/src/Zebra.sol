// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DataStructure.sol";
import "./deps/IWEth.sol";
import "./gnosis-safe/proxies/GnosisSafeProxy.sol";
import "./gnosis-safe/base/GuardManager.sol";
import "./gnosis-safe/base/ModuleManager.sol";
import "./gnosis-safe/proxies/GnosisSafeProxyFactory.sol";
import "./ZebraModule.sol";
import "./ZebraInstaller.sol";

// dev P2 : 
// - reduce uint size when possible
// - handle payment in weth
// - optis on load twice same data
// - better handle operator for collection
// - derive time of loan from payment

/// @notice manager of the Zebra protocol, guard of all registered safes
/// @notice don't use with non-standard NFTs !
/// @author tobou.eth
contract Zebra is BaseGuard, ReentrancyGuard, EIP712, Ownable {
    event ZebraSafeDeploy(GnosisSafeProxy indexed safeProxy);
    event Rent(GnosisSafeProxy indexed renter, address indexed supplier, IERC721 indexed NFT, uint256 tokenId);

    GnosisSafeL2 immutable public GNOSIS_SAFE_SINGLETON;
    GnosisSafeProxyFactory immutable public FACTORY;
    ZebraModule immutable public ZEBRA_MODULE;
    IWEth immutable public WETH;
    ZebraInstaller immutable public INSTALLER;

    // config
    uint256 public minRentalDuration;
    uint256 public minRentalPricePerSecond;
    uint256 public devCut; // in basis points

    uint256 public devClaimable;

    mapping(GnosisSafeProxy => bool) public isZebraRegistered;
    mapping(address => uint256) public supplierNonce;
    mapping(address => uint256) public claimableBy;
    mapping(IERC721 => mapping(uint256 => Loan)) public loan;
    mapping(IERC721 => mapping(uint256 => address)) public supplierOf;

    /// @param WEth WETH9-like contract for the chain deployed on
    constructor(GnosisSafeProxyFactory factory, IWEth WEth, GnosisSafeL2 singleton) EIP712("Zebra", "1.0") {
        GNOSIS_SAFE_SINGLETON = singleton;
        FACTORY = factory;
        ZEBRA_MODULE = new ZebraModule();
        minRentalDuration = 1 hours;
        WETH = WEth;
        minRentalPricePerSecond = 57870370370370; // 25cts/day with $MATIC @ 0.5$
        devCut = 500; // 5%
        INSTALLER = new ZebraInstaller();
    }

    /// @notice deploys a zebra-allowed gnosis safe owned by `msg.sender`
    /// @return safe created zebra-registered gnosis safe
    function createZebraSafe() external returns(GnosisSafeProxy safe) {
        address[] memory owners = new address[](1);
        owners[0] = msg.sender;
        bytes memory installerDelegateCall = abi.encodeWithSelector(ZebraInstaller.install.selector, this, ZEBRA_MODULE);
        bytes memory data = abi.encodeWithSelector(GnosisSafe.setup.selector, 
            owners,                  /// @param _owners List of Safe owners.
            1,                       /// @param _threshold Number of required confirmations for a Safe transaction.
            address(INSTALLER),      /// @param to Contract address for optional delegate call.
            installerDelegateCall,   /// @param data Data payload for optional delegate call.
            address(0),              /// @param fallbackHandler Handler for fallback calls to this contract
            address(0),              /// @param paymentToken Token that should be used for the payment (0 is ETH)
            0,                       /// @param payment Value that should be paid
            address(0));             /// @param paymentReceiver Address that should receive the payment (or 0 if tx.origin)
        safe = FACTORY.createProxy(address(GNOSIS_SAFE_SINGLETON), data);
        isZebraRegistered[safe] = true;

        emit ZebraSafeDeploy(safe);
    }

    /// @notice called on execTransaction(), enforces the rules of renting
    /// @param to Destination address of Safe transaction.
    /// @param data Data payload of Safe transaction.
    /// @param operation Operation type of Safe transaction.
    function checkTransaction(
        address to,
        uint256,
        bytes calldata data,
        Enum.Operation operation,
        uint256,
        uint256,
        uint256,
        address,
        address payable,
        bytes memory,
        address
    ) external view {
        bytes4 selector = bytes4(data);
        IERC721 NFT = IERC721(to);

        // disallow modification of guard or module (could result in asset theft)
        if (to == msg.sender && (
            selector == GuardManager.setGuard.selector ||
            selector == ModuleManager.enableModule.selector ||
            selector == ModuleManager.disableModule.selector)){
            revert UnauthorizedGuardOrModuleUpdate();
        }
        
        // disallow any action that can lead to an asset transfer
        if (operation == Enum.Operation.DelegateCall) {revert UnauthorizedDelegateCall();}
        if (selector == IERC721.setApprovalForAll.selector) { // 1
            revert UnauthorizedOperation(to, data);
        } else if (selector == IERC721.approve.selector) { // 2
            ( ,uint256 tokenId) = abi.decode(data[4:], (address, uint256));
            if (assetIsRented(NFT, tokenId)){
                revert UnauthorizedOperation(to, data);
            }
        } else if (selector == safeTransferFromSelector ||
                   selector == IERC721.transferFrom.selector) { // 4
            ( , ,uint256 tokenId) = abi.decode(data[4:], (address, address, uint256));
            if (assetIsRented(NFT, tokenId)){
                revert UnauthorizedOperation(to, data);
            }
        } else if (selector == safeTransferFromPlusDataSelector) { // 5
            ( , ,uint256 tokenId, ) = abi.decode(data[4:], (address, address, uint256, bytes));
            if (assetIsRented(NFT, tokenId)){
                revert UnauthorizedOperation(to, data);
            }
        }

        // V1 design choice : after rental period, user can still use the asset as long as the owner doesn't
        // reclaim it or another user doesn't rent it
    }

    function checkAfterExecution(bytes32 txHash, bool success) external {}

    function getOfferDigest(Offer memory offer) view public returns(bytes32 digest) {
        digest = _hashTypedDataV4(keccak256(abi.encode(
            OFFER_TYPEHASH,
            offer.NFT, offer.tokenId, offer.pricePerSecond, offer.maxRentalDuration, offer.nonce
        )));
    }

    /// @notice rent an NFT, pay by sending ETH in msg.value
    function rent(
        uint256 duration,
        GnosisSafeProxy safe,
        Offer memory offer,
        bytes memory signature)
    payable external nonReentrant {
        bytes32 digest = getOfferDigest(offer);
        address signer = ECDSA.recover(digest, signature);
        
        if (duration < minRentalDuration || duration > offer.maxRentalDuration) {revert UnauthorizedDuration(duration);}
        if (msg.value != offer.pricePerSecond * duration) {revert IncorrectPayment(msg.value);}
        if (!isZebraRegistered[safe]) {revert UnregisteredRenter(safe);}
        if (offer.nonce != supplierNonce[signer]) {revert OfferDeleted(offer.nonce);}
        Loan memory currentLoan = loan[offer.NFT][offer.tokenId];
        if (currentLoan.endDate >= block.timestamp) {revert AssetUnavailable(currentLoan);}
        address assetHolder = offer.NFT.ownerOf(offer.tokenId);
        if (assetHolder == signer) {
            supplierOf[offer.NFT][offer.tokenId] = signer;
        } else {
            if (signer != supplierOf[offer.NFT][offer.tokenId]) {revert OrderOnNotOwnedAsset(signer);}
        }
        
        WETH.deposit{value: msg.value}();
        uint256 supplierRevenue = (msg.value * (MAX_BASIS_POINTS - devCut)) / MAX_BASIS_POINTS;
        claimableBy[signer] += supplierRevenue;
        devClaimable += msg.value - supplierRevenue;

        // gnosis safes are not NFT receivers by default
        offer.NFT.transferFrom(signer, address(safe), offer.tokenId);
        ZEBRA_MODULE.giveAllowanceToZebra(offer.NFT, offer.tokenId, IGnosisSafe(address(safe)));
        loan[offer.NFT][offer.tokenId] = Loan({
            renter: safe,
            endDate: block.timestamp + duration
        });

        emit Rent(safe, signer, offer.NFT, offer.tokenId);
    }

    // back office

    /// @notice call to delete all previously signed offer
    /// @dev always sign with the current nonce of supplier
    function revokeOffers() external {
        supplierNonce[msg.sender]++;
    }

    /// @notice call to claim what you gained as a supplier (sent in WETH)
    function claimRents() external {
        uint256 toSend = claimableBy[msg.sender];
        claimableBy[msg.sender] = 0;
        require(WETH.transferFrom(address(this), msg.sender, toSend));
    }

    /// @notice call to get back an asset, you will have to give allowance again if you want to keep your offers active
    /// @notice call will revert if your asset is being rented
    function claimAsset(IERC721 NFT, uint256 tokenId) external {
        Loan memory currentLoan = loan[NFT][tokenId];
        address assetHolder = NFT.ownerOf(tokenId);
        if (currentLoan.endDate >= block.timestamp) {revert AssetUnavailable(currentLoan);}
        if (msg.sender != supplierOf[NFT][tokenId]) {revert OrderOnNotOwnedAsset(msg.sender);}
        supplierOf[NFT][tokenId] = address(0);
        NFT.transferFrom(assetHolder, msg.sender, tokenId);
    }

    // admin

    function claimDevFees() external onlyOwner {
        uint256 toSend = devClaimable;
        devClaimable = 0;
        require(WETH.transferFrom(address(this), owner(), toSend));
    }

    // internal

    /// @dev selector can lead to the transfer of a rented asset
    function selectorIsUnsafe(bytes4 selector) internal pure returns(bool) {
        return (isATransferSelector(selector) ||
                selector == IERC721.approve.selector ||
                selector == IERC721.setApprovalForAll.selector);
    }

    function isATransferSelector(bytes4 selector) internal pure returns(bool) {
        return (selector == safeTransferFromSelector || 
                selector == safeTransferFromPlusDataSelector ||
                selector == IERC721.transferFrom.selector);
    }

    function assetIsRented(IERC721 NFT, uint256 tokenId) internal view returns(bool) {
        return supplierOf[NFT][tokenId] != address(0);
    }

    // fallback

    fallback() external {
        // We don't revert on fallback to avoid issues in case of a Safe upgrade
        // E.g. The expected check method might change and then the Safe would be locked.
    }
}