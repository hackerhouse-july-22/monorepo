import { NextPage } from "next";
import { Button, Container, Heading, Link, Text } from "@chakra-ui/react";
import PageContainer from "@/components/PageContainer";

const OnboardingRenting: NextPage = () => (
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
      <Button colorScheme="pink" mt={6}>
        Create Gnosis Safe
      </Button>
    </Container>
  </PageContainer>
);

export default OnboardingRenting;
