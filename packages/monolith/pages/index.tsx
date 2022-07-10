import type { NextPage } from "next";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import PageContainer from "@/components/PageContainer";
import GameCard from "@/components/GameCard";

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Container>
        <Heading as="h1" size="2xl" textAlign="center" mt={12}>
          Games 🎮
        </Heading>
        <SimpleGrid columns={2} mt={12} spacing={8}>
          <GameCard
            name="Snook"
            numAssets={18}
            imageUrl="https://www.esports.net/wp-content/uploads/2022/02/snook-game-review.jpg"
            url="snook"
          />
        </SimpleGrid>
      </Container>
    </PageContainer>
  );
};

export default Home;
