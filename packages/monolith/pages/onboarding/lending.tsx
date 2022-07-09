import {
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PageContainer from "@/components/PageContainer";
import React, { useState } from "react";
import UsersSnooks from "@/components/UsersSnooks/UsersSnooks";
import { useCreateNftListingMutation } from "@/slices/zebraApi";
import { useAccount } from "wagmi";

export type SelectedData = {
  id: number;
  address?: string;
  price: number;
  minTime: number;
  maxTime: number;
};

const OnboardingLending: React.FC = () => {
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
  const [tokenIdMap, setTokenIdMap] = useState<Record<string, string>>({});

  const { address } = useAccount();

  const [selected, setSelected] = useState<SelectedData[]>([]);

  const setNftAddress = (id: number, tokenId: number) => {
    setTokenIdMap((p) => ({ ...p, [id]: tokenId }));
  };

  const onContinue = async () => {
    const data = selected.map((s) => ({
      supplierAddress: address,
      nftAddress: s.address,
      tokenId: tokenIdMap[s.id],
      pricePerSecond: s.price / 60 / 60,
      minRentDuration: s.minTime,
      maxRentDuration: s.maxTime,
    }));
    console.log(data);
  };

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
