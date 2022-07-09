from django.urls import path

from .views import *

# namespace = 'zebra'
urlpatterns = [
    
    # Auth
    path('ethauth/', EthereumAuth.as_view(), name='ethauth'),

    # NFT Endpoints
    path('list/', ZebraNFTListView.as_view(), name='zebra-nft-list'),
    # path('create/', CreateZebraNFTView.as_view(), name='zebra-nft-create'),
    path('create/', CreateNFTView.as_view(), name='zebra-nft-create'),
    path('read/<int:pk>/', ReadZebraNFTView.as_view(), name='zebra-nft-read'),
    path('update/<int:pk>/', UpdateZebraNFTView.as_view(), name='zebra-nft-update'),
    path('delete/<int:pk>/', DeleteZebraNFTView.as_view(), name='zebra-nft-delete'),
    path('list/by-price/', ZebraNFTListViewByPrice.as_view(), name='zebra-nft-list-by-price'),
    path('list/by-collection/<str:address>/', ZebraNFTListViewByPriceAndCollection.as_view(), name='zebra-nft-list-by-collection'),
    path('list/by-supplier/<str:address>/', GetNFTsBySupplierAddress.as_view(), name='zebra-nft-list-by-user'),
]