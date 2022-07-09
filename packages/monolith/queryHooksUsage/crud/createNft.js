import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  // CRUD
  useCreateNftListingMutation,
  useReadNftListingQuery,
  useUpdateNftListingMutation,
  useDeleteNftListingMutation,

  // List Views
  useGetAllNftsQuery,
  useLazyGetAllNftsQuery,
  useGetNftsBySupplierQuery,
  useLazyGetNftsBySupplierQuery,
  useGetNftsByCollectionQuery,
  useLazyGetNftsByCollectionQuery,
  useGetNftsByPriceQuery,
  useLazyGetNftsByPriceQuery,
} from '../../../slices/zebraSlice'


export default function CreateNFT() {

  const router = useRouter()

  const [
    createNftListing,
    {
      data: createNftListingData,
      isSuccess: createNftListingIsSuccess,
      isLoading: createNftListingIsLoading,
      isError: createNftListingIsError,
    }
  ] = useCreateNftListingMutation()

  const handleCreateNftListing = async () => {
    await createNftListing({
      supplierAddress,
      nftAddress,
      tokenId,
      pricePerSecond,
      maxRentDuration,
      nonce
    })
  }

  useEffect(() => {
    if (createNftListingData) {
      router.push('/nfts', undefined, { shallow: true })
    }
  }, [createNftListingData])


  return (
    <>
      <h1>Zebra API Usage</h1>
      <hr />

      {createNftListingIsSuccess && (<p>Success!</p>)}
      {createNftListingIsLoading && (<p>Loading...</p>)}
      {createNftListingIsError && (<p>Error!</p>)}
      <button onClick={handleCreateNftListing}>Create Nft Listing</button>
      
    
    </>
  )
}