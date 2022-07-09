import { useState } from 'react'

import {
  useReadNftListingQuery,
  useLazyReadNftListingQuery
} from '../../../slices/zebraApi'


export default function ReadNFT() {
  
  const [pk, setPk] = useState('');

  // Queries on Page Load
  const {
    data: readNftListingData,
    isLoading: readNftListingIsLoading,
    isError: readNftListingIsError,
  } = useReadNftListingQuery()
  
  // Needs Trigger
  const [
    readNftListing,
    {
      data: lazyReadNftListingData,
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
            <p>readNftListingData.supplierAddress</p>
            <p>readNftListingData.nftAddress</p>
            <p>readNftListingData.tokenId</p>
            <p>readNftListingData.pricePerSecond</p>
            <p>readNftListingData.maxRentDuration</p>
            <p>readNftListingData.nonce</p>
          </div>
        </>
      )}

      {lazyReadNftListingIsLoading && (<p>Loading...</p>)}
      {lazyReadNftListingIsError && (<p>Error!</p>)}
      {lazyReadNftListingData && (
        <>
        <div key={lazyReadNftListingData.id}>
          <p>lazyReadNftListingData.supplierAddress</p>
          <p>lazyReadNftListingData.nftAddress</p>
          <p>lazyReadNftListingData.tokenId</p>
          <p>lazyReadNftListingData.pricePerSecond</p>
          <p>lazyReadNftListingData.maxRentDuration</p>
          <p>lazyReadNftListingData.nonce</p>
        </div>
      </>
      )}

      <button onClick={() => {
        readNftListing({
          pk,
        })
      }}>
        Lazy Read Nft Listing
      </button>

    </>
  )
}