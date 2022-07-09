from django.contrib import admin

from .models import (
    ZebraNFT,
    # Supplier,
    # Offers
)

class ZebraNFTAdmin(admin.ModelAdmin):
    """
    Admin settings for ZebraNFT model
    """
    list_display = ('supplierAddress','nftAddress', 'tokenId', 'pricePerSecond', 'maxRentDuration', 'nonce', 'created_at', 'updated_at')

    ordering = ('-created_at',)

# class OffersAdmin(admin.ModelAdmin):
#     """
#     Admin settings for Offers model
#     """
#     list_display = ('offer', 'supplier',)

#     ordering = ('-created_at',)

# class SupplierAdmin(admin.ModelAdmin):
#     """
#     Admin settings for Supplier model
#     """
#     list_display = ('address',)

#     ordering = ('-created_at',)


admin.site.register(ZebraNFT, ZebraNFTAdmin)
# admin.site.register(Offers, OffersAdmin)
# admin.site.register(Supplier, SupplierAdmin)