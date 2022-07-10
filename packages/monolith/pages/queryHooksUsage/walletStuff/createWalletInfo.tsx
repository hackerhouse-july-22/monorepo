import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useCreateWalletInfoMutation } from "@/slices/zebraApi";
import { Button, Box, Flex, Center } from "@chakra-ui/react";
import WalletInfo from "@/types/WalletInfo";

const CreateWalletInfo: NextPage = () => {

  // randomize strings for testing
  const randomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  const sampleWalletInfo: WalletInfo = {
    userWalletAddress: randomString(),
    userGnosisAddress: randomString(),
  }
  
  const [sampleChangeWalletInfo, setChangeWalletInfo] = useState<WalletInfo>({
    userWalletAddress: "0x8A7D1a110bE72f1daC683Fc0Cf23685b380faA32",
    userGnosisAddress: "0x09aA1A14e572e6fC05F64e541699D3E0361C7F2f",
  });

  const [
    createWalletInfo,
    {
      data: createWalletInfoData,
      error: createWalletInfoError,
      isSuccess: createWalletInfoIsSuccess,
      isLoading: createWalletInfoIsLoading,
      isError: createWalletInfoIsError,
    },
  ] = useCreateWalletInfoMutation();

  const handleCreateWalletInfo = async () => {
    console.log("in handleCreateWalletInfo");
    await createWalletInfo(sampleWalletInfo); // NOTE: only Object types can be passed to mutation hooks
  };

  useEffect(() => {
    if (createWalletInfoData) {
      console.log("createWalletInfoData", createWalletInfoData);
      // router.push('/nfts', undefined, { shallow: true })
    }
  }, [createWalletInfoData]);

  return (
    <>

      <h1>SampleData:</h1>
      <p>{JSON.stringify(sampleWalletInfo)}</p>
      <p>{JSON.stringify(sampleChangeWalletInfo)}</p>
      <br />
      <hr />

      { createWalletInfoIsLoading && <p>Loading...</p> }
      { createWalletInfoIsError && <p>Error!</p> }
      { createWalletInfoIsSuccess && (
        <>
          <p>{createWalletInfoData.message}</p>
        </>
      )}

      <Center>
        <Box>
          <Flex direction="column" align="center" justify="center">
            <Box>
              <h1>CreateWalletInfo usage</h1>
              <Button
                colorScheme={"teal"}
                onClick={handleCreateWalletInfo}
                disabled={createWalletInfoIsLoading}
              >
                Create Random Wallet Info
              </Button>
              <br />
              <hr />
              {createWalletInfoIsLoading && <p>Loading...</p>}
              {createWalletInfoIsError && <p>Error!</p>}
              {createWalletInfoIsSuccess && <p>Success!</p>}

              <Button
                colorScheme={"teal"}
                onClick={ async () => {
                  await createWalletInfo(sampleChangeWalletInfo);
                }}
              >
                Create Existing Wallet Info
              </Button>

            </Box>
          </Flex>
        </Box>
      </Center>
  
    </>

  );
};

export default CreateWalletInfo;