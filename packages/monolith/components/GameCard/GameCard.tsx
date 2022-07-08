import React from "react";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import NextLink from "next/link";

type GameCardProps = {
  name: string;
  numAssets: number;
  imageUrl: string;
  url: string;
};

const GameCard: React.FC<GameCardProps> = ({
  numAssets,
  name,
  imageUrl,
  url,
}) => (
  <NextLink href={`/games/${url}`}>
    <Flex
      transition="all 0.2s ease"
      direction="column"
      background={`linear-gradient(rgba(0, 0, 0, 0), rgba(38, 6, 35, 0.8)), url("${imageUrl}")`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      height="300px"
      cursor="pointer"
      borderRadius={8}
      overflow="hidden"
      _hover={{
        transform: "scale(1.01)",
      }}
      p={4}
      borderColor="pink.900"
      borderWidth={2}
    >
      <Box flex={1} />
      <Flex alignItems="center">
        <Text fontWeight="bold" color="white" fontSize="4xl">
          {name}
        </Text>
        <Text color="white" fontSize="lg" ml={4}>
          {numAssets} Assets
        </Text>
        <Box flex={1} />
      </Flex>
    </Flex>
  </NextLink>
);

export default GameCard;
