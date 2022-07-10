import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, Heading, useToast } from "@chakra-ui/react";
import { FormInput } from "@/components/FormInputs";
import { useForm } from "react-hook-form";
import { useUpdateNftListingMutation } from "@/slices/zebraApi";
import { useAppDispatch, useAppSelector } from "store";
import { hide } from "@/slices/editPriceModalSlice";
import useGigaConnect from "hooks/useGigaConnect";
import { useSignTypedData } from "wagmi";
import { ethers } from "ethers";

type EditPriceModalData = {
  price: number;
  minTime: number;
  maxTime: number;
};

const EditPriceModal: React.FC = () => {
  const { shouldShow, nftId, id } = useAppSelector(
    (state) => state.editPriceModal
  );
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { address } = useGigaConnect();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<EditPriceModalData>();

  const [updateNftListing, { isSuccess, error }] =
    useUpdateNftListingMutation();

  const { signTypedDataAsync } = useSignTypedData();

  useEffect(() => {
    if (isSuccess)
      toast({
        title: "NFT Updated",
        status: "success",
      });
  }, [isSuccess]);

  useEffect(() => {
    if (error)
      toast({
        title: "Error updating NFT",
        status: "error",
      });
  }, [error]);

  return (
    <Modal isOpen={shouldShow} onClose={() => dispatch(hide())}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Heading mt={8} size="lg">
            Edit Price
          </Heading>

          <FormInput
            label="Price / Hour (MP $27.31)"
            inputGroupProps={{ size: "lg" }}
            error={errors?.price?.message}
            helperText="Price per hour charged to the customer"
            mt={4}
            inputProps={{
              placeholder: "Price",
              ...register("price", {
                required: {
                  value: true,
                  message: "Price is required",
                },
              }),
            }}
          />

          <FormInput
            label="Minimum Time (Hours)"
            inputGroupProps={{ size: "lg" }}
            error={errors?.minTime?.message}
            helperText="Minimum time a customer has to rent"
            mt={4}
            inputProps={{
              placeholder: "1",
              ...register("minTime", {
                required: {
                  value: true,
                  message: "Min time is required",
                },
              }),
            }}
          />

          <FormInput
            label="Maximum Time (Hours)"
            inputGroupProps={{ size: "lg" }}
            error={errors?.maxTime?.message}
            helperText="Maximum time a customer can rent"
            mt={4}
            inputProps={{
              placeholder: "12",
              ...register("maxTime", {
                required: {
                  value: true,
                  message: "Max time is required",
                },
              }),
            }}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="pink"
            disabled={isValid}
            onClick={handleSubmit(async (data) => {
              const maxRentalDuration = data.maxTime * 60;
              const pricePerSecond = ethers.utils
                .parseEther(`${data.price}`)
                .div(60 * 60);
              const signature = await signTypedDataAsync({
                domain: {
                  // name?: string;
                  // version?: string;
                  // chainId?: string | number | bigint;
                  // verifyingContract?: string;
                  // salt?: BytesLike;
                },
                types: {
                  Offer: [
                    {
                      name: "NFT",
                      type: "address",
                    },
                    {
                      name: "tokenId",
                      type: "uint256",
                    },
                    {
                      name: "pricePerSecond",
                      type: "uint256",
                    },
                    {
                      name: "maxRentalDuration",
                      type: "uint256",
                    },
                    {
                      name: "nonce",
                      type: "uint256",
                    },
                  ],
                },
                value: {
                  Offer: {
                    NFT: nftId,
                    tokenId: id,
                    pricePerSecond,
                    maxRentalDuration,
                    nonce: 0,
                  },
                },
              });
              updateNftListing({
                supplierAddress: address,
                nftAddress: nftId,
                tokenId: id,
                pricePerSecond,
                maxRentDuration: maxRentalDuration,
                nonce: 0,
                signature: signature,
              });
            })}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPriceModal;
