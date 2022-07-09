from rest_framework import serializers

from .models import (
    ZebraNFT,
    # Supplier,
    # Offers
)

class ZebraNFTSerializer(serializers.ModelSerializer):
    """
    Serializer for ZebraNFT model
    """
    class Meta:
        model = ZebraNFT
        fields = '__all__'
        # fields = ('nftAddress', 'tokenId', 'pricePerSecond', 'maxRentDuration', 'nonce')
        read_only_fields = ('created_at', 'updated_at',)
        # extra_kwargs = {
        #     'nftAddress': {'required': True},
        #     'tokenId': {'required': True},
        #     'pricePerSecond': {'required': True},
        #     'maxRentDuration': {'required': True},
        #     'nonce': {'required': True},
        # }

    def create(self, validated_data):
        """
        Create a new ZebraNFT
        """
        return ZebraNFT.objects.create(**validated_data)
        
    def update(self, instance, validated_data):
        """
        Update an existing ZebraNFT
        """
        instance.supplierAddress = validated_data.get('supplierAddress', instance.supplierAddress)
        instance.nftAddress = validated_data.get('nftAddress', instance.nftAddress)
        instance.tokenId = validated_data.get('tokenId', instance.tokenId)
        instance.pricePerSecond = validated_data.get('pricePerSecond', instance.pricePerSecond)
        instance.maxRentDuration = validated_data.get('maxRentDuration', instance.maxRentDuration)
        instance.nonce = validated_data.get('nonce', instance.nonce)
        instance.save()
        return instance

# class SupplierSerializer(serializers.ModelSerializer):
#     """
#     Serializer for Supplier model
#     """
#     class Meta:
#         model = Supplier
#         fields = ('supplierAddress', 'supplierName', 'supplierEmail', 'supplierPhone')
#         read_only_fields = ('created_at', 'updated_at')
#         # extra_kwargs = {
#         #     'supplierAddress': {'required': True},
#         #     'supplierName': {'required': True},
#         #     'supplierEmail': {'required': True},
#         #     'supplierPhone': {'required': True},
#         # }

#     def create(self, validated_data):
#         """
#         Create a new Supplier
#         """
#         return Supplier.objects.create(**validated_data)
        
#     def update(self, instance, validated_data):
#         """
#         Update an existing Supplier
#         """
#         instance.supplierAddress = validated_data.get('supplierAddress', instance.supplierAddress)
#         instance.supplierName = validated_data.get('supplierName', instance.supplierName)
#         instance.supplierEmail = validated_data.get('supplierEmail', instance.supplierEmail)
#         instance.supplierPhone = validated_data.get('supplierPhone', instance.supplierPhone)
#         instance.save()
#         return instance

# class OffersSerializer(serializers.ModelSerializer):
#     """
#     Serializer for Offers model
#     """
#     class Meta:
#         model = Offers
#         fields = ('offerId', 'offerPrice', 'offerDuration', 'offerStatus')
#         read_only_fields = ('created_at', 'updated_at')
#         # extra_kwargs = {
#         #     'offerId': {'required': True},
#         #     'offerPrice': {'required': True},
#         #     'offerDuration': {'required': True},
#         #     'offerStatus': {'required': True},
#         # }

#     def create(self, validated_data):
#         """
#         Create a new Offers
#         """
#         return Offers.objects.create(**validated_data)
        
#     def update(self, instance, validated_data):
#         """
#         Update an existing Offers
#         """
#         instance.offerId = validated_data.get('offerId', instance.offerId)
#         instance.offerPrice = validated_data.get('offerPrice', instance.offerPrice)
#         instance.offerDuration = validated_data.get('offerDuration', instance.offerDuration)
#         instance.offerStatus = validated_data.get('offerStatus', instance.offerStatus)
#         instance.save()
#         return instance