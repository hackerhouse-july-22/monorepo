import { useAccount, useContractRead } from "wagmi";
import React, { useEffect, useState } from "react";
import { SnookAbi } from "./UsersSnooks.constants";
import SelectableNft from "@/components/SelectableNft";
import { SelectableNftProps } from "@/components/SelectableNft/SelectableNft";
import UserSnookIdWrapper from "@/components/UsersSnooks/UserSnookIdWrapper";
import { useDisclosure } from "@chakra-ui/react";
import EditPriceModal from "@/components/EditPriceModal";

type SelectedData = {
  id: number;
  price: number;
  minTime: number;
  maxTime: number;
};

const UsersSnooks = () => {
  const [editedId, setEditedId] = useState<number>();
  const [selected, setSelected] = useState<SelectedData[]>([]);
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

  const handleEdit = (id: number) => {
    setEditedId(id);
    onOpen();
  };

  return (
    <>
      <EditPriceModal isOpen={isOpen} onClose={onClose} />
      {Array.from(Array(data?.toNumber()).keys()).map((id) => (
        <UserSnookIdWrapper
          snookIndex={id}
          key={id}
          onClick={() => onClick(id)}
          onEdit={() => handleEdit(id)}
          isSelected={checkIsSelected(id)}
        />
      ))}
    </>
  );
};

export default UsersSnooks;
