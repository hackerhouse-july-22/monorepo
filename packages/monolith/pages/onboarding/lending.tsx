import {
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import PageContainer from "@/components/PageContainer";
import React, { useEffect, useState } from "react";
import UsersSnooks from "@/components/UsersSnooks/UsersSnooks";
import { useCreateNftListingMutation } from "@/slices/zebraApi";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

export type SelectedData = {
  id: number;
  address?: string;
  price: number;
  minTime: number;
  maxTime: number;
};

const OnboardingLending: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [
    createNftListing,
    {
      data: createNftListingData,
      error: createNftListingError,
      isSuccess: createNftListingIsSuccess,
      isLoading: createNftListingIsLoading,
      isError: createNftListingIsErråor,
    },
  ] = useCreateNftListingMutation();
  const [tokenIdMap, setTokenIdMap] = useState<
    Record<string, { nftId: string; nftImage: string }>
  >({});

  const { address } = useAccount();

  const [selected, setSelected] = useState<SelectedData[]>([]);

  const setNftAddress = (id: number, { nftId, nftImage }: any) => {
    setTokenIdMap((p) => ({ ...p, [id]: { nftId, nftImage } }));
  };

  const onContinue = async () => {
    const data = selected.map((s) => ({
      supplierAddress: address,
      tokenId: tokenIdMap[s.id].nftId,
      pricePerSecond: s.price,
      minRentDuration: s.minTime,
      maxRentDuration: s.maxTime,
      nftAddress: "0x4372597f1c600d86598675dcb6cf5713bb7525cf",
      nftImage: tokenIdMap[s.id].nftImage,
      nonce: 0,
    }));
    await Promise.all(data.map((a) => createNftListing(a)));
  };

  useEffect(() => {
    if (createNftListingIsSuccess) {
      toast({
        title: "Created NFT",
        status: "success",
      });
      router.push("/lending");
    }
  }, [createNftListingIsSuccess]);

  return (
    <>
      <PageContainer>
        <Container textAlign="center">
          <Heading as="h1" size="2xl" textAlign="center">
            Lets setup your supply account...
          </Heading>
          <Text mt={6} maxW="600px" mx="auto">
            Choose which NFT’s to rent out, then confirm the rental price for
            each one.
          </Text>
          <SimpleGrid columns={4} mt={8} spacing={6}>
            <UsersSnooks
              selected={selected}
              setSelected={setSelected}
              setNftAddress={setNftAddress}
            />
          </SimpleGrid>
          <Button
            colorScheme="pink"
            size="lg"
            mt={8}
            onClick={onContinue}
            isDisabled={selected.length === 0}
          >
            Continue
          </Button>
        </Container>
      </PageContainer>
    </>
  );
};

export default OnboardingLending;
