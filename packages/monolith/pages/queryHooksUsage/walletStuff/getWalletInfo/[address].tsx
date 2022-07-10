import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetWalletInfoQuery,
  useLazyGetWalletInfoQuery,
} from "@/slices/zebraApi";
import { Button, Box, Flex, Center } from "@chakra-ui/react";
import WalletInfo from "@/types/WalletInfo";

const GetWalletInfo: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const [sampleWalletInfo, setSampleWalletInfo] = useState<WalletInfo>({
    userWalletAddress: "0x8A7D1a110bE72f1daC683Fc0Cf23685b380faA32",
    userGnosisAddress: "0x09aA1A14e572e6fC05F64e541699D3E0361C7F2f",
  });

  const [sampleChangeWalletInfo, setSampleChangeWalletInfo] =
    useState<WalletInfo>({
      userWalletAddress: "0x8A7D1a110bE72f1daC683Fc0Cf23685b380faA32",
      userGnosisAddress: "0x09aA1A14e572e6fC05F64e541699D3E0361C7F2f",
    });

  const {
    data: getWalletInfoData,
    error: getWalletInfoError,
    isSuccess: getWalletInfoIsSuccess,
    isLoading: getWalletInfoIsLoading,
    isError: getWalletInfoIsError,
  } = useGetWalletInfoQuery("0xSample004");

  const [
    getWalletInfo,
    {
      data: lazyGetWalletInfoData,
      error: lazyGetWalletInfoError,
      isSuccess: lazyGetWalletInfoIsSuccess,
      isLoading: lazyGetWalletInfoIsLoading,
      isError: lazyGetWalletInfoIsError,
    },
  ] = useLazyGetWalletInfoQuery();

  const handleLazyGetWalletInfo = async () => {
    console.log("in handleLazyGetWalletInfo");
    await getWalletInfo("0xSample004");
  };

  return (
    <>
      <Box>
        {getWalletInfoIsLoading && <p>Loading...</p>}
        {getWalletInfoIsError && <p>Error!</p>}
        {getWalletInfoIsSuccess && (
          <>
            <p>{getWalletInfoData.userWalletInfo.user_wallet_address}</p>
            <p>{getWalletInfoData.userWalletInfo.gnosis_safe_address}</p>
          </>
        )}
        <br />
        <hr />
        {lazyGetWalletInfoIsLoading && <p>Loading...</p>}
        {lazyGetWalletInfoIsError && <p>Error!</p>}
        {lazyGetWalletInfoIsSuccess && (
          <>
            <p>{lazyGetWalletInfoData.userWalletInfo.user_wallet_address}</p>
            <p>{lazyGetWalletInfoData.userWalletInfo.gnosis_safe_address}</p>
          </>
        )}
      </Box>

      <Center>
        <Box>
          <Flex direction="column" align="center" justify="center">
            
            <Box>
              <Button
                colorScheme="teal"
                onClick={handleLazyGetWalletInfo}
                isLoading={lazyGetWalletInfoIsLoading}
                isDisabled={lazyGetWalletInfoIsLoading}
              >
                Lazy Get Wallet Info
              </Button>
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  )
};

export default GetWalletInfo;
