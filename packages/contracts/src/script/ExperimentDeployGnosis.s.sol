// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/Script.sol";
import "../gnosis-safe/GnosisSafeL2.sol";
import "../gnosis-safe/proxies/GnosisSafeProxyFactory.sol";

contract Intermediaire {
    GnosisSafeProxyFactory factory = GnosisSafeProxyFactory(0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2);
    GnosisSafeL2 singleton = GnosisSafeL2(payable(0x3E5c63644E683549055b9Be8653de26E0B4CD36E));
    address deployer = 0xbB792907aF585C19C9d0132A5FD209878dAc3E8f;

    function doIt() public {
        bytes memory emptyBytes;

        address[] memory owners = new address[](1);
        owners[0] = deployer;

        bytes memory data = abi.encodeWithSelector(GnosisSafe.setup.selector, 
            owners,                  /// @param _owners List of Safe owners.
            1,                       /// @param _threshold Number of required confirmations for a Safe transaction.
            address(0),              /// @param to Contract address for optional delegate call.
            emptyBytes,              /// @param data Data payload for optional delegate call.
            address(0),              /// @param fallbackHandler Handler for fallback calls to this contract
            address(0),              /// @param paymentToken Token that should be used for the payment (0 is ETH)
            0,                       /// @param payment Value that should be paid
            address(0));             /// @param paymentReceiver Address that should receive the payment (or 0 if tx.origin)
        
        GnosisSafeProxy lol = factory.createProxy(address(singleton), data);
        console.log(address(lol));
    } 
}

contract ExperimentDeployGnosis is Script {
    function run() external {
       
        vm.startBroadcast();
        Intermediaire inter = new Intermediaire();
        inter.doIt();
    }
}