import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react';
import {
  useReadNftListingQuery,
  useLazyReadNftListingQuery
} from '@/slices/zebraApi'


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
            <p>{readNftListingData.tokenId}</p>
            <p>{readNftListingData.pricePerSecond}</p>
            <p>{readNftListingData.maxRentDuration}</p>
            <p>{readNftListingData.nonce}</p>
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
          <p>{lazyReadNftListingData.tokenId}</p>
          <p>{lazyReadNftListingData.pricePerSecond}</p>
          <p>{lazyReadNftListingData.maxRentDuration}</p>
          <p>{lazyReadNftListingData.nonce}</p>
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