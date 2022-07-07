import { NextPage } from "next";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import PageContainer from "../../components/PageContainer/PageContainer";

const Onboarding: NextPage = () => (
  <PageContainer>
    <Container>
      <Heading as="h1" size="2xl" textAlign="center">
        Welcome to Zebra!
      </Heading>
      <HStack mt={16} maxW={800} mx="auto" spacing={8}>
        <Box
          p={6}
          bgColor="#0A0A0A"
          borderColor="pink.700"
          borderWidth={2}
          borderRadius={8}
        >
          <Heading as="h2" size="lg">
            Trying to play a game? Rent any NFT.{" "}
          </Heading>
          <Text mt={4}>
            We’ll find renters, and ensure that your assets remain safe with our
            trusted Gnosis safe system.
          </Text>
          <Button colorScheme="pink" mt={4}>
            Get Started Lending
          </Button>
        </Box>

        <Box
          p={6}
          bgColor="cardBackground"
          borderColor="pink.500"
          borderWidth={2}
          borderRadius={8}
        >
          <Heading as="h2" size="lg">
            Trying to play a game? Rent any NFT.{" "}
          </Heading>
          <Text mt={4}>
            No more buying expensive NFT’s to play a Web3 game. Rent on demand
            with affordable hourly rates.
          </Text>
          <NextLink href="/onboarding/renting">
            <Button colorScheme="pink" mt={4}>
              Get Started Renting
            </Button>
          </NextLink>
        </Box>
      </HStack>
    </Container>
  </PageContainer>
);

export default Onboarding;
