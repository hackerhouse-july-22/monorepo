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

    function testRentForNotRegisteredSafe() public {
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
        vm.expectRevert(abi.encodeWithSelector(UnregisteredRenter.selector, payable(address(123))));
        zebra.rent{value: offer.pricePerSecond * 10 days}(
            10 days,
            GnosisSafeProxy(payable(address(123))),
            offer,
            signature
        );
    }

    function testClaimAsset() public {
        startALoan();

        uint256 aliceBalanceBefore = myNFT.balanceOf(alice);

        skip(5 weeks);
        vm.prank(address(alice));
        zebra.claimAsset(myNFT, 1);

        uint256 aliceBalanceAfter = myNFT.balanceOf(alice);

        assertEq(aliceBalanceAfter, aliceBalanceBefore + 1);
    }

    function testClaimBackPeriod() public {
        Loan memory currentLoan = Loan({
            renter : proxy,
            endDate : block.timestamp + 10 days
        });
        startALoan();
        vm.startPrank(address(alice));
        vm.expectRevert(abi.encodeWithSelector(AssetUnavailable.selector, currentLoan));
        zebra.claimAsset(myNFT, 1);
        vm.stopPrank();
    }

    function testClaimBackOnlyOwner() public {
        startALoan();
        skip(11 days);
        vm.expectRevert(abi.encodeWithSelector(OrderOnNotOwnedAsset.selector, address(this)));
        zebra.claimAsset(myNFT, 1);
    }

    function testRevokeOffers() public {
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
        vm.prank(address(alice));
        zebra.revokeOffers();
        vm.expectRevert(abi.encodeWithSelector(OfferDeleted.selector, 0));
        zebra.rent{value: offer.pricePerSecond * 10 days}(
            10 days,
            proxy,
            offer,
            signature
        );
    }

    function testCanPlay() public {
        startALoan();
        execCall(address(myNFT), abi.encodeWithSelector(myNFT.play.selector, 1));
    }

    function testGuardBlocksTransfer() public {
        startALoan();
        bytes memory emptyBytes;

        bytes memory callData = abi.encodeWithSelector(myNFT.setApprovalForAll.selector, alice, true);
        execCallShouldRevert( // 1
            address(myNFT),
            callData,
            abi.encodeWithSelector(UnauthorizedOperation.selector, address(myNFT), callData));

        callData = abi.encodeWithSelector(myNFT.approve.selector, alice, uint256(1));
        execCallShouldRevert( // 2
            address(myNFT),
            callData,
            abi.encodeWithSelector(UnauthorizedOperation.selector, address(myNFT), callData));

        callData = abi.encodeWithSelector(safeTransferFromSelector, address(proxy), alice, 1);
        execCallShouldRevert( // 3
            address(myNFT),
            callData,
            abi.encodeWithSelector(UnauthorizedOperation.selector, address(myNFT), callData));

        callData = abi.encodeWithSelector(myNFT.transferFrom.selector,  address(proxy), alice, 1);
        execCallShouldRevert( // 4
            address(myNFT),
            callData,
            abi.encodeWithSelector(UnauthorizedOperation.selector, address(myNFT), callData));

        callData = abi.encodeWithSelector(safeTransferFromPlusDataSelector,  address(proxy), alice, 1, emptyBytes);
        execCallShouldRevert( // 5
            address(myNFT),
            callData,
            abi.encodeWithSelector(UnauthorizedOperation.selector, address(myNFT), callData));       
    }
}