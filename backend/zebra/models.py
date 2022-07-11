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

    supplierAddress = models.CharField(max_length=42, blank=False, null=False)
    nftAddress = models.CharField(max_length=42, blank=False, null=False)
    nftImage = models.CharField(max_length=200, blank=False, null=False)
    tokenId = models.IntegerField(blank=False, null=False)
    pricePerSecond = models.IntegerField(blank=False, null=False)
    maxRentDuration = models.IntegerField(blank=False, null=False)
    nonce = models.IntegerField(blank=False, null=False)

    # renterAddress = models.CharField(max_length=42, blank=True, null=True)
    # renterGnosisSafeAddress = models.CharField(max_length=42, blank=False, null=False)

    supplierWalletInfo = models.ForeignKey('UserWalletInfo', on_delete=models.CASCADE, related_name='supplier_wallet_info', blank=True, null=True)
    renterWalletInfo = models.ForeignKey('UserWalletInfo', on_delete=models.CASCADE, related_name='renter_wallet_info', blank=True, null=True)


    # colletion = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"NFT Address: {self.nftAddress}"


# model to hold use wallet address and gnosis safe id
class UserWalletInfo(models.Model):
    """
    Model to hold user wallet address and gnosis safe id
    """
    user_wallet_address = models.CharField(max_length=42, blank=False, null=False)
    gnosis_safe_address = models.CharField(max_length=42, blank=False, null=False)

    def __str__(self):
        return f"User Wallet Address: {self.user_wallet_address}"

class Rental(models.Model):
    """
    Model to hold rental information
    """
    renter = models.ForeignKey('UserWalletInfo', on_delete=models.CASCADE, related_name='renter_address')
    nft = models.ForeignKey('ZebraNFT', on_delete=models.CASCADE, related_name='nft')
    length = models.IntegerField(blank=False, null=False)



    