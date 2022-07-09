import {
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PageContainer from "@/components/PageContainer";
import React, { useEffect, useState } from "react";
import SelectableNft from "@/components/SelectableNft";
import EditPriceModal from "@/components/EditPriceModal";
import UsersSnooks from "@/components/UsersSnooks/UsersSnooks";

const images = [
  "https://lh3.googleusercontent.com/jvaVcHdVPwuExwfjq4YFqV9lCXTx2QEMIZc1S240RzFCZVOHHFuYlW226Jbhk0bYFt1B-rdOx2RLz12N5AkoPyCS3IvLMrLn23Wp3CU=w600",
];

export type SelectedData = {
  id: number;
  price: number;
  minTime: number;
  maxTime: number;
};

const OnboardingLending: React.FC = () => {
  const [selected, setSelected] = useState<SelectedData[]>([]);

  const onContinue = () => {
    console.log(selected);
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
            <UsersSnooks selected={selected} setSelected={setSelected} />
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
