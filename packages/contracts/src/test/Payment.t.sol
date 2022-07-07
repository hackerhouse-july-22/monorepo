// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "./ZebraTest.sol";

contract Payment is ZebraTest {
    function testRevertIfPayTooLow() public {
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

        vm.expectRevert(abi.encodeWithSelector(IncorrectPayment.selector, offer.pricePerSecond * 9 days));
        zebra.rent{value: offer.pricePerSecond * 9 days}(
            10 days,
            proxy,
            offer,
            signature
        );
    }

    function testClaimRents() public {
        uint256 totalPaid = 200000 gwei * 15 days;

        startALoan();
        startAnotherLoan();
        vm.prank(alice);
        zebra.claimRents();
        assertEq(WETH.balanceOf(alice), (totalPaid / 10_000) * 9500);
    }

    function testClaimDevFees() public {
        uint256 totalPaid = 200000 gwei * 15 days;

        startALoan();
        startAnotherLoan();
        zebra.claimDevFees();
        assertEq(WETH.balanceOf(address(this)), (totalPaid / 10_000) * 500);
    }
}