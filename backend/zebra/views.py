from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status, generics
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

import web3

# from .utils import recoverAddress, isValidEthereumAddress

from .models import ZebraNFT, UserWalletInfo
from .serializers import (
    ZebraNFTSerializer,
    CreateZebraNFTSerializer,
    UserWalletInfoSerializer

) 
from .abi import ZEBRA_TEST_ABI

from thirdweb import ThirdwebSDK

testPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
# sdk = ThirdwebSDK("mumbai")
# sdk = ThirdwebSDK("127.0.0.1:8545")
# sdk = ThirdwebSDK.from_private_key(testPrivateKey, "127.0.0.1:8545")

# connect sdk to local foundry node running on localhost:8545
sdk = ThirdwebSDK.from_private_key(testPrivateKey, "http://127.0.0.1:8545")

ZEBRA_PROTOCOL_ADDRESS  = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'
checksummedAddress      = web3.Web3.toChecksumAddress(ZEBRA_PROTOCOL_ADDRESS)
# zebraContract = sdk.get_contract(ZEBRA_PROTOCOL_ADDRESS)
# Can also use abi
# zebraContractFromAbi = sdk.get_contract_from_abi(ZEBRA_PROTOCOL_ADDRESS, ZEBRA_TEST_ABI)
zebraContractFromAbi = sdk.get_contract_from_abi(checksummedAddress, ZEBRA_TEST_ABI)

####################################
# Wallet/Auth                      #
####################################

class EthereumAuth(APIView):
    def post(self, request):
        try: 
            payload = request.data['payload']

            token = sdk.auth.generate_auth_token("localhost:3000/", payload)

            # https://portal.thirdweb.com/python/wallet-authenticator

            # on the frontend, you need to call the sdk.auth.login(domain) function,
            # call it payload, and then send to the backend

            response = Response()
            response.set_cookie('cookie', token, 
                httponly=True,
                secure=True,
                samesite='Strict',
                path='/',
                # max_age=60*60*24*7 # defaults to 5 hours per signature
            )
            response.status_code = status.HTTP_200_OK
            return response
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CreateGnosisLinkToWalletView(generics.CreateAPIView):
    """
    Link a gnosis safe address to a user wallet address
    """
    serializer_class = UserWalletInfoSerializer
    permission_classes = [permissions.AllowAny,]

    def post(self, request):
        userWalletAddress = request.data['userWalletAddress']
        userGnosisAddress = request.data['userGnosisAddress']
        
        # check if userWalletAddress instance already exists
        if UserWalletInfo.objects.filter(user_wallet_address=userWalletAddress).exists():
            return Response(
                {"error": "User wallet address already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            # if not web3.Web3.isChecksumAddress(userWalletAddress):
            #     raise Exception("Invalid user wallet address")
            
            # if not web3.Web3.isChecksumAddress(gnosisSafeAddress):
            #     raise Exception("Invalid gnosis safe address")
            
            # if UserWalletInfo.objects.get(user_wallet_address=userWalletAddress).exists():
            #     raise Exception("User wallet address already exists")
                
            # if UserWalletInfo.objects.get(
            #     user_wallet_address=userWalletAddress).exists():
            #     raise Exception("Gnosis safe address already exists")
            
            UserWalletInfo.objects.create(
                user_wallet_address=userWalletAddress,
                gnosis_safe_address=userGnosisAddress
            )

            return Response(
                {"message": "Successfully linked userWalletAddress to gnosisSafeAddress"},
                status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ReadUserWalletInfoView(generics.RetrieveAPIView):
    """
    Get user wallet info
    """
    serializer_class = UserWalletInfoSerializer
    permission_classes = [permissions.AllowAny,]

    def get(self, request, address):
        try:
            userWalletInfo = UserWalletInfo.objects.get(
                user_wallet_address=address
            )
            serializer = UserWalletInfoSerializer(userWalletInfo)
            return Response(
                {"userWalletInfo": serializer.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

####################################
# NFT Stuff                        #
####################################

class ZebraNFTListView(APIView):
    """
    List all ZebraNFTs
    """
    permission_classes = [permissions.AllowAny,]

    serializer_class = ZebraNFTSerializer

    def get(self, request):
        try:
            zebraNFTs = ZebraNFT.objects.all()
            serializer = ZebraNFTSerializer(zebraNFTs, many=True)
            return Response(
                {"nfts": serializer.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class CreateNFTView(generics.CreateAPIView):
    serializer_class = CreateZebraNFTSerializer
    permission_classes = [permissions.AllowAny,]

    def post(self, request):
        
        # jwt = request.data['jwt'] # unsecure, set as HttpOnly Cookie
        
        # the authenticate person returns
        # jwt = request.COOKIES['cookie']
        # senderAddress = sdk.auth.authenticate(jwt) # this will return the wanted address

        # rentalContractInstance = sdk.get_contract(nftAddress)

        # # signer has to be owner of nft
        # # signer has to be approved by the protocol contract

        # # Check if sender is owner of the NFT
        # if not rentalContractInstance.owner_of(tokenId) == senderAddress:
        #     return Response(
        #         {"error": "Sender is not owner of the NFT"},
        #         status=status.HTTP_400_BAD_REQUEST
        #     )

        # if not rentalContractInstance.is_approved(tokenId) == ZEBRA_PROTOCOL_ADDRESS:
        #     return Response(
        #         {"error": "TokenId is not approved by the protocol contract"},
        #         status=status.HTTP_400_BAD_REQUEST
        #     )
    
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED
                )
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# class CreateZebraNFTView(APIView):
#     """
#     Create a ZebraNFT.
#     Validation functionality:
#         1. Check if signature passed by the user is valid
#         2. Check if the address is owner
#         3. Check if the tokenId is approved by the protocol contract
#     """
#     permission_classes = [permissions.AllowAny,]
#     # model = ZebraNFT
#     serializer_class = ZebraNFTSerializer

#     def post(self, request):
#         nftAddress = request.data['nftAddress']
#         tokenId = request.data['tokenId']
#         pricePerSecond = request.data['pricePerSecond']
#         maxRentDuration = request.data['maxRentDuration']
#         nonce = request.data['nonce']

#         # jwt = request.data['jwt'] # unsecure, set as HttpOnly Cookie
        
#         # the authenticate person returns
#         jwt = request.COOKIES['cookie']
#         senderAddress = sdk.auth.authenticate(jwt) # this will return the wanted address

#         rentalContractInstance = sdk.get_contract(nftAddress)

#         # signer has to be owner of nft
#         # signer has to be approved by the protocol contract

#         # Check if sender is owner of the NFT
#         if not rentalContractInstance.owner_of(tokenId) == senderAddress:
#             return Response(
#                 {"error": "Sender is not owner of the NFT"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         if not rentalContractInstance.is_approved(tokenId) == ZEBRA_PROTOCOL_ADDRESS:
#             return Response(
#                 {"error": "TokenId is not approved by the protocol contract"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         try:
#             zebraNFT = ZebraNFT.objects.create(
#                 nftAddress=nftAddress,
#                 tokenId=tokenId,
#                 pricePerSecond=pricePerSecond,
#                 maxRentDuration=maxRentDuration,
#                 nonce=nonce,
#             )
#             zebraNFT.save()
#             return Response(
#                 {"message": "ZebraNFT created successfully"},
#                 status=status.HTTP_201_CREATED
#             )
#         except Exception as e:
#             return Response(
#                 {"error": str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )


class ReadZebraNFTView(generics.RetrieveAPIView):
    """
    Read a ZebraNFT
    """
    permission_classes = [permissions.AllowAny,]
    serializer_class = ZebraNFTSerializer

    def get(self, request, id):
        try:
            zebraNFT = ZebraNFT.objects.get(id=id)
            serializer = ZebraNFTSerializer(zebraNFT)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class UpdateZebraNFTView(generics.UpdateAPIView):
    """
    Update a ZebraNFT
    """
    permission_classes = [permissions.AllowAny,]
    serializer_class = CreateZebraNFTSerializer

    def patch(self, request, id):
        
        try:
            zebraNFT = ZebraNFT.objects.get(id=id)
            serializer = self.serializer_class(
                zebraNFT, data=request.data, partial=True
                )    
            try:
                if serializer.is_valid():
                    serializer.save()
                    return Response(
                        serializer.data,
                        status=status.HTTP_200_OK
                    )
            except Exception as e:
                return Response(
                    {"error": f"Error validaitng serializer in view: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


    # def get_queryset(self):
    #     return super().get_queryset()

# class UpdateZebraNFTView(APIView):
#     """
#     Update a ZebraNFT
#     """
#     def put(self, request, pk):

#         nftAddress = request.data['nftAddress']
#         tokenId = request.data['tokenId']
#         pricePerSecond = request.data['pricePerSecond']
#         maxRentDuration = request.data['maxRentDuration']
#         nonce = request.data['nonce']

#         # senderAddress = request.data['senderAddress']
#         # signature = request.data['signature']
        
#         # the authenticate person returns
#         jwt = request.COOKIES['cookie']
#         senderAddress = sdk.auth.authenticate(jwt) # this will return the wanted address

#         rentalContractInstance = sdk.get_contract(nftAddress)

#         if not rentalContractInstance.owner_of(tokenId) == senderAddress:
#             return Response(
#                 {"error": "Sender is not owner of the NFT"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         if not rentalContractInstance.is_approved(tokenId) == ZEBRA_PROTOCOL_ADDRESS:
#             return Response(
#                 {"error": "TokenId is not approved by the protocol contract"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         if not ZebraNFT.objects.get(pk=pk).exists():
#             return Response(
#                 {"error": "ZebraNFT does not exist"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # grab the nft instance we have stored
#         nft = ZebraNFT.objects.get(pk=pk)

#         # if new nonce < old nonce, reject
#         if nonce < nft.nonce:
#             return Response(
#                 {"error": "Invalid nonce, too low"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # if new nonce == old nonce, check price
#         if nonce == nft.nonce:
#             if pricePerSecond < nft.pricePerSecond:
#                 nft.pricePerSecond = pricePerSecond
#                 nft.save()
#                 return Response(
#                     {"message": "ZebraNFT updated successfully"},
#                     status=status.HTTP_200_OK
#                 )
#             else:
#                 return Response(
#                     {"error": "New offer too low, old offer kept. Update nonce, or lower the price"},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )

#         # if new nonce > old nonce, update all fields
#         if nonce > nft.nonce:
#             nft.nftAddress = nftAddress
#             nft.tokenId = tokenId
#             nft.pricePerSecond = pricePerSecond
#             nft.maxRentDuration = maxRentDuration
#             nft.nonce = nonce
#             nft.save()
#             return Response(
#                 {"message": "ZebraNFT updated successfully"},
#                 status=status.HTTP_200_OK
#             )

class DeleteZebraNFTView(generics.DestroyAPIView):
    """
    Delete a ZebraNFT
    """
    permission_classes = [permissions.AllowAny,]
    serializer_class = ZebraNFTSerializer

    def delete(self, request, id):
        try:
            zebraNFT = ZebraNFT.objects.get(id=id)
            zebraNFT.delete()
            return Response(
                {"message": "ZebraNFT deleted successfully"},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


# class DeleteZebraNFTView(APIView):
#     """
#     Delete a ZebraNFT. \n
#     Delete operation is 2 steps:
#         1. frontend is going to call revokeOffers() onc-chain to revoke all offers
#         2. backend will only get called if this operation is successful on the front end
#     Now, check authentication and delete
#     """
#     def delete(self, request, pk):

#         nftAddress = request.data['nftAddress']
#         tokenId = request.data['tokenId']
#         pricePerSecond = request.data['pricePerSecond']
#         maxRentDuration = request.data['maxRentDuration']
#         nonce = request.data['nonce']

#         # the authenticate person returns
#         jwt = request.COOKIES['cookie']
#         senderAddress = sdk.auth.authenticate(jwt) # this will return the wanted address

#         rentalContractInstance = sdk.get_contract(nftAddress)

#         # some way to check if the revoke operation was successful
#         # based on the nonce. so if at this point, there are no offers that hold the current nonce,
#         # then that should be an indicator that the revoke operation was successful.
#         # otherwise, there would be at least 1 offer that holds the current nonce.

#         if not rentalContractInstance.owner_of(tokenId) == senderAddress:
#             return Response(
#                 {"error": "Sender is not owner of the NFT"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         try:
#             nft = ZebraNFT.objects.get(pk=pk)
#         except Exception as e:
#             return Response(
#                 {"error": f'Issue grabbing NFT instance to be deleted: {str(e)}'},
#                 status=status.HTTP_404_NOT_FOUND
#             )
#         try:    
#             nft.delete()
#             return Response(
#                 {"message": "NFT deleted successfully"},
#                 status=status.HTTP_204_NO_CONTENT
#             )
#         except Exception as e:
#             return Response(
#                 {"error": f'Unable to delete entry {str(e)}'},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

class ZebraNFTListViewByPrice(generics.ListAPIView):
    """
    List all ZebraNFTs by price
    """
    permission_classes = [permissions.AllowAny,]
    serializer_class = ZebraNFTSerializer

    def get(self, request):
        zebraNFTS = ZebraNFT.objects.all().order_by('-pricePerSecond')
        serializer = ZebraNFTSerializer(zebraNFTS, many=True)
        return Response(
            {"nfts": serializer.data},
            status=status.HTTP_200_OK
        )



class ZebraNFTListViewByPriceAndCollection(generics.ListAPIView):
    """
    List all ZebraNFTs by price and collection
    """
    permission_classes = [permissions.AllowAny,]
    serializer_class = ZebraNFTSerializer

    def get(self, request, address):
        try:
            nfts = ZebraNFT.objects.filter(nftAddress=address).order_by('-pricePerSecond')
            serializer = ZebraNFTSerializer(nfts, many=True)
            return Response(
                {"nfts": serializer.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GetNFTsBySupplierAddress(generics.ListAPIView):
    """
    List all ZebraNFTs by supplier address
    """
    permission_classes = [permissions.AllowAny,]
    serializer_class = ZebraNFTSerializer

    def get(self, request, address):
        try:
            nfts = ZebraNFT.objects.filter(supplierAddress=address)
            serializer = ZebraNFTSerializer(nfts, many=True)
            return Response(
                {"nfts": serializer.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )