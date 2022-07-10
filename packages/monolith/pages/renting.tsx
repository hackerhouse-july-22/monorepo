import { NextPage } from "next";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React from "react";
import QrCode from "react-qrcode-svg";
import PageContainer from "@/components/PageContainer";
import NftCard from "@/components/NftCard";
import SnookCardFromId from "@/components/SnookCardFromId";
import { useContractWrite } from "wagmi";
import { abi } from "../../contracts/out/Zebra.sol/Zebra.json";

const RentingDashboard: NextPage = () => {
  const { write, error, isLoading } = useContractWrite({
    addressOrName: "0x802212d3DCCD679EF1c7019Ae8aF44A26c2622D2",
    contractInterface: abi,
    functionName: "rent",
  });

  return (
    <PageContainer>
      <Container>
        <Heading as="h1" size="2xl" mt={12}>
          Borrowing
        </Heading>
        <SimpleGrid columns={3} spacing={4} mt={8}>
          <Stat pt={8}>
            <StatLabel>Rented NFTs</StatLabel>
            <StatNumber>2</StatNumber>
            <StatHelpText>12 in the last month</StatHelpText>
          </Stat>
          <Stat pt={8}>
            <StatLabel>Monthly Revenue</StatLabel>
            <StatNumber>$192.12</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
          <Stat>
            <Flex alignItems="center">
              <Box>
                <Text fontWeight="bold" fontSize="md">
                  Your Wallet
                </Text>
                <Text mt={2} color="gray.600" fontSize="md">
                  0xA9f...PY1
                </Text>
              </Box>
              <Spacer />
              <QrCode
                data="https://github.com/dral/react-qrcode-svg"
                height={100}
                width={100}
                fgColor="white"
                bgColor="transparent"
              />
            </Flex>
          </Stat>
        </SimpleGrid>
        <Heading as="h1" size="2xl" mt={8}>
          NFT's Renting
        </Heading>
        <SimpleGrid columns={4} mt={8} spacing={6}>
          <SnookCardFromId
            secondaryText="Rented for 8 hrs, $20 / hr"
            nftId={232}
            topRightItem={
              <Button size="xs" colorScheme="red">
                Stop Renting
              </Button>
            }
          />
        </SimpleGrid>
      </Container>
    </PageContainer>
  );
};

export default RentingDashboard;
