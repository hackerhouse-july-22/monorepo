// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "./ZebraTest.sol";

contract Rent is ZebraTest {
    function testRent() public {
        Offer memory offer = Offer({
            NFT : myNFT,
            tokenId : 1,
            pricePerSecond : 200000 gwei,
            maxRentalDuration : 4 weeks,
            nonce : 1
        });
        bytes memory signature = sign(getOfferDigest(offer));
        vm.prank(address(alice));
        myNFT.approve(address(zebra), 1);
        zebra.rent{value: offer.pricePerSecond * 10 days}(
            myNFT,
            1,
            10 days,
            proxy,
            offer,
            signature
        );
    }
}