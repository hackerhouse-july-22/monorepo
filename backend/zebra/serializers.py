from rest_framework import serializers

from .models import (
    ZebraNFT,
    UserWalletInfo,
    Rental
    # Supplier,
    # Offers
)

class UserWalletInfoSerializer(serializers.ModelSerializer):
    """
    Serializer for UserWalletInfo model
    """
    class Meta:
        model = UserWalletInfo
        fields = ('user_wallet_address', 'gnosis_safe_address')
        # read_only_fields = ('user_wallet_address', 'gnosis_safe_address')
    
    def create(self, validated_data):
        """
        Override create method to create a new UserWalletInfo object
        """
        return UserWalletInfo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class CreateZebraNFTSerializer(serializers.ModelSerializer):
    """
    Serializer for ZebraNFT model
    """

    class Meta:
        model = ZebraNFT
        fields = [
            'supplierAddress','nftAddress','nftImage', 'tokenId', 'pricePerSecond', 'maxRentDuration', 'nonce', 'created_at', 'updated_at'        ]

    def create(self, validated_data):
        """
        Override create method to create a new UserWalletInfo object
        """
        return ZebraNFT.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.supplierAddress = validated_data.get('supplierAddress', instance.supplierAddress)
        instance.nftAddress = validated_data.get('nftAddress', instance.nftAddress)
        instance.nftImage = validated_data.get('nftImage', instance.nftImage)
        instance.tokenId = validated_data.get('tokenId', instance.tokenId)
        instance.pricePerSecond = validated_data.get('pricePerSecond', instance.pricePerSecond)
        instance.maxRentDuration = validated_data.get('maxRentDuration', instance.maxRentDuration)
        instance.nonce = validated_data.get('nonce', instance.nonce)
        instance.save()
        return instance

# class RentNFTSerializer(serializers.ModelSerializer):
#     """
#     Serializer for ZebraNFT model
#     """
#     renterWalletInfo = UserWalletInfoSerializer()
#     class Meta:
#         model = ZebraNFT
#         fields = [
#             'id'
#         ]

class RentalSerializer(serializers.ModelSerializer):
    """
    Serializer for Rental model
    """
    class Meta:
        model = Rental
        fields = [
            'nft', 'length', 'renter'
        ]

class ReadRentalSerializer(serializers.ModelSerializer):
    """
    Serializer for Rental model
    """
    nft = serializers.SerializerMethodField(read_only=True)
    renter = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Rental
        fields = [
            'id', 'nft', 'length', 'renter'
        ]
    
    def get_nft(self, obj):
        return obj.nft.nftAddress

    def get_renter(self, obj):
        return obj.renter.user_wallet_address

class ZebraNFTSerializer(serializers.ModelSerializer):
    """
    Serializer for ZebraNFT model
    """
    renterWalletInfo = serializers.SerializerMethodField(read_only=True)
    rentalInfo = serializers.SerializerMethodField(read_only=True)

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
    
    def get_renterWalletInfo(self, obj):
        """
        Get renterWalletInfo data from UserWalletInfo model
        """
        return UserWalletInfoSerializer(obj.renterWalletInfo).data

    def get_rentalInfo(self, obj):
        """
        Get rentalInfo data from Rental model
        """
        if Rental.objects.filter(nft=obj).exists():
            return RentalSerializer(Rental.objects.get(nft=obj)).data
        else:
            return None

    # def get_renterWalletInfo(self, obj):
    #     """
    #     Get the renterWalletInfo for the ZebraNFT
    #     """
    #     qs = UserWalletInfo.objects.get(address=obj.supplierAddress)
    #     return UserWalletInfoSerializer(qs).data


    

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