import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Radio,
  Spinner,
  Text,
} from "@chakra-ui/react";

export type SelectableNftProps = {
  isSelected?: boolean;
  onClick?: () => void;
  imageUrl?: string;
  onEdit?: () => void;
  isLoading?: boolean;
  price: number;
  name: string;
};

const SelectableNft: React.FC<SelectableNftProps> = ({
  isSelected,
  onClick,
  imageUrl,
  onEdit,
  isLoading,
  price,
  name,
}) => (
  <Box backgroundColor="blackAlpha.700" borderRadius={12} overflow="hidden">
    <Box p={4}>
      <Flex
        transition="all 0.2s ease"
        direction="column"
        background={`${
          isSelected
            ? "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)), "
            : "linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0)), "
        }url("${imageUrl}")`}
        backgroundPosition="center"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        height="300px"
      >
        {isLoading ? (
          <Center h="100%">
            <Box>
              <Spinner size="lg" thickness="4" color="pink.500" />
            </Box>
          </Center>
        ) : (
          <>
            <Flex justifyContent="flex-end">
              <Radio
                isChecked={isSelected}
                onClick={onClick}
                size="lg"
                colorScheme="pink"
              />
            </Flex>
            <Box flex={1} />
            <Flex
              background="gray.300"
              pb={6}
              p={4}
              borderRadius={12}
              alignItems="center"
              opacity={isSelected ? 1 : 0}
              transition="all 0.2s ease"
            >
              <Box textAlign="left">
                <Text color="gray.900" fontSize="md" fontWeight="bold">
                  {name}
                </Text>
                <Text color="gray.500" fontSize="xs" mt={1}>
                  ETH {price}
                </Text>
              </Box>
              <Box flex={1} />
              <Button colorScheme="pink" onClick={onEdit}>
                Edit Price
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  </Box>
);

export default SelectableNft;
