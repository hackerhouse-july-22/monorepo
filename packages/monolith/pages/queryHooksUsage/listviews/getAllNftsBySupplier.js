import {
  useGetNftsBySupplierQuery,
  useLazyGetNftsBySupplierQuery,
} from '@/slices/zebraApi';



export default function GetNFTsBySupplier() {

  // Queries on Page Load
  const {
    data: getNftsBySupplierData,
    isSuccess: getNftsBySupplierIsSuccess,
    isLoading: getNftsBySupplierIsLoading,
    isError: getNftsBySupplierIsError,
  } = useGetNftsBySupplierQuery();

  // Needs Trigger
  const [
    getNftsBySupplier,
    {
      data: lazyGetNftsBySupplierData,
      isSuccess: lazyGetNftsBySupplierIsSuccess,
      isLoading: lazyGetNftsBySupplierIsLoading,
      isError: lazyGetNftsBySupplierIsError,
    }
  ] = useLazyGetNftsBySupplierQuery();



  return (
    <>
      {getNftsBySupplierIsSuccess && (<p>Success!</p>)}
      {getNftsBySupplierIsLoading && (<p>Loading...</p>)}
      {getNftsBySupplierIsError && (<p>Error!</p>)}
      {getNftsBySupplierData && getNftsBySupplierData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {getNftsBySupplierData && getNftsBySupplierData.nfts.map(nft => (
        <div key={nft.id}>
          <p>{nft.supplierAddress}</p>
          <p>{nft.nftAddress}</p>
          <p>{nft.tokenId}</p>
          <p>{nft.pricePerSecond}</p>
          <p>{nft.maxRentDuration}</p>
          <p>{nft.nonce}</p>
        </div>
      ))}

      {lazyGetNftsBySupplierIsLoading && (<p>Loading...</p>)}
      {lazyGetNftsBySupplierIsError && (<p>Error!</p>)}
      {lazyGetNftsBySupplierData && lazyGetNftsBySupplierData.nfts.length === 0 && (
        <p>No Nfts listed</p>
      )}
      {lazyGetNftsBySupplierData && lazyGetNftsBySupplierData.nfts.map(nft => (
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
          await getNftsBySupplier()
        }}
        disabled={lazyGetNftsBySupplierIsLoading}
      >
        Get NFTs By Supplier
      </button>

    
    </>
  )

}

