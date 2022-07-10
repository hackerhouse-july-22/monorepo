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
import { useContractWrite } from "wagmi";
import { abi } from "../../../contracts/out/Zebra.sol/Zebra.json";
import { useEffect } from "react";
import { useRouter } from "next/router";

const OnboardingRenting: NextPage = () => {
  const router = useRouter();

  const toast = useToast();
  const { write, data, error, isLoading } = useContractWrite({
    addressOrName: "0x802212d3DCCD679EF1c7019Ae8aF44A26c2622D2",
    contractInterface: abi,
    functionName: "createZebraSafe",
  });

  useEffect(() => {
    if (error)
      toast({
        title: "Something went wrong :(",
        description: error.toString(),
        status: "error",
      });
  }, [error]);

  useEffect(() => {
    if (data) {
      toast({ title: "Gnosis Safe Created!", status: "success" });
      router.push("/");
    }
  }, [data]);

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
          isLoading={isLoading}
        >
          Create Gnosis Safe
        </Button>
      </Container>
    </PageContainer>
  );
};

export default OnboardingRenting;
