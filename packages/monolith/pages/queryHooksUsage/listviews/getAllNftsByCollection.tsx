import { NextPage } from 'next';
import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  useGetNftsByCollectionQuery,
  useLazyGetNftsByCollectionQuery,
} from '@/slices/zebraApi';
import IZebraNFT from '@/types/IZebraNFT';



const GetNFTsByCollection: NextPage = () => {

  const [sampleCollection, setSampleCollection] = useState(
      '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'
    );

  // Queries on Page Load
  const {
    data: getNftsByCollectionData,
    isSuccess: getNftsByCollectionIsSuccess,
    isLoading: getNftsByCollectionIsLoading,
    isError: getNftsByCollectionIsError,
  } = useGetNftsByCollectionQuery(sampleCollection)

  // Needs Trigger
  const [
    getNftsByCollection,
    {
      data: lazyGetNftsByCollectionData,
      isSuccess: lazyGetNftsByCollectionIsSuccess,
      isLoading: lazyGetNftsByCollectionIsLoading,
      isError: lazyGetNftsByCollectionIsError,
    }
  ] = useLazyGetNftsByCollectionQuery();



  return (
    <>
      {getNftsByCollectionIsSuccess && (<p>Success!</p>)}
      {getNftsByCollectionIsLoading && (<p>Loading...</p>)}
      {getNftsByCollectionIsError && (<p>Error!</p>)}
      {getNftsByCollectionData && getNftsByCollectionData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {getNftsByCollectionData && getNftsByCollectionData.nfts.map((nft: IZebraNFT) => (
        <div key={nft.id}>
          <p>{nft.supplierAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.nftImage}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
          <p>{nft.renterWalletInfo?.user_wallet_address ?? "no renter"}</p>
          <p>{nft.renterWalletInfo?.gnosis_safe_address ?? "no renter"}</p>
        </div>
      ))}

      {lazyGetNftsByCollectionIsLoading && (<p>Loading...</p>)}
      {lazyGetNftsByCollectionIsError && (<p>Error!</p>)}
      {lazyGetNftsByCollectionData && lazyGetNftsByCollectionData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {lazyGetNftsByCollectionData && lazyGetNftsByCollectionData.nfts.map((nft: IZebraNFT) => (
        <div key={nft.id}>
          <p>{nft.supplierAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.nftImage}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
      <p>{nft.renterWalletInfo?.user_wallet_address ?? "no renter"}</p>
      <p>{nft.renterWalletInfo?.gnosis_safe_address ?? "no renter"}</p>
        </div>
      ))}

      <Button
        colorScheme={'teal'}
        onClick={ async () => {
          await getNftsByCollection(sampleCollection)
        }}
        disabled={lazyGetNftsByCollectionIsLoading}
      >
        Get NFTs By Collection
      </Button>

    
    </>
  )

}

export default GetNFTsByCollection;