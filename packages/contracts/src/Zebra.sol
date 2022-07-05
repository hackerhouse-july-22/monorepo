// SPDX-License-Identifier: UNLICENSED   
pragma solidity 0.8.15;

import "./gnosis-safe/base/GuardManager.sol";
import "./gnosis-safe/base/ModuleManager.sol";
import "./gnosis-safe/proxies/GnosisSafeProxyFactory.sol";
import "./gnosis-safe/GnosisSafe.sol";
import "./ZebraModule.sol";

error UnauthorizedGuardOrModuleUpdate();

/// @notice manager of the Zebra protocol, guard of all registered safes
/// @author tobou.eth
contract Zebra is BaseGuard {
    event ZebraSafeDeploy(GnosisSafeProxy indexed safeProxy);

    GnosisSafe immutable ZEBRA_SAFE_SINGLETON;
    GnosisSafeProxyFactory immutable FACTORY;
    ZebraModule immutable ZEBRA_MODULE;

    mapping(GnosisSafeProxy => bool) isZebraAllowed;

    constructor(GnosisSafeProxyFactory factory) {
        ZEBRA_SAFE_SINGLETON = new GnosisSafe();
        FACTORY = factory;
        ZEBRA_MODULE = new ZebraModule();
    }

    /// @notice deploys a zebra-allowed gnosis safe owned by `msg.sender`
    function createZebraSafe() external returns(GnosisSafeProxy safe) {
        bytes memory emptyData;
        address[] memory owners = new address[](1);
        owners[0] = msg.sender;
        bytes memory data = abi.encodeWithSelector(GnosisSafe.setup.selector, 
            owners,                  /// @param _owners List of Safe owners.
            1,                       /// @param _threshold Number of required confirmations for a Safe transaction.
            address(0),              /// @param to Contract address for optional delegate call.
            emptyData,               /// @param data Data payload for optional delegate call.
            address(0),              /// @param fallbackHandler Handler for fallback calls to this contract
            address(0),              /// @param paymentToken Token that should be used for the payment (0 is ETH)
            0,                       /// @param payment Value that should be paid
            address(0),              /// @param paymentReceiver Address that should receive the payment (or 0 if tx.origin)
            address(this),           /// @param zebra main zebra protocol contract
            address(ZEBRA_MODULE));  /// @param zebraModule zebra module used to keep token allowance
        safe = FACTORY.createProxy(address(ZEBRA_SAFE_SINGLETON), data);
        isZebraAllowed[safe] = true;

        emit ZebraSafeDeploy(safe);
    }

    /// @notice called on execTransaction(), enforces the rules of renting
    /// @param to Destination address of Safe transaction.
    /// @param value Ether value of Safe transaction.
    /// @param data Data payload of Safe transaction.
    /// @param operation Operation type of Safe transaction.
    /// @param safeTxGas Gas that should be used for the Safe transaction.
    /// @param baseGas Gas costs that are independent of the transaction execution(e.g. base transaction fee, signature check, payment of the refund)
    /// @param gasPrice Gas price that should be used for the payment calculation.
    /// @param gasToken Token address (or 0 if ETH) that is used for the payment.
    /// @param refundReceiver Address of receiver of gas payment (or 0 if tx.origin).
    /// @param signatures Packed signature data ({bytes32 r}{bytes32 s}{uint8 v})
    function checkTransaction(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver,
        bytes memory signatures,
        address msgSender
    ) external {
        (bytes4 selector, ) = abi.decode(data, (bytes4, bytes));

        // disallow modification of guard or module (could result in asset theft)
        if (to == msg.sender && (
            selector == GuardManager.setGuard.selector ||
            selector == ModuleManager.enableModule.selector ||
            selector == ModuleManager.disableModule.selector)){
            revert UnauthorizedGuardOrModuleUpdate();
        }
    }

    function checkAfterExecution(bytes32 txHash, bool success) external {}

    fallback() external {
        // We don't revert on fallback to avoid issues in case of a Safe upgrade
        // E.g. The expected check method might change and then the Safe would be locked.
    }
}