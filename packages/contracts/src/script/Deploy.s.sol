// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/Script.sol";

import "../Zebra.sol";
import "../deps/WEth.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();
        GnosisSafeProxyFactory factory = new GnosisSafeProxyFactory();
        WEth weth = new WEth(); 
        Zebra zebra = new Zebra(factory, weth);
        console.log("zebra", address(zebra));
    }
}