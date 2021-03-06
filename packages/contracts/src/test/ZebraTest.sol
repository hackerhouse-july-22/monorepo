// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "forge-std/Test.sol";
import "../gnosis-safe/proxies/GnosisSafeProxyFactory.sol";
import "../gnosis-safe/GnosisSafe.sol";
import "../deps/WEth.sol";

import "../Zebra.sol";

contract RandoContract {
    bool public somethingHasBeenDone;

    function doSomething() public {
        somethingHasBeenDone = true;
    }
}

/// @notice will create valid signatures as owner of the safe
contract Owner is ERC721Holder {
    bytes4 constant internal MAGICVALUE = bytes4(keccak256("isValidSignature(bytes32,bytes)"));

    function isValidSignature(bytes32, bytes memory) public pure returns (bytes4) {
        return MAGICVALUE;
    }
}

contract MyToken is ERC721, Ownable {
    using Counters for Counters.Counter;

    uint256 private plays;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("MyToken", "MTK") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function play(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender);
        plays++;
    }
}

contract ZebraTest is Test {
    uint256 constant alicePrivateKey = 0xA11CE;
    address immutable alice;
    Owner immutable owner; // treat as EOA
    address NFTHolder;
    GnosisSafeProxyFactory immutable factory;
    GnosisSafeL2 immutable singleton;
    WEth immutable WETH;
    MyToken internal myNFT;
    
    GnosisSafeProxy internal proxy;
    Zebra internal zebra;

    constructor() {
        owner = new Owner();
        factory = new GnosisSafeProxyFactory();
        WETH = new WEth();
        alice = vm.addr(alicePrivateKey);
        singleton = new GnosisSafeL2();
    }

    function setUp() public {
        zebra = new Zebra(factory, WETH, singleton);
        vm.prank(address(owner));
        proxy = zebra.createZebraSafe();
        NFTHolder = address(new Owner());
        myNFT = new MyToken();
        myNFT.safeMint(alice);
        myNFT.safeMint(alice);
        myNFT.safeMint(alice);
    }

    // signature format : 65 bytes : 32 r + 32 s + 1 v (uint8) in this order

    /// @dev returns signature of digest by alice's private key
    function sign(bytes32 digest) internal returns(bytes memory signature) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(alicePrivateKey, digest);
        return bytes.concat(r, s, bytes1(v));
    }

    function execCall(address to, bytes memory call) internal {
        bytes memory emptyBytes;
        bytes32 owner32 = bytes32(bytes.concat(bytes12(emptyBytes),bytes20(address(owner))));
        bytes memory signature = bytes.concat(
            owner32,             // r
            bytes32(uint256(1)), // s
            bytes1(uint8(1))     // v
        );
        bytes32 txHash = GnosisSafe(payable(proxy)).getTransactionHash(
            to,
            0, 
            call,
            Enum.Operation.Call,
            0, 
            0, 
            0,
            address(0), 
            payable(0),
            1);
        vm.prank(address(owner));
        GnosisSafe(payable(proxy)).approveHash(txHash);
        vm.prank(address(owner));
        GnosisSafe(payable(proxy)).execTransaction(
            to,
            0, 
            call,          /// @param data Data payload of Safe transaction.
            Enum.Operation.Call,
            0, 
            0, 
            0,
            address(0), 
            payable(0), 
            signature);
    }

    function execCallShouldRevert(address to, bytes memory call, bytes4 errorSelector) internal {
        bytes memory emptyBytes;
        bytes32 owner32 = bytes32(bytes.concat(bytes12(emptyBytes),bytes20(address(owner))));
        bytes memory signature = bytes.concat(
            owner32,             // r
            bytes32(uint256(1)), // s
            bytes1(uint8(1))     // v
        );
        bytes32 txHash = GnosisSafe(payable(proxy)).getTransactionHash(
            to,
            0, 
            call,
            Enum.Operation.Call,
            0, 
            0, 
            0,
            address(0), 
            payable(0),
            1);
        vm.startPrank(address(owner));
        GnosisSafe(payable(proxy)).approveHash(txHash);
        vm.expectRevert(errorSelector);
        GnosisSafe(payable(proxy)).execTransaction(
            to,
            0, 
            call,          /// @param data Data payload of Safe transaction.
            Enum.Operation.Call,
            0, 
            0, 
            0,
            address(0), 
            payable(0), 
            signature);
        vm.stopPrank();
    }

    function execCallShouldRevert(address to, bytes memory call, bytes memory errorData) internal {
        bytes memory emptyBytes;
        bytes32 owner32 = bytes32(bytes.concat(bytes12(emptyBytes),bytes20(address(owner))));
        bytes memory signature = bytes.concat(
            owner32,             // r
            bytes32(uint256(1)), // s
            bytes1(uint8(1))     // v
        );
        bytes32 txHash = GnosisSafe(payable(proxy)).getTransactionHash(
            to,
            0, 
            call,
            Enum.Operation.Call,
            0, 
            0, 
            0,
            address(0), 
            payable(0),
            1);
        vm.startPrank(address(owner));
        GnosisSafe(payable(proxy)).approveHash(txHash);
        vm.expectRevert(errorData);
        GnosisSafe(payable(proxy)).execTransaction(
            to,
            0, 
            call,          /// @param data Data payload of Safe transaction.
            Enum.Operation.Call,
            0, 
            0, 
            0,
            address(0), 
            payable(0), 
            signature);
        vm.stopPrank();
    }

    /// @dev Alice supplies a loan on myNFT #1 of 10 days to address(this)
    function startALoan() internal {
        Offer memory offer = Offer({
            NFT : myNFT,
            tokenId : 1,
            pricePerSecond : 200000 gwei,
            maxRentalDuration : 4 weeks,
            nonce : 0
        });
        bytes memory signature = sign(zebra.getOfferDigest(offer));
        vm.prank(address(alice));
        myNFT.approve(address(zebra), 1);
        zebra.rent{value: offer.pricePerSecond * 10 days}(
            10 days,
            proxy,
            offer,
            signature
        );
    }

    /// @dev Alice supplies a loan on myNFT #2 of 5 days to address(this)
    function startAnotherLoan() internal {
        Offer memory offer = Offer({
            NFT : myNFT,
            tokenId : 2,
            pricePerSecond : 200000 gwei,
            maxRentalDuration : 4 weeks,
            nonce : 0
        });
        bytes memory signature = sign(zebra.getOfferDigest(offer));
        vm.prank(address(alice));
        myNFT.approve(address(zebra), 2);
        zebra.rent{value: offer.pricePerSecond * 5 days}(
            5 days,
            proxy,
            offer,
            signature
        );
    }
}