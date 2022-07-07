import React from "react";
import { Box, Button, Flex, Radio, Tag, Text, Tooltip } from "@chakra-ui/react";

type NftCardProps = {
  imageUrl: string;
  isRented?: boolean;
};

const NftCard: React.FC<NftCardProps> = ({ imageUrl, isRented }) => (
  <Box backgroundColor="blackAlpha.700" borderRadius={12} overflow="hidden">
    <Box p={4}>
      <Flex
        transition="all 0.2s ease"
        direction="column"
        background={`${
          isRented
            ? "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)), "
            : "linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0)), "
        }url("${imageUrl}")`}
        backgroundPosition="center"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        height="300px"
      >
        <Flex justifyContent="flex-end">
          {isRented && (
            <Tooltip label="6hrs left">
              <Tag colorScheme="red">Rented</Tag>
            </Tooltip>
          )}
        </Flex>
        <Box flex={1} />
        <Flex
          background="gray.300"
          pb={6}
          p={4}
          borderRadius={12}
          alignItems="center"
        >
          <Box>
            <Text color="gray.900" fontSize="lg" fontWeight="bold">
              0.012 ETH / Day
            </Text>
            <Text color="gray.600" fontSize="xs" mt={1}>
              2hrs min, 4hrs max
            </Text>
          </Box>
          <Box flex={1} />
          <Button colorScheme="pink" isDisabled={isRented}>
            Edit
          </Button>
        </Flex>
      </Flex>
    </Box>
  </Box>
);

export default NftCard;
