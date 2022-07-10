import { NextPage } from "next";
import {
  Button,
  Container,
  Heading,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import PageContainer from "@/components/PageContainer";
import { useAccount, useContractWrite } from "wagmi";
import { abi } from "../../../contracts/out/Zebra.sol/Zebra.json";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCreateWalletInfoMutation } from "@/slices/zebraApi";

const OnboardingRenting: NextPage = () => {
  const router = useRouter();
  const { address } = useAccount();

  const toast = useToast();
  const { write, data, error, isLoading } = useContractWrite({
    addressOrName: "0xf4a44a0c9D7ae18E55f96BDA1BDd996200bC6842",
    contractInterface: abi,
    functionName: "createZebraSafe",
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });

  const [
    createWalletInfo,
    {
      error: createWalletInfoError,
      isSuccess: createWalletInfoIsSuccess,
      isLoading: createWalletInfoIsLoading,
    },
  ] = useCreateWalletInfoMutation();

  useEffect(() => {
    if (error || createWalletInfoError)
      toast({
        title: "Something went wrong :(",
        description: (error || createWalletInfoError)?.toString(),
        status: "error",
      });
  }, [error, createWalletInfoError]);

  useEffect(() => {
    if (data) {
      data.wait().then((d: any) => {
        const userGnosisAddress = d.events.find(
          (e: any) => e.event === "ZebraSafeDeploy"
        ).args[0];
        createWalletInfo({
          userWalletAddress: address,
          userGnosisAddress,
        });
      });
    }
  }, [data]);

  useEffect(() => {
    if (createWalletInfoIsSuccess) {
      toast({ title: "Gnosis Safe Created!", status: "success" });
      router.push("/");
    }
  }, [createWalletInfoIsSuccess]);

  const onCreate = async () => {
    await write();
  };

  return (
    <PageContainer>
      <Container textAlign="center" mx="auto">
        <Heading as="h1" size="2xl" mt={12}>
          Let's setup your renting account...
        </Heading>
        <Text mt={4} maxW="600px" mx="auto">
          Behind the scenes, we use a tool called a{" "}
          <Link href="https://gnosis-safe.io/">Gnosis Safe</Link> when you’re
          renting NFT’s, lets create one for you so you can start renting NFT’s!
        </Text>
        <Button
          colorScheme="pink"
          mt={6}
          onClick={onCreate}
          isLoading={isLoading || createWalletInfoIsLoading}
        >
          Create Gnosis Safe
        </Button>
      </Container>
    </PageContainer>
  );
};

export default OnboardingRenting;
