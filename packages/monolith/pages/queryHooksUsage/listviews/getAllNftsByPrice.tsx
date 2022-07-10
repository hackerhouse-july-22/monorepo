import { NextPage } from 'next';
import { Button } from '@chakra-ui/react';

import {
  useGetNftsByPriceQuery,
  useLazyGetNftsByPriceQuery,
} from '@/slices/zebraApi';
import IZebraNFT from 'types/IZebraNFT';



const GetNFTsByPrice: NextPage = () => {

  // Queries on Page Load
  const {
    data: getNftsByPriceData,
    isSuccess: getNftsByPriceIsSuccess,
    isLoading: getNftsByPriceIsLoading,
    isError: getNftsByPriceIsError,
  } = useGetNftsByPriceQuery();

  // Needs Trigger
  const [
    getNftsByPrice,
    {
      data: lazyGetNftsByPriceData,
      isSuccess: lazyGetNftsByPriceIsSuccess,
      isLoading: lazyGetNftsByPriceIsLoading,
      isError: lazyGetNftsByPriceIsError,
    }
  ] = useLazyGetNftsByPriceQuery();



  return (
    <>
      {getNftsByPriceIsSuccess && (<p>Success!</p>)}
      {getNftsByPriceIsLoading && (<p>Loading...</p>)}
      {getNftsByPriceIsError && (<p>Error!</p>)}
      {getNftsByPriceData && getNftsByPriceData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {getNftsByPriceData && getNftsByPriceData.nfts.map((nft: IZebraNFT) => (
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

      {lazyGetNftsByPriceIsLoading && (<p>Loading...</p>)}
      {lazyGetNftsByPriceIsError && (<p>Error!</p>)}
      {lazyGetNftsByPriceData && lazyGetNftsByPriceData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {lazyGetNftsByPriceData && lazyGetNftsByPriceData.nfts.map((nft: IZebraNFT) => (
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
        colorScheme='teal'
        onClick={ async () => {
          await getNftsByPrice()
        }}
        disabled={lazyGetNftsByPriceIsLoading}
      >
        Get NFTs By Price
      </Button>

    
    </>
  )

}

export default GetNFTsByPrice;