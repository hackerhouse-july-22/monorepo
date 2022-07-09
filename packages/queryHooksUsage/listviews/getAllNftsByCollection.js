import {
  useGetNftsByCollectionQuery,
  useLazyGetNftsByCollectionQuery,
} from '../../monolith/slices/zebraApi'



export default function GetNFTsByCollection() {

  // Queries on Page Load
  const {
    data: getNftsByCollectionData,
    isSuccess: getNftsByCollectionIsSuccess,
    isLoading: getNftsByCollectionIsLoading,
    isError: getNftsByCollectionIsError,
  } = useGetNftsByCollectionQuery();

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
      {getNftsByCollectionData && getNftsByCollectionData.nfts.map(nft => (
        <div key={nft.id}>
          <p>{nft.supplierAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
        </div>
      ))}

      {lazyGetNftsByCollectionIsLoading && (<p>Loading...</p>)}
      {lazyGetNftsByCollectionIsError && (<p>Error!</p>)}
      {lazyGetNftsByCollectionData && lazyGetNftsByCollectionData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {lazyGetNftsByCollectionData && lazyGetNftsByCollectionData.nfts.map(nft => (
        <div key={nft.id}>
          <p>{nft.supplierAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
        </div>
      ))}

      <button
        onClick={ async () => {
          await getNftsByCollection()
        }}
        disabled={lazyGetNftsByCollectionIsLoading}
      >
        Get NFTs By Collection
      </button>

    
    </>
  )

}

