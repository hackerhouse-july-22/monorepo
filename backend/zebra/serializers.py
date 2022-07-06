from rest_framework import serializers

from .models import ZebraNFT

class ZebraNFTSerializer(serializers.ModelSerializer):
    """
    Serializer for ZebraNFT model
    """
    class Meta:
        model = ZebraNFT
        fields = ('nftAddress', 'tokenId', 'pricePerSecond', 'maxRentDuration', 'nonce')
        read_only_fields = ('created_at', 'updated_at')
        extra_kwargs = {
            'nftAddress': {'required': True},
            'tokenId': {'required': True},
            'pricePerSecond': {'required': True},
            'maxRentDuration': {'required': True},
            'nonce': {'required': True},
        }