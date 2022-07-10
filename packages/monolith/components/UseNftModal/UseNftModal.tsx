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
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
import { hide } from "@/slices/useNftModalSlice";
import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "store";
import { FormInput } from "@/components/FormInputs";
import { useReadNftListingQuery } from "@/slices/zebraApi";
import useSnookNftData from "../../hooks/useSnookNftData";
import transformIpfsUrl from "../../utils/transformIpfsUrl";
import { useForm, useWatch } from "react-hook-form";
import { EditPriceModalData } from "@/components/EditPriceModal/EditPriceModal";
import { useContractWrite } from "wagmi";
import { abi } from "../../../contracts/out/Zebra.sol/Zebra.json";

type UseNftModalData = {
  numHours: number;
};

const UseNftModal: React.FC = () => {
  const { shouldShow, nftId, id } = useAppSelector(
    (state) => state.useNftModal
  );
  const { data } = useSnookNftData(nftId as string);
  const {
    data: readNftListingData,
    isLoading: readNftListingIsLoading,
    isError: readNftListingIsError,
  } = useReadNftListingQuery(id);

  const { write, error, isLoading } = useContractWrite({
    addressOrName: "0x802212d3DCCD679EF1c7019Ae8aF44A26c2622D2",
    contractInterface: abi,
    functionName: "rent",
  });

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<UseNftModalData>();

  const numHours = useWatch({
    name: "numHours",
    control,
    defaultValue: 0,
  });

  const onSubmit = ({ numHours }: UseNftModalData) => {
    write({
      args: [numHours * 60 * 60],
    });
  };

  return (
    <Modal
      isOpen={shouldShow}
      onClose={() => {
        console.log("closed");
        dispatch(hide());
      }}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent position="relative" display="grid" gridAutoFlow="row">
        <ModalCloseButton position="absolute" right="12px" top="12px" />
        <ModalHeader placeSelf="center">Borrow NFTs</ModalHeader>
        <ModalBody display="flex" flexDir="column">
          {data ? (
            <SimpleGrid columns={2}>
              <Image
                src={transformIpfsUrl(data?.image)}
                borderRadius="10px"
                width={250}
              />
              <VStack
                alignItems="flex-start"
                position="relative"
                placeSelf="center"
              >
                <Text fontSize="20" fontWeight="semibold">
                  {data?.name}
                </Text>
                <Text fontSize="10">
                  <b>Price: </b>
                  {readNftListingData.pricePerSecond}
                </Text>
                <Text fontSize="10">
                  <b>Min: </b>12 hours
                </Text>
                <Text fontSize="10" position="absolute" bottom="0" right="0">
                  <b>Max: </b>
                  {readNftListingData.maxRentDuration} hours
                </Text>
              </VStack>
            </SimpleGrid>
          ) : (
            <Spinner />
          )}
          <FormInput
            label="Number of Hours"
            inputGroupProps={{ size: "lg" }}
            error={errors?.numHours?.message}
            helperText="Price per hour charged to the customer"
            mt={4}
            inputProps={{
              placeholder: "0",
              ...register("numHours", {
                required: {
                  value: true,
                  message: "Num hours is required",
                },
              }),
            }}
          />

          <Text
            mt={4}
            color="white"
            fontSize="20"
            fontWeight="bold"
            alignSelf="center"
          >
            Total: $
            {readNftListingData?.pricePerSecond
              ? readNftListingData?.pricePerSecond * numHours
              : null}
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
          <Button
            variant="primary"
            bg="blue.500"
            color="white"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UseNftModal;
