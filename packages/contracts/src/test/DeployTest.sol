// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/Test.sol";
import "../gnosis-safe/proxies/GnosisSafeProxyFactory.sol";

import "../Zebra.sol";

contract RandoContract {
    function doSomething() public {}
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
        bytes32 owner32 = bytes32(bytes.concat(bytes12(emptyBytes),bytes20(address(owner))));
        bytes memory signature = bytes.concat(
            owner32,             // r
            bytes32(uint256(1)), // s
            bytes1(uint8(1))     // v
        );
        bytes32 txHash = GnosisSafe(payable(proxy)).getTransactionHash(
            address(rando),
            0, 
            emptyBytes,
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
            address(rando),
            0, 
            emptyBytes,
            Enum.Operation.Call,
            0, 
            0, 
            0,
            address(0), 
            payable(0), 
            signature);
    }
}