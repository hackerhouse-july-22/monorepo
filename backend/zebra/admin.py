from django.contrib import admin

from .models import ZebraNFT

class ZebraNFTAdmin(admin.ModelAdmin):
    """
    Admin settings for ZebraNFT model
    """
    list_display = ('nftAddress', 'tokenId', 'pricePerSecond', 'maxRentDuration', 'nonce', 'created_at', 'updated_at')

    ordering = ('-created_at',)

admin.site.register(ZebraNFT, ZebraNFTAdmin)