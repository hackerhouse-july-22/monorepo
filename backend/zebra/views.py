
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .utils import recoverAddress, isValidEthereumAddress

from .models import ZebraNFT
from .serializers import ZebraNFTSerializer

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
    Create a ZebraNFT
    """
    def post(self, request):
        nftAddress = request.data['nftAddress']
        tokenId = request.data['tokenId']
        pricePerSecond = request.data['pricePerSecond']
        maxRentDuration = request.data['maxRentDuration']
        nonce = request.data['nonce']

        signature = request.data['signature']
        
        if not recoverAddress(signature, nonce):
            return Response(
                {"error": "Invalid signature"},
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