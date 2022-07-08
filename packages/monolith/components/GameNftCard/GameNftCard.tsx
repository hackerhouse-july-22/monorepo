import React from "react";
import { Button, Flex, Heading, Spacer, Tag, Text } from "@chakra-ui/react";

type GameNftCardProps = {
  imageUrl: string;
  category: string;
  canSupply?: boolean;
  name: string;
  price: number;
  minTime: number;
  maxTime: number;
};

const GameNftCard: React.FC<GameNftCardProps> = ({
  price,
  category,
  name,
  maxTime,
  minTime,
  canSupply,
  imageUrl,
}) => (
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
  >
    <Flex>
      {canSupply && <Button colorScheme="pink">Supply your NFT</Button>}
      <Spacer />
      <Tag backgroundColor="gray.700" color="white" size="lg">
        {category}
      </Tag>
    </Flex>
    <Spacer />
    <Heading as="h3" fontSize="2xl">
      {name}
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

export default GameNftCard;
