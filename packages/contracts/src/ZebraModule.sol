// SPDX-License-Identifier: UNLICENSED   
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./gnosis-safe/common/Enum.sol";

interface IGnosisSafe {
    /// @dev Allows a Module to execute a Safe transaction without any further confirmations.
    /// @param to Destination address of module transaction.
    /// @param value Ether value of module transaction.
    /// @param data Data payload of module transaction.
    /// @param operation Operation type of module transaction.
    function execTransactionFromModule(address to, uint256 value, bytes calldata data, Enum.Operation operation)
        external
        returns (bool success);
}

/// @notice for methods meant to be called only by the main Zebra contract
error CallerIsNotProtocol();

contract ZebraModule {
    address immutable zebra;
    
    constructor() {
        zebra = msg.sender;
    }

    function giveAllowanceToZebra(IERC721 NFT, uint256 tokenId, IGnosisSafe safe) external {
        if (msg.sender != zebra) { revert CallerIsNotProtocol(); }
        bytes memory data = abi.encodeWithSelector(IERC721.approve.selector, zebra, tokenId);
        safe.execTransactionFromModule(address(NFT), 0, data, Enum.Operation.Call);
    }
}