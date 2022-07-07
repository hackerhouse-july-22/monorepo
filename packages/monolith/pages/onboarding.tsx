import { NextPage } from "next";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";

const Onboarding: NextPage = () => (
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
          Have NFT’s? We help you supply them.{" "}
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
        bgColor="#0A0A0A"
        borderColor="pink.500"
        borderWidth={2}
        borderRadius={8}
      >
        <Heading as="h2" size="lg">
          Have NFT’s? We help you supply them.{" "}
        </Heading>
        <Text mt={4}>
          We’ll find renters, and ensure that your assets remain safe with our
          trusted Gnosis safe system.
        </Text>
        <Button colorScheme="pink" mt={4}>
          Get Started Renting
        </Button>
      </Box>
    </HStack>
  </Container>
);

export default Onboarding;
