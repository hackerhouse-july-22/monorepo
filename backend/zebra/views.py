
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .utils import recoverAddress, isValidEthereumAddress

from .models import ZebraNFT
from .serializers import ZebraNFTSerializer

from thirdweb import ThirdwebSDK

sdk = ThirdwebSDK("mumbai")

ZEBRA_PROTOCOL_ADDRESS = '0x0000000000000000000000000000000000000001'
zebraContract = sdk.get_contract(ZEBRA_PROTOCOL_ADDRESS)
# Can also use abi
# zebraProtocolAbi = # insert abi here
# zebraContractFromAbi = sdk.get_contract_from_abi(zebraProtocolAbi)

class ZebraNFTListView(APIView):
    """
    List all ZebraNFTs
    """
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

class CreateZebraNFTView(APIView):
    """
    Create a ZebraNFT.
    Validation functionality:
        1. Check if signature passed by the user is valid
        2. Check if the address is owner
        3. Check if the tokenId is approved by the protocol contract
    """
    def post(self, request):
        nftAddress = request.data['nftAddress']
        tokenId = request.data['tokenId']
        pricePerSecond = request.data['pricePerSecond']
        maxRentDuration = request.data['maxRentDuration']
        nonce = request.data['nonce']

        rentalContractInstance = sdk.get_contract(nftAddress)


        signature = request.data['signature']

        # Check if sender signature is valid
        if not recoverAddress(signature, nonce):
            return Response(
                {"error": "Invalid signature"},
                status=status.HTTP_400_BAD_REQUEST
            )
        senderAddress = recoverAddress(signature, nonce)

        # Check if sender is owner of the NFT
        if not rentalContractInstance.owner_of(tokenId):
            return Response(
                {"error": "Sender is not owner of the NFT"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if tokenId is approved by the protocol contract
        # if not zebraContract.call("isApproved", tokenId):
        # if not zebraContract.call("isApproved", senderAddress):
        if not zebraContract.call("isApproved", senderAddress, tokenId):
            return Response(
                {"error": "TokenId is not approved by the protocol contract"},
                status=status.HTTP_400_BAD_REQUEST
            )
        

        try:
            serializer = ZebraNFTSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "ZebraNFT created successfully"},
                    status=status.HTTP_201_CREATED
                )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ReadZebraNFTView(APIView):
    """
    Read a ZebraNFT
    """
    def get(self, request):
        try:
            nft = ZebraNFT.objects.all()
            serializer = ZebraNFTSerializer(nft, many=True)
            return Response(
                {"nfts": serializer.data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UpdateZebraNFTView(APIView):
    """
    Update a ZebraNFT
    """
    def put(self, request, pk):
        nft = ZebraNFT.objects.get(pk=pk)
        serializer = ZebraNFTSerializer(nft, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "NFT updated successfully"},
                status=status.HTTP_200_OK
            )
        return Response(
            {"error": f'NFT update failed {serializer.errors or "error"}'},
            status=status.HTTP_400_BAD_REQUEST
        )

class DeleteZebraNFTView(APIView):
    """
    Delete a ZebraNFT
    """
    def delete(self, request, pk):
        try:
            nft = ZebraNFT.objects.get(pk=pk)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_404_NOT_FOUND
            )
        try:    
            nft.delete()
            return Response(
                {"message": "NFT deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {"error": f'Unable to delete entry {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )