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
} from "@chakra-ui/react";
import { hide } from "@/slices/useNftModalSlice";
import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "store";

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
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>{nftId}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UseNftModal;
