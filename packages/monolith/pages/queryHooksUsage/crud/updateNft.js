import { useState } from 'react';

import {
  useUpdateNftListingMutation,
} from '../../../slices/zebraApi'


export default function UpdateNFT() {

  const [mutationVars, setMutationVars] = useState({
    pk: '',
    supplierAddress: '',
    nftAddress: '',
    tokenId: '',
    pricePerSecond: '',
    maxRentDuration: '',
    nonce: '',
  })

  const [
    updateNftListing,
    {
      data: updateNftListingData,
      isSuccess: updateNftListingIsSuccess,
      isLoading: updateNftListingIsLoading,
      isError: updateNftListingIsError,
    }
  ] = useUpdateNftListingMutation()



  return (
    <>
      {updateNftListingIsSuccess && (<p>Success!</p>)}
      {updateNftListingIsLoading && (<p>Loading...</p>)}
      {updateNftListingIsError && (<p>Error!</p>)}

      <button 
        onClick={async () => {
          await updateNftListing({
            mutationVars,
          })
        }}
        disabled={updateNftListingIsLoading}
      >
        Update Nft Listing
      </button>

          

    </>
  )
}