import React, { ReactNode } from "react";
import { Box, Button, Flex, Radio, Tag, Text, Tooltip } from "@chakra-ui/react";

export type NftCardProps = {
  imageUrl?: string;
  topRightItem?: ReactNode;
  buttonText?: string;
  isDisabled?: boolean;
  primaryText?: string;
  secondaryText?: string;
  onButtonClick?: () => void;
};

const NftCard: React.FC<NftCardProps> = ({
  imageUrl,
  topRightItem,
  isDisabled,
  buttonText,
  primaryText,
  secondaryText,
  onButtonClick,
}) => (
  <Box backgroundColor="blackAlpha.700" borderRadius={12} overflow="hidden">
    <Box p={4}>
      <Flex
        transition="all 0.2s ease"
        direction="column"
        background={`${
          isDisabled
            ? "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)), "
            : "linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0)), "
        }url("${imageUrl}")`}
        backgroundPosition="center"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        height="300px"
      >
        <Flex justifyContent="flex-end">{topRightItem}</Flex>
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
              {primaryText}
            </Text>
            <Text color="gray.600" fontSize="xs" mt={1}>
              {secondaryText}
            </Text>
          </Box>
          <Box flex={1} />
          {Boolean(buttonText) && (
            <Button
              colorScheme="pink"
              isDisabled={isDisabled}
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  </Box>
);

export default NftCard;
