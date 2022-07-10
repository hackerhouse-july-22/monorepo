import { NextPage } from 'next';
import { 
  useGetAllNftsQuery,
  useLazyGetAllNftsQuery,
} from "@/slices/zebraApi";

import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';

import IZebraNFT from '@/types/IZebraNFT';


const GetAllNFTs: NextPage = () => {

  // Queries on Page Load
  const {
    data: getAllNftsData,
    error: getAllNftsError,
    isSuccess: getAllNftsIsSuccess,
    isLoading: getAllNftsIsLoading,
    isError: getAllNftsIsError,
  } = useGetAllNftsQuery({});

  // Needs Trigger
  const [
    getAllNfts,
    {
      data: lazyGetAllNftsData,
      error: lazyGetAllNftsError,
      isSuccess: lazyGetAllNftsIsSuccess,
      isLoading: lazyGetAllNftsIsLoading,
      isError: lazyGetAllNftsIsError,
    }
  ] = useLazyGetAllNftsQuery();


  return (
    <>

      {getAllNftsIsSuccess && (<p>Success!</p>)}
      {getAllNftsIsLoading && (<p>Loading...</p>)}
      {getAllNftsIsError && (<p>{getAllNftsData.error ?? "Error!"}</p>)}
      {getAllNftsData && getAllNftsData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {getAllNftsData && getAllNftsData.nfts.map((nft: IZebraNFT) => (
        <div key={nft.id}>
          <p>{nft.supplierAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
          {/* NEW DATA */}
          <p>{nft.renterWalletInfo?.user_wallet_address ?? "no renter"}</p>
          <p>{nft.renterWalletInfo?.gnosis_safe_address ?? "no renter"}</p>
        </div>
      ))}

      {lazyGetAllNftsIsLoading && (<p>Loading...</p>)}
      {lazyGetAllNftsIsError && (<p>Error!</p>)}
      {lazyGetAllNftsData && lazyGetAllNftsData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {lazyGetAllNftsData && lazyGetAllNftsData.nfts.map((nft: IZebraNFT) => (
        <div key={nft.id}>
          <p>{nft.supplierAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
          {/* NEW DATA */}
          <p>{nft.renterWalletInfo?.user_wallet_address ?? "no renter"}</p>
          <p>{nft.renterWalletInfo?.gnosis_safe_address ?? "no renter"}</p>
        </div>
      ))}

      <button 
        onClick={ async () => {
          await getAllNfts()
        }}
        disabled={lazyGetAllNftsIsLoading}
      >
        Get All Nfts
      </button>

    
    </>
  )
}

export default GetAllNFTs;