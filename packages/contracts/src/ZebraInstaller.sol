// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "./gnosis-safe/GnosisSafeL2.sol";
import "./Zebra.sol";
import "./ZebraModule.sol";

/// @notice contract that will be delegatecalled by new zebra gnosis-safes
/// @notice to install zebra's guard and module to them 
contract ZebraInstaller is GnosisSafeL2 {
    function install(Zebra zebra, ZebraModule module) external {
        // setGuard
        bytes32 slot = GUARD_STORAGE_SLOT;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            sstore(slot, zebra)
        }
        emit ChangedGuard(address(zebra));

        // enableModule
        modules[address(module)] = modules[SENTINEL_MODULES];
        modules[SENTINEL_MODULES] = address(module);
        emit EnabledModule(address(module)); 
    }
}