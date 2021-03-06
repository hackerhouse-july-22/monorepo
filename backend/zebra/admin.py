from django.contrib import admin

from .models import (
    ZebraNFT,
    UserWalletInfo,
    Rental
    # Supplier,
    # Offers
)

class RentalAdmin(admin.ModelAdmin):
    list_display = ['id', 'nft','length', 'renter']

class UserWalletInfoAdmin(admin.ModelAdmin):
    list_display = ('user_wallet_address', 'gnosis_safe_address')
    

class ZebraNFTAdmin(admin.ModelAdmin):
    """
    Admin settings for ZebraNFT model
    """
    list_display = (
        'supplierAddress','nftAddress', 'tokenId', 'pricePerSecond', 'maxRentDuration', 'nonce', 'created_at', 'updated_at'
        # 'renterWalletInfo','supplierWalletInfo',
        )

    ordering = ('-created_at',)

admin.site.register(Rental, RentalAdmin)
admin.site.register(UserWalletInfo, UserWalletInfoAdmin)
admin.site.register(ZebraNFT, ZebraNFTAdmin)
# admin.site.register(Offers, OffersAdmin)
# admin.site.register(Supplier, SupplierAdmin)