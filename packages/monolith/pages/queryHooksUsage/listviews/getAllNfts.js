import { 
  useGetAllNftsQuery,
  useLazyGetAllNftsQuery,
} from "@/slices/zebraApi";



export default function GetAllNFTs() {

  // Queries on Page Load
  const {
    data: getAllNftsData,
    isSuccess: getAllNftsIsSuccess,
    isLoading: getAllNftsIsLoading,
    isError: getAllNftsIsError,
  } = useGetAllNftsQuery();

  // Needs Trigger
  const [
    getAllNfts,
    {
      data: lazyGetAllNftsData,
      isSuccess: lazyGetAllNftsIsSuccess,
      isLoading: lazyGetAllNftsIsLoading,
      isError: lazyGetAllNftsIsError,
    }
  ] = useLazyGetAllNftsQuery();


  return (
    <>

      {getAllNftsIsSuccess && (<p>Success!</p>)}
      {getAllNftsIsLoading && (<p>Loading...</p>)}
      {getAllNftsIsError && (<p>Error!</p>)}
      {getAllNftsData && getAllNftsData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {getAllNftsData && getAllNftsData.nfts.map(nft => (
        <div key={nft.id}>
          <p>{nft.supplierAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
        </div>
      ))}

      {lazyGetAllNftsIsLoading && (<p>Loading...</p>)}
      {lazyGetAllNftsIsError && (<p>Error!</p>)}
      {lazyGetAllNftsData && lazyGetAllNftsData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {lazyGetAllNftsData && lazyGetAllNftsData.nfts.map(nft => (
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
          await getAllNfts()
        }}
        disabled={lazyGetAllNftsIsLoading}
      >
        Get All Nfts
      </button>

    
    </>
  )
}