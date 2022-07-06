from django.urls import path

from .views import *

urlpatterns = [
    path('list/', ZebraNFTListView.as_view(), name='zebra-nft-list'),
    path('create/', CreateZebraNFTView.as_view(), name='zebra-nft-create'),
    path('read/', ReadZebraNFTView.as_view(), name='zebra-nft-read'),
    path('update/', UpdateZebraNFTView.as_view(), name='zebra-nft-update'),
    path('delete/', DeleteZebraNFTView.as_view(), name='zebra-nft-delete'),
]