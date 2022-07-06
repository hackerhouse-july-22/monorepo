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

    def create(self, validated_data):
        """
        Create a new ZebraNFT
        """
        return ZebraNFT.objects.create(**validated_data)
        
    def update(self, instance, validated_data):
        """
        Update an existing ZebraNFT
        """
        instance.nftAddress = validated_data.get('nftAddress', instance.nftAddress)
        instance.tokenId = validated_data.get('tokenId', instance.tokenId)
        instance.pricePerSecond = validated_data.get('pricePerSecond', instance.pricePerSecond)
        instance.maxRentDuration = validated_data.get('maxRentDuration', instance.maxRentDuration)
        instance.nonce = validated_data.get('nonce', instance.nonce)
        instance.save()
        return instance

    