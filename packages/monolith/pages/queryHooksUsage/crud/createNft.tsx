import { NextPage } from "next";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCreateNftListingMutation } from '../../../slices/zebraApi'
import { Button, Box, Flex, Center } from '@chakra-ui/react'

// interface IZebraNFT {
//   id?: string,
//   supplierAddress: string,
//   nftAddress: string,
//   tokenId: number,
//   pricePerSecond: number,
//   maxRentDuration: number,
//   nonce: number,
//   created_at?: string,
//   updated_at?: string,
// }

const CreateNFT: NextPage = () => {

  const router = useRouter()

  const samepleNFT: IZebraNFT = {
    supplierAddress: '0x8A7D1a110bE72f1daC683Fc0Cf23685b380faA32',
    nftAddress: '0x09aA1A14e572e6fC05F64e541699D3E0361C7F2f',
    tokenId: 2208,
    pricePerSecond: 2,
    maxRentDuration: 180,
    nonce: 0,
  }
  
  const [sampleNft2, setMutationVars] = useState<IZebraNFT>({
    supplierAddress: '',
    nftAddress: '',
    tokenId: 0,
    pricePerSecond: 0,
    maxRentDuration: 0,
    nonce: 0,
  })


  const [
    createNftListing,
    {
      data: createNftListingData,
      error: createNftListingError,
      isSuccess: createNftListingIsSuccess,
      isLoading: createNftListingIsLoading,
      isError: createNftListingIsError,
    }
  ] = useCreateNftListingMutation()

  const handleCreateNftListing = async () => {
    console.log('in handleCreateNftListing')
    await createNftListing(samepleNFT) // NOTE: only Object types can be passed to mutation hooks
  }

  useEffect(() => {
    if (createNftListingData) {
      console.log('createNftListingData', createNftListingData)
      // router.push('/nfts', undefined, { shallow: true })
    }
  }, [createNftListingData])

  useEffect(() => {
    if (createNftListingIsError) {
      console.log('createNftListingIsError', createNftListingIsError)
      console.log('createNftListingError', createNftListingError)
    }
  }, [createNftListingIsError])


  return (
    <>
      <Center>
        <Box width={'300px'}>

          <h1>Zebra API Usage</h1>
          <hr />

          {createNftListingIsSuccess && (<p>Success!</p>)}
          {createNftListingIsLoading && (<p>Loading...</p>)}
          {createNftListingIsError && (<p>Error!</p>)}
          <Button 
            onClick={handleCreateNftListing}
            colorScheme="blue"
            >
            Create Nft Listing

          </Button>
        </Box>

      </Center>
    
    </>
  )
}

export default CreateNFT