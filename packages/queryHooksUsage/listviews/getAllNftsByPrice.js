import {
  useGetNftsByPriceQuery,
  useLazyGetNftsByPriceQuery,
} from '../../../slices/zebraApi'



export default function GetNFTsByPrice() {

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
      {getNftsByPriceData && getNftsByPriceData.nfts.map(nft => (
        <div key={nft.id}>
          <p>{nft.PriceAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
        </div>
      ))}

      {lazyGetNftsByPriceIsLoading && (<p>Loading...</p>)}
      {lazyGetNftsByPriceIsError && (<p>Error!</p>)}
      {lazyGetNftsByPriceData && lazyGetNftsByPriceData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {lazyGetNftsByPriceData && lazyGetNftsByPriceData.nfts.map(nft => (
        <div key={nft.id}>
          <p>{nft.PriceAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
        </div>
      ))}

      <button
        onClick={ async () => {
          await getNftsByPrice()
        }}
        disabled={lazyGetNftsByPriceIsLoading}
      >
        Get NFTs By Price
      </button>

    
    </>
  )

}

