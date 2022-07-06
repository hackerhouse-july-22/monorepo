// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "./ZebraTest.sol";

contract Deploy is ZebraTest {
    function testSafeExecTx() public {
        bytes memory emptyBytes;
        RandoContract rando = new RandoContract();
        bytes memory randoCall = abi.encodeWithSelector(RandoContract.doSomething.selector, emptyBytes);
        execCall(address(rando), randoCall);
        require(rando.somethingHasBeenDone(), "nothing has been done :(");
    }

    // should fail due to guard unauthorized ops
    function testExecTxThatFail() public {
        bytes memory moduleUpdate = abi.encodeWithSelector(ModuleManager.enableModule.selector, address(1));
        bytes memory disableModule = abi.encodeWithSelector(ModuleManager.disableModule.selector, address(1), address(2));
        bytes memory guardUpdate = abi.encodeWithSelector(GuardManager.setGuard.selector, address(1));

        execCallShouldRevert(
            address(proxy), 
            moduleUpdate, 
            UnauthorizedGuardOrModuleUpdate.selector);
        execCallShouldRevert(
            address(proxy), 
            disableModule, 
            UnauthorizedGuardOrModuleUpdate.selector);
        execCallShouldRevert(
            address(proxy), 
            guardUpdate, 
            UnauthorizedGuardOrModuleUpdate.selector);
    }
}