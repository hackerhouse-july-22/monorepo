from django.db import models

# Create your models here.


class ZebraNFT(models.Model):
    """
    Primary data model for Zebra Protocol NFTs intended for lending.
    /// @notice Offer to rent a NFT to anyone paying upfront in ETH
    /// @dev no supplier param here, use ecrecover to identify the account
    /// @param NFT implementation address
    /// @param tokenId identifies the NFT
    /// @param pricePerSecond ETH amount to pay for each second rented, in wei
    /// @param maxRentDuration asset cannot be rented for longer in one go, in seconds
    /// @param nonce used to manage offer list update, has to equal supplier's current nonce for the offer to be valid
    struct Offer {
        IERC721 NFT;
        uint256 tokenId;
        uint256 pricePerSecond;
        uint256 maxRentDuration;
        uint256 nonce;
    }
    """

    nftAddress = models.CharField(max_length=42, blank=False, null=False)
    tokenId = models.IntegerField(blank=False, null=False)
    pricePerSecond = models.IntegerField(blank=False, null=False)
    maxRentDuration = models.IntegerField(blank=False, null=False)
    nonce = models.IntegerField(blank=False, null=False)

    # colletion = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"NFT Address: {self.nftAddress}"


# class Supplier(models.Model):
#     """
#     Supplier model
#     """
#     address = models.CharField(max_length=42, blank=False, null=False)

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"Address: {self.address}"


# class Offers(models.Model):
#     """
#     Offers model
#     """
#     offer = models.ForeignKey(ZebraNFT, on_delete=models.CASCADE)
#     supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"Offer: {self.offer}"