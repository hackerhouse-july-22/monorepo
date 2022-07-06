// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

import "../DataStructure.sol";

abstract contract Utils is EIP712 {
    constructor() EIP712("Zebra", "1.0") {}

    function getOfferDigest(Offer memory offer) view internal returns(bytes32 digest) {
        digest = EIP712._hashTypedDataV4(keccak256(abi.encode(
            OFFER_TYPEHASH,
            offer.NFT, offer.tokenId, offer.pricePerSecond, offer.maxRentalDuration, offer.nonce
        )));
    }
}