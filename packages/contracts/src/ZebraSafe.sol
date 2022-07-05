// SPDX-License-Identifier: UNLICENSED   
pragma solidity 0.8.15;

import "gnosis-safe/GnosisSafe.sol";

/// @notice implementation of the extended Gnosis Safe for Zebra protocol
/// @dev deploy the contract once on a chain, then use a factory to create proxies
/// @author npasquie
contract ZebraSafe is GnosisSafe {

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