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
            nonce : 0
        });
        bytes memory signature = sign(zebra.getOfferDigest(offer));
        vm.prank(address(alice));
        myNFT.approve(address(zebra), 1);

        uint256 aliceBalanceBefore = myNFT.balanceOf(alice);
        uint256 safeBalanceBefore = myNFT.balanceOf(address(proxy));

        zebra.rent{value: offer.pricePerSecond * 10 days}(
            10 days,
            proxy,
            offer,
            signature
        );

        uint256 aliceBalanceAfter = myNFT.balanceOf(alice);
        uint256 safeBalanceAfter = myNFT.balanceOf(address(proxy));

        assertEq(aliceBalanceAfter, aliceBalanceBefore - 1);
        assertEq(safeBalanceAfter, safeBalanceBefore + 1);
        assertEq(address(zebra), myNFT.getApproved(offer.tokenId));
    }
}