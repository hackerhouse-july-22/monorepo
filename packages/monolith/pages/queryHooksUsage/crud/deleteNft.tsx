import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDeleteNftListingMutation } from '@/slices/zebraApi';

import { Button, Box, Flex, Center } from '@chakra-ui/react';
import IZebraNFT from '@/types/IZebraNFT';


const DeleteNFT: NextPage = () => {

  const router = useRouter();

  const [id, setId] = useState(2);

  const [
    deleteNftListing,
    {
      data: deleteNftListingData,
      isSuccess: deleteNftListingIsSuccess,
      isLoading: deleteNftListingIsLoading,
      isError: deleteNftListingIsError,
    }
  ] = useDeleteNftListingMutation()
  
  useEffect(() => {
    if (deleteNftListingIsSuccess) {
      // router.push('/', undefined, { shallow: true });
    }
  }, [deleteNftListingIsSuccess])

  return (
    <>
      {deleteNftListingIsSuccess && (<p>Success!</p>)} 
      {deleteNftListingIsLoading && (<p>Loading...</p>)}
      {deleteNftListingIsError && (<p>Error!</p>)}

      <Button
        colorScheme={'teal'}
        onClick={ async () => {
          await deleteNftListing(id)
        }}
        disabled={deleteNftListingIsLoading}
      >
        Delete Nft Listing
      </Button>
      


    </>
  )
}

export default DeleteNFT