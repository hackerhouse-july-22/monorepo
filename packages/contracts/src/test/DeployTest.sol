// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/Test.sol";
import "../gnosis-safe/proxies/GnosisSafeProxyFactory.sol";
import "../gnosis-safe/GnosisSafe.sol";

import "../Zebra.sol";

contract RandoContract {
    bool public somethingHasBeenDone;

    function doSomething() public {
        somethingHasBeenDone = true;
    }
}

/// @notice will create valid signatures as owner of the safe
contract Owner {
    bytes4 constant internal MAGICVALUE = bytes4(keccak256("isValidSignature(bytes32,bytes)"));

    function isValidSignature(bytes32 _hash, bytes memory _signature) public pure returns (bytes4 magicValue) {
        return MAGICVALUE;
    }
}

contract DeployTest is Test {
    uint256 constant ownerPrivateKey = 0xA11CE;
    Owner immutable owner;
    GnosisSafeProxyFactory immutable factory;
    
    GnosisSafeProxy proxy;
    Zebra zebra;

    constructor() {
        owner = new Owner();
        factory = new GnosisSafeProxyFactory();
    }

    function setUp() public {
        zebra = new Zebra(factory);
        vm.prank(address(owner));
        proxy = zebra.createZebraSafe();
    }

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
 
    function execCall(address to, bytes memory call) internal {
        bytes memory emptyBytes;
        bytes32 owner32 = bytes32(bytes.concat(bytes12(emptyBytes),bytes20(address(owner))));
        bytes memory signature = bytes.concat(
            owner32,             // r
            bytes32(uint256(1)), // s
            bytes1(uint8(1))     // v
        );
        bytes32 txHash = GnosisSafe(payable(proxy)).getTransactionHash(
            to,
            0, 
            call,
            Enum.Operation.Call,
            0, 
            0, 
            0,
            address(0), 
            payable(0),
            1);
        vm.prank(address(owner));
        GnosisSafe(payable(proxy)).approveHash(txHash);
        vm.prank(address(owner));
        GnosisSafe(payable(proxy)).execTransaction(
            to,
            0, 
            call,          /// @param data Data payload of Safe transaction.
            Enum.Operation.Call,
            0, 
            0, 
            0,
            address(0), 
            payable(0), 
            signature);
    }

    function execCallShouldRevert(address to, bytes memory call, bytes4 errorSelector) internal {
        bytes memory emptyBytes;
        bytes32 owner32 = bytes32(bytes.concat(bytes12(emptyBytes),bytes20(address(owner))));
        bytes memory signature = bytes.concat(
            owner32,             // r
            bytes32(uint256(1)), // s
            bytes1(uint8(1))     // v
        );
        bytes32 txHash = GnosisSafe(payable(proxy)).getTransactionHash(
            to,
            0, 
            call,
            Enum.Operation.Call,
            0, 
            0, 
            0,
            address(0), 
            payable(0),
            1);
        vm.startPrank(address(owner));
        GnosisSafe(payable(proxy)).approveHash(txHash);
        vm.expectRevert(errorSelector);
        GnosisSafe(payable(proxy)).execTransaction(
            to,
            0, 
            call,          /// @param data Data payload of Safe transaction.
            Enum.Operation.Call,
            0, 
            0, 
            0,
            address(0), 
            payable(0), 
            signature);
        vm.stopPrank();
    }
}