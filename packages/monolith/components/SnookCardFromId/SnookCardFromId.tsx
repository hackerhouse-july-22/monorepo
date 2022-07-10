import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { SnookAbi } from "@/components/UsersSnooks/UsersSnooks.constants";
import SnookData from "@/types/SnookData";
import SelectableNft from "@/components/SelectableNft";
import { SelectableNftProps } from "@/components/SelectableNft/SelectableNft";
import NftCard from "../NftCard";
import { NftCardProps } from "@/components/NftCard/NftCard";

type SnookCardFromIdProps = {
  nftId: number;
} & Omit<NftCardProps, "imageUrl" | "isLoading" | "name">;

const SnookCardFromId: React.FC<SnookCardFromIdProps> = ({
  nftId,
  ...props
}) => {
  const [snookData, setSnookData] = useState<SnookData>();

  const { data: tokenUriData, error } = useContractRead({
    addressOrName: "0x4372597f1c600d86598675dcb6cf5713bb7525cf",
    contractInterface: SnookAbi,
    functionName: "tokenURI",
    args: [nftId],
  });

  useEffect(() => {
    if (tokenUriData) {
      (async () => {
        const res = await fetch(
          `https://ipfs.io/ipfs/${tokenUriData
            .toString()
            .replace("ipfs://", "")}`
        );
        const data = await res.json();
        setSnookData(data);
      })();
    }
  }, [tokenUriData]);

  return (
    <NftCard
      imageUrl={
        snookData
          ? `https://ipfs.io/ipfs/${snookData?.image
              .toString()
              .replace("ipfs://", "")}`
          : undefined
      }
      {...props}
      primaryText={snookData?.name}
      secondaryText={`${props.secondaryText} ETH / Second`}
    />
  );
};

export default SnookCardFromId;
