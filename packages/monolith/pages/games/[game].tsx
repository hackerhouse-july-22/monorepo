import PageContainer from "@/components/PageContainer";
import type { NextPage } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import GameNftCard from "@/components/GameNftCard";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Game: NextPage = () => {
  const router = useRouter();
  return (
    <PageContainer px={8}>
      <Breadcrumb
        spacing="8px"
        separator={<BsChevronRight color="gray.500" />}
        mt={8}
      >
        <BreadcrumbItem>
          <NextLink href="/">
            <BreadcrumbLink as="span">Games</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <NextLink href={router.asPath}>
            <BreadcrumbLink as="span">Contact</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex alignItems="center">
        <Heading as="h1" size="2xl">
          Snook NFTs
        </Heading>
        <Spacer />
        <Button size="lg" colorScheme="pink">
          Supply Your Snook NFT
        </Button>
      </Flex>
      <SimpleGrid mt={4} columns={4} spacing={6}>
        <Input placeholder="Search" />
        <Select placeholder="Sort By...">
          <option>Test</option>
          <option>Abc</option>
        </Select>
        <Select placeholder="Select Asset Category">
          <option>Test</option>
          <option>Abc</option>
        </Select>
      </SimpleGrid>
      <SimpleGrid columns={6} spacing={8} mt={8}>
        <GameNftCard
          imageUrl="https://www.esports.net/wp-content/uploads/2022/02/snook-game-review.jpg"
          name="Snook Basic Snek"
          category="Basic"
          price={123}
          minTime={12}
          maxTime={24}
        />
      </SimpleGrid>
    </PageContainer>
  );
};

export default Game;
