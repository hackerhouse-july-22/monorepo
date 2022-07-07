// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./gnosis-safe/proxies/GnosisSafeProxy.sol";

error UnauthorizedGuardOrModuleUpdate();
error UnauthorizedDuration(uint256 duration);
error IncorrectPayment(uint256 payment);
error UnregisteredRenter(GnosisSafeProxy renter);
error OfferDeleted(uint256 nonce);  // I.e incorrect nonce
error AssetUnavailable(Loan loan); // I.e already rented
error OrderOnNotOwnedAsset(address caller); // claiming or signing an offer on not owned asset

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

/// @notice issued Loan
/// @param renter zebra safe account
/// @param endDate in seconds
struct Loan {
    GnosisSafeProxy renter;
    uint256 endDate;
}

bytes32 constant OFFER_TYPEHASH = keccak256("Offer(address NFT,uint256 tokenId,uint256 pricePerSecond,uint256 maxRentalDuration,uint256 nonce)");

uint256 constant MAX_BASIS_POINTS = 10_000;

bytes4 constant safeTransferFromSelector = bytes4(keccak256("safeTransferFrom(address,address,uint256)"));
bytes4 constant safeTransferFromPlusDataSelector = bytes4(keccak256("safeTransferFrom(address,address,uint256,bytes)"));
        