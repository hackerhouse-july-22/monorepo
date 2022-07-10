import { NextPage } from 'next';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import {
  useGetNftsBySupplierQuery,
  useLazyGetNftsBySupplierQuery,
} from '@/slices/zebraApi';
import IZebraNFT from '@/types/IZebraNFT';



const GetNFTsBySupplier: NextPage = () => {

  const [sampleSupplier, setSampleSupplier] = useState(
    'filler_address'
  );

  // Queries on Page Load
  const {
    data: getNftsBySupplierData,
    isSuccess: getNftsBySupplierIsSuccess,
    isLoading: getNftsBySupplierIsLoading,
    isError: getNftsBySupplierIsError,
  } = useGetNftsBySupplierQuery(sampleSupplier);

  // Needs Trigger
  const [
    getNftsBySupplier,
    {
      data: lazyGetNftsBySupplierData,
      isSuccess: lazyGetNftsBySupplierIsSuccess,
      isLoading: lazyGetNftsBySupplierIsLoading,
      isError: lazyGetNftsBySupplierIsError,
    }
  ] = useLazyGetNftsBySupplierQuery();



  return (
    <>
      {getNftsBySupplierIsSuccess && (<p>Success!</p>)}
      {getNftsBySupplierIsLoading && (<p>Loading...</p>)}
      {getNftsBySupplierIsError && (<p>Error!</p>)}
      {getNftsBySupplierData && getNftsBySupplierData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {getNftsBySupplierData && getNftsBySupplierData.nfts.map((nft: IZebraNFT) => (
        <div key={nft.id}>
          <p>{nft.supplierAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.nftImage}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
          <p>{nft.renterWalletInfo?.user_wallet_address ?? "no renter"}</p>
          <p>{nft.renterWalletInfo?.gnosis_safe_address ?? "no renter"}</p>
        </div>
      ))}

      {lazyGetNftsBySupplierIsLoading && (<p>Loading...</p>)}
      {lazyGetNftsBySupplierIsError && (<p>Error!</p>)}
      {lazyGetNftsBySupplierData && lazyGetNftsBySupplierData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {lazyGetNftsBySupplierData && lazyGetNftsBySupplierData.nfts.map((nft: IZebraNFT) => (
        <div key={nft.id}>
          <p>{nft.supplierAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.nftImage}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
          <p>{nft.renterWalletInfo?.user_wallet_address ?? "no renter"}</p>
          <p>{nft.renterWalletInfo?.gnosis_safe_address ?? "no renter"}</p>
        </div>
      ))}

      <Button
        colorScheme={'teal'}
        onClick={ async () => {
          await getNftsBySupplier(sampleSupplier)
        }}
        disabled={lazyGetNftsBySupplierIsLoading}
      >
        Get NFTs By Supplier
      </Button>

    
    </>
  )

}

export default GetNFTsBySupplier;