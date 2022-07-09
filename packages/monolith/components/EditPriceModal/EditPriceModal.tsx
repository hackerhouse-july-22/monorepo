import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, Heading } from "@chakra-ui/react";
import { FormInput } from "@/components/FormInputs";
import { useForm } from "react-hook-form";

export type EditPriceModalData = {
  price: number;
  minTime: number;
  maxTime: number;
};

type EditPriceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (data: EditPriceModalData) => void;
  defaults?: EditPriceModalData;
};

const EditPriceModal: React.FC<EditPriceModalProps> = ({
  onClose,
  isOpen,
  onEdit,
  defaults,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<EditPriceModalData>({
    defaultValues: defaults,
  });

  const onSubmit = (values: EditPriceModalData) => {
    onEdit(values);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Button colorScheme="pink" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPriceModal;
