// SPDX-License-Identifier: UNLICENSED   
pragma solidity 0.8.15;

import "gnosis-safe/GnosisSafe.sol";

/// @notice implementation of the extended Gnosis Safe for Zebra protocol
/// @dev deploy the contract once on a chain, then use a factory to create proxies
/// @author npasquie
contract ZebraSafe is GnosisSafe {


 function setup(
        address[] calldata _owners,
        uint256 _threshold,
        address to,
        bytes calldata data,
        address fallbackHandler,
        address paymentToken,
        uint256 payment,
        address payable paymentReceiver
    ) override external {
        // setupOwners checks if the Threshold is already set, therefore preventing that this method is called twice
        setupOwners(_owners, _threshold);
        if (fallbackHandler != address(0)) internalSetFallbackHandler(fallbackHandler);
        // As setupOwners can only be called if the contract has not been initialized we don't need a check for setupModules
        setupModules(to, data);

        // if (payment > 0) {
        //     // To avoid running into issues with EIP-170 we reuse the handlePayment function (to avoid adjusting code of that has been verified we do not adjust the method itself)
        //     // baseGas = 0, gasPrice = 1 and gas = payment => amount = (payment + 0) * 1 = payment
        //     handlePayment(payment, 0, 1, paymentToken, paymentReceiver);
        // }
        emit SafeSetup(msg.sender, _owners, _threshold, to, fallbackHandler);
    }





    // todo : 
    // {
    //     bytes32 slot = GUARD_STORAGE_SLOT;
    //     guard = ZEBRA_IMPLEM 
    //     assembly {
    //         sstore(slot, guard)
    //     }
    // }
    // todo : Zebra factory, registers authorized safes
    // todo : disallow upgraded modules and guards
}