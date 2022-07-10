import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import IZebraNFT from '@/types/IZebraNFT';

import {
  useUpdateNftListingMutation,
} from '@/slices/zebraApi';


const UpdateNFT: NextPage = () => {

  const [sampleUpdate, setSampleUpdate] = useState<IZebraNFT>({
    id: '3',
    supplierAddress: 'my_name_address_update_test',
    nftAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    nftImage: 'some hyperlink to an image xxsjajsb',
    tokenId: 3,
    pricePerSecond: 6,
    maxRentDuration: 60,
    nonce: 0,
  })

  const [
    updateNftListing,
    {
      data: updateNftListingData,
      error: updateNftListingError,
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

      <Button 
        colorScheme={'teal'}
        onClick={async () => {
          await updateNftListing(sampleUpdate)
        }}
        disabled={updateNftListingIsLoading}
      >
        Update Nft Listing
      </Button>

          

    </>
  )
}

export default UpdateNFT