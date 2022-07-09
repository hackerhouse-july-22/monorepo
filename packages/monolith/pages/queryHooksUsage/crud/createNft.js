import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCreateNftListingMutation } from '../../../slices/zebraSlice'


export default function CreateNFT() {

  const router = useRouter()

  
  const [mutationVars, setMutationVars] = useState({
    supplierAddress: '',
    nftAddress: '',
    tokenId: '',
    pricePerSecond: '',
    maxRentDuration: '',
    nonce: '',
  })


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
      mutationVars,
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