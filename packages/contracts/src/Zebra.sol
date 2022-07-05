// SPDX-License-Identifier: UNLICENSED   
pragma solidity 0.8.15;

import "gnosis-safe/base/GuardManager.sol";
import "gnosis-safe/base/ModuleManager.sol";

error UnauthorizedGuardOrModuleUpdate();

/// @notice manager of the Zebra protocol, guard of all registered safes
/// @author tobou.eth
contract Zebra is BaseGuard {
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
}