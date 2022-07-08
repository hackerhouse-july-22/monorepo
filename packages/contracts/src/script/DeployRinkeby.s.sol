// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "./DeployBase.s.sol";

contract DeployRinkeby is DeployBase {
    function run() external {
        vm.startBroadcast();
        GnosisSafeProxyFactory factory = GnosisSafeProxyFactory(0x76E2cFc1F5Fa8F6a5b3fC4c8F4788F0116861F9B);
        WEth weth = WEth(payable(0xDf032Bc4B9dC2782Bb09352007D4C57B75160B15)); 
        deploy(factory, weth);
    }
}