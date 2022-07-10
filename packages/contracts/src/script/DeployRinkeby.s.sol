// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "./DeployBase.s.sol";

contract DeployRinkeby is DeployBase {
    function run() external {
        vm.startBroadcast();
        GnosisSafeProxyFactory factory = GnosisSafeProxyFactory(0x76E2cFc1F5Fa8F6a5b3fC4c8F4788F0116861F9B);
        // WEth weth = WEth(payable(0xDf032Bc4B9dC2782Bb09352007D4C57B75160B15)); // rinkeby
        WEth weth = WEth(payable(0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270)); // polygon
        // GnosisSafeL2 singleton = GnosisSafeL2(payable(0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552)); // rinkeby
        GnosisSafeL2 singleton = GnosisSafeL2(payable(0x3E5c63644E683549055b9Be8653de26E0B4CD36E)); // polygon
        deploy(factory, weth, singleton);
    }
}