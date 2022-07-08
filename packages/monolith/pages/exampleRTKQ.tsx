
import { useGetAllNftsQuery } from "slices/zebraApi";


export default function ExampleRTKQ() {

  const {
    data: allNftsData,
    error: allNftsError,
    isError: allNftsIsError,
    isLoading: allNftsIsLoading,
    isSuccess: allNftsIsSuccess,
    refetch: allNftsRefetch,
  } = useGetAllNftsQuery({});

  return (
    <>
      {allNftsIsLoading && <p>Loading...</p>}
      {allNftsIsError && <p>Error: {allNftsData.error ?? "fallback error"}</p>}
      {allNftsIsSuccess && allNftsData.length === 0 && <p>No data</p>}
      {allNftsIsSuccess && allNftsData.length > 0 && (
        allNftsData.map((nft) => (
          <p key={nft.id}>{nft.id}</p>
        ))
      )}
    </>
  )
}