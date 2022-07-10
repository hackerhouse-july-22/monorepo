import { useAccount, useContractRead } from "wagmi";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SnookAbi } from "./UsersSnooks.constants";
import UserSnookIdWrapper from "@/components/UsersSnooks/UserSnookIdWrapper";
import { useDisclosure } from "@chakra-ui/react";
import EditPriceModal from "@/components/EditPriceModal";
import { EditPriceModalData } from "@/components/EditPriceModal/EditPriceModal";
import { SelectedData } from "../../pages/onboarding/lending";

type UsersSnooksProps = {
  selected: SelectedData[];
  setSelected: Dispatch<SetStateAction<SelectedData[]>>;
  setNftAddress: (
    id: number,
    data: { nftId: number; nftImage: string }
  ) => void;
};

const UsersSnooks: React.FC<UsersSnooksProps> = ({
  selected,
  setSelected,
  setNftAddress,
}) => {
  const [editedId, setEditedId] = useState<number | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { address } = useAccount();
  const { data } = useContractRead({
    addressOrName: "0x4372597f1c600d86598675dcb6cf5713bb7525cf",
    contractInterface: SnookAbi,
    functionName: "balanceOf",
    args: address,
  });

  const checkIsSelected = (checkId: number): boolean =>
    Boolean(selected.find(({ id }) => checkId === id));

  const onClick = (id: number) => {
    if (checkIsSelected(id)) {
      setSelected((p) => [...p.filter(({ id: cId }) => cId !== id)]);
    } else {
      setSelected((p) => [...p, { id, minTime: 12, maxTime: 24, price: 10 }]);
    }
  };

  const handleOpenEditModal = (id: number) => {
    setEditedId(id);
    onOpen();
  };

  const handleEdit = ({ price, minTime, maxTime }: EditPriceModalData) => {
    if (editedId === undefined) return;
    setSelected((p) => [
      ...p.filter(({ id: cId }) => cId !== editedId),
      {
        id: editedId,
        price: price,
        maxTime,
        minTime,
      },
    ]);
    onClose();
    setEditedId(undefined);
  };

  return (
    <>
      <EditPriceModal
        isOpen={isOpen}
        onClose={onClose}
        onEdit={handleEdit}
        defaults={selected.find(({ id }) => id === editedId)}
      />
      {Array.from(Array(data?.toNumber()).keys()).map((id) => (
        <UserSnookIdWrapper
          onGetNftData={(nftData) => setNftAddress(id, nftData)}
          price={selected.find((a) => a.id === id)?.price ?? 0}
          snookIndex={id}
          key={id}
          onClick={() => onClick(id)}
          onEdit={() => handleOpenEditModal(id)}
          isSelected={checkIsSelected(id)}
        />
      ))}
    </>
  );
};

export default UsersSnooks;
