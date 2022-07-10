import React, { useEffect, useState } from "react";
import {
  BoxProps,
  Button,
  Flex,
  Heading,
  Spacer,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useContractRead } from "wagmi";
import { SnookAbi } from "@/components/UsersSnooks/UsersSnooks.constants";
import SnookData from "@/types/SnookData";

type GameNftCardProps = {
  nftId: number;
  canSupply?: boolean;
  price: number;
  minTime: number;
  maxTime: number;
} & BoxProps;

const GameNftCard: React.FC<GameNftCardProps> = ({
  price,
  minTime,
  maxTime,
  nftId,
  canSupply,
  ...props
}) => {
  const [snookData, setSnookData] = useState<SnookData>();

  const { data: tokenUriData, error } = useContractRead({
    addressOrName: "0x4372597f1c600d86598675dcb6cf5713bb7525cf",
    contractInterface: SnookAbi,
    functionName: "tokenURI",
    args: [nftId],
  });

  const { data } = useContractRead({
    addressOrName: "0xf4a44a0c9d7ae18e55f96bda1bdd996200bc6842",
    contractInterface: SnookAbi,
    functionName: "assetIsRented",
    args: ["0x4372597f1c600d86598675dcb6cf5713bb7525cf", nftId],
  });

  useEffect(() => {
    if (tokenUriData) {
      (async () => {
        const res = await fetch(
          `https://ipfs.io/ipfs/${tokenUriData
            .toString()
            .replace("ipfs://", "")}`
        );
        const data = await res.json();
        setSnookData(data);
      })();
    }
  }, [tokenUriData]);

  const imageUrl = snookData
    ? `https://ipfs.io/ipfs/${snookData?.image
        .toString()
        .replace("ipfs://", "")}`
    : undefined;

  return (
    <Flex
      transition="all 0.2s ease"
      direction="column"
      background={`linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url("${imageUrl}")`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      height="400px"
      p={4}
      borderRadius={8}
      {...props}
    >
      <Flex>
        {canSupply && <Button colorScheme="pink">Supply your NFT</Button>}
        <Spacer />
        <Tag backgroundColor="gray.700" color="white" size="lg">
          {snookData?.name}
        </Tag>
      </Flex>
      <Spacer />
      <Heading as="h3" fontSize="2xl">
        {snookData?.name}
      </Heading>
      <Text mt={2}>
        <Text fontWeight="bold" as="span">
          Price:{" "}
        </Text>
        ${price} / hour
      </Text>
      <Flex alignItems="center" justifyContent="space-between" mt={2}>
        <Text>
          <Text fontWeight="bold" as="span">
            Min:{" "}
          </Text>
          {minTime} hours
        </Text>
        <Text>
          <Text fontWeight="bold" as="span">
            Max:{" "}
          </Text>
          {maxTime} hours
        </Text>
      </Flex>
    </Flex>
  );
};

export default GameNftCard;
