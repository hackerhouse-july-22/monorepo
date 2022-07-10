import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react';
import {
  useReadNftListingQuery,
  useLazyReadNftListingQuery
} from '@/slices/zebraApi'
import IZebraNFT from '@/types/IZebraNFT';


export default function ReadNFT() {
  
  const router = useRouter();
  const { id } = router.query;

  // Queries on Page Load
  const {
    data: readNftListingData,
    isLoading: readNftListingIsLoading,
    isError: readNftListingIsError,
  } = useReadNftListingQuery(id)
  
  // Needs Trigger
  const [
    readNftListing,
    {
      data: lazyReadNftListingData,
      error: lazyReadNftListingError,
      isLoading: lazyReadNftListingIsLoading,
      isError: lazyReadNftListingIsError,
    }
  ] = useLazyReadNftListingQuery()

  return (
    <>
      {readNftListingIsLoading && (<p>Loading...</p>)}
      {readNftListingIsError && (<p>Error!</p>)}
      {readNftListingData && (
        <>
          <div key={readNftListingData.id}>
            <p>{readNftListingData.supplierAddress}</p>
            <p>{readNftListingData.nftAddress}</p>
            <p>{readNftListingData.nftImage}</p>
            <p>{readNftListingData.tokenId}</p>
            <p>{readNftListingData.pricePerSecond}</p>
            <p>{readNftListingData.maxRentDuration}</p>
            <p>{readNftListingData.nonce}</p>
            <p>{readNftListingData.renterWalletInfo?.user_wallet_address ?? "no renter"}</p>
            <p>{readNftListingData.renterWalletInfo?.gnosis_safe_address ?? "no renter"}</p>
            
          </div>
        </>
      )}

      {lazyReadNftListingIsLoading && (<p>Loading...</p>)}
      {lazyReadNftListingIsError && (<p>Error!</p>)}
      {lazyReadNftListingData && (
        <>
        <div key={lazyReadNftListingData.id}>
          <p>{lazyReadNftListingData.supplierAddress}</p>
          <p>{lazyReadNftListingData.nftAddress}</p>
          <p>{lazyReadNftListingData.nftImage}</p>
          <p>{lazyReadNftListingData.tokenId}</p>
          <p>{lazyReadNftListingData.pricePerSecond}</p>
          <p>{lazyReadNftListingData.maxRentDuration}</p>
          <p>{lazyReadNftListingData.nonce}</p>
          <p>{lazyReadNftListingData.renterWalletInfo?.user_wallet_address ?? "no renter"}</p>
          <p>{lazyReadNftListingData.renterWalletInfo?.gnosis_safe_address ?? "no renter"}</p>
        </div>
      </>
      )}

      <Button 
        colorScheme={'blue'}
        onClick={ async () => {
          await readNftListing({ id })
        }}>
          Lazy Read Nft Listing
      </Button>

    </>
  )
}