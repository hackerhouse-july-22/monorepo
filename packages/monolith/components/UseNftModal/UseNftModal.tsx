import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  Box,
  Grid,
} from "@chakra-ui/react";
import { hide } from "@/slices/useNftModalSlice";
import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "store";
import { FormInput } from "@/components/FormInputs";

const UseNftModal: React.FC = () => {
  const { shouldShow, nftId } = useAppSelector((state) => state.useNftModal);
  const dispatch = useAppDispatch();

  return (
    <Modal
      isOpen={shouldShow}
      onClose={() => {
        console.log("closed");
        dispatch(hide());
      }}
    >
      <ModalOverlay />
      <ModalContent position="relative" display="grid" gridAutoFlow="row">
        <ModalCloseButton position="absolute" right="12px" top="12px" />
        <ModalHeader placeSelf="center">Borrow NFTs</ModalHeader>
        <ModalBody display="flex" flexDir="column">
          <Grid gridTemplateColumns="1fr auto" gridColumnGap="20px">
            <Image
              src="https://www.esports.net/wp-content/uploads/2022/02/snook-game-review.jpg"
              borderRadius="10px"
            />
            <VStack
              alignItems="flex-start"
              position="relative"
              placeSelf="center"
            >
              <Text fontSize="20" fontWeight="semibold">
                Snook Advanced Snek
              </Text>
              <Text fontSize="10">
                <b>Price: </b>$123/hr
              </Text>
              <Text fontSize="10">
                <b>Min: </b>12 hours
              </Text>
              <Text fontSize="10" position="absolute" bottom="0" right="0">
                <b>Max: </b>12 hours
              </Text>
            </VStack>
          </Grid>
          <Text fontWeight="semibold" mt="20px" mb="8px">
            Number of Hours
          </Text>
          <FormInput inputProps={{ name: "hours" }} />
          <Text fontSize="14px" mt="8px" mb="8px" color="gray.500">
            Price per hour charged to the customer
          </Text>
          <Text
            color="white"
            fontSize="20"
            fontWeight="bold"
            alignSelf="center"
          >
            Total: $28.31
          </Text>
          <Text
            fontSize="14px"
            mt="8px"
            mb="8px"
            color="gray.500"
            alignSelf="center"
          >
            $2 upfront
          </Text>
        </ModalBody>
        <ModalFooter
          display="flex"
          flexDir="column"
          width="100%"
          justifyItems="space-around"
        >
          <Button variant="primary" bg="blue.500" color="white">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UseNftModal;
