// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/Script.sol";

import "../Zebra.sol";
import "../deps/WEth.sol";

contract DeployBase is Script {
    function deploy(GnosisSafeProxyFactory factory, WEth weth, GnosisSafeL2 singleton) internal {
        Zebra zebra = new Zebra(factory, weth, singleton);
        console.log("zebra", address(zebra));
    }
}