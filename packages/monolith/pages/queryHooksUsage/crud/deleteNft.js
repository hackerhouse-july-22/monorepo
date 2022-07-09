import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDeleteNftListingMutation } from '@/slices/zebraApi';



export default function DeleteNFT() {

  const router = useRouter();

  const [pk, setPk] = useState('');

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
      router.push('/', undefined, { shallow: true });
    }
  }, [deleteNftListingIsSuccess])

  return (
    <>
      {deleteNftListingIsSuccess && (<p>Success!</p>)} 
      {deleteNftListingIsLoading && (<p>Loading...</p>)}
      {deleteNftListingIsError && (<p>Error!</p>)}

      <button
        onClick={async () => {
          await deleteNftListing({
            pk,
          })
        }}
        disabled={deleteNftListingIsLoading}
      >
        Delete Nft Listing
      </button>
      


    </>
  )
}