// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./gnosis-safe/proxies/GnosisSafeProxy.sol";

error UnauthorizedGuardOrModuleUpdate();
error UnauthorizedDuration(uint256 duration);
error IncorrectPayment(uint256 payment);
error UnregisteredRenter(GnosisSafeProxy renter);

/// @notice Offer to rent a NFT to anyone paying upfront in ETH
/// @dev no supplier param here, use ecrecover to identify the account
/// @param NFT implementation address
/// @param tokenId identifies the NFT
/// @param pricePerSecond ETH amount to pay for each second rented, in wei
/// @param maxRentalDuration asset cannot be rented for longer in one go, in seconds
/// @param nonce used to manage offer list update, has to equal supplier's current nonce for the offer to be valid
struct Offer {
    IERC721 NFT;
    uint256 tokenId;
    uint256 pricePerSecond;
    uint256 maxRentalDuration;
    uint256 nonce;
}

bytes32 constant OFFER_TYPEHASH = keccak256("Offer(address NFT,uint256 tokenId,uint256 pricePerSecond,uint256 maxRentalDuration,uint256 nonce)");
