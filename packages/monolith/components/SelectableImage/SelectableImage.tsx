import React from "react";
import { Box, Button, Flex, Radio, Text } from "@chakra-ui/react";

type SelectableImageProps = {
  isSelected?: boolean;
  onClick?: () => void;
  imageUrl: string;
};

const SelectableImage: React.FC<SelectableImageProps> = ({
  isSelected,
  onClick,
  imageUrl,
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
          <Text color="gray.900" fontSize="lg" fontWeight="bold">
            ETH 0.99
          </Text>
          <Box flex={1} />
          <Button colorScheme="pink">Edit Price</Button>
        </Flex>
      </Flex>
    </Box>
  </Box>
);

export default SelectableImage;
