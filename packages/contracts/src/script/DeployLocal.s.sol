// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "./DeployBase.s.sol";

contract DeployLocal is DeployBase {
    function run() external {
        vm.startBroadcast();
        GnosisSafeProxyFactory factory = new GnosisSafeProxyFactory();
        WEth weth = new WEth(); 
        deploy(factory, weth);
    }
}