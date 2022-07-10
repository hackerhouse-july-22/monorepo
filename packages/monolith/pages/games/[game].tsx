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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import GameNftCard from "@/components/GameNftCard";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch } from "store";
import UseNftModal from "@/components/UseNftModal";
import { show } from "@/slices/useNftModalSlice";
import {
  useGetNftsByCollectionQuery,
  useGetWalletInfoQuery,
} from "@/slices/zebraApi";
import { IZebraNFT } from "@/types/IZebraNFT";
import { useAccount } from "wagmi";

const Game: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, error } = useGetNftsByCollectionQuery(
    "0x4372597f1c600d86598675dcb6cf5713bb7525cf"
  );

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching data",
        status: "error",
      });
    }
  }, [error]);

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
            <BreadcrumbLink as="span">Snook</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex alignItems="center" mt={2}>
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
        {data?.nfts &&
          (data?.nfts as IZebraNFT[]).map(
            ({ id, tokenId, pricePerSecond, maxRentDuration }) => (
              <GameNftCard
                key={tokenId}
                price={pricePerSecond}
                minTime={12}
                maxTime={maxRentDuration}
                nftId={tokenId}
                onClick={() => dispatch(show({ nftId: tokenId, id }))}
              />
            )
          )}
      </SimpleGrid>
      <UseNftModal />
    </PageContainer>
  );
};

export default Game;
