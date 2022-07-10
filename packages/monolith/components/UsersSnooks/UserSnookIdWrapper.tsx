import SelectableNft, {
  SelectableNftProps,
} from "@/components/SelectableNft/SelectableNft";
import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { SnookAbi } from "@/components/UsersSnooks/UsersSnooks.constants";
import SnookData from "@/types/SnookData";

type UserSnookIdWrapperProps = {
  snookIndex: number;
  onGetNftData: (data: { nftId: number; nftImage: string }) => void;
} & Omit<SelectableNftProps, "imageUrl" | "isLoading" | "name">;

const UserSnookIdWrapper: React.FC<UserSnookIdWrapperProps> = ({
  snookIndex,
  onGetNftData,
  ...props
}) => {
  const { address } = useAccount();

  const [snookData, setSnookData] = useState<SnookData>();
  const { data, error: tokenRead } = useContractRead({
    addressOrName: "0x4372597f1c600d86598675dcb6cf5713bb7525cf",
    contractInterface: SnookAbi,
    functionName: "tokenOfOwnerByIndex",
    args: [address, snookIndex],
  });
  const {
    data: tokenIdData,
    refetch,
    error,
  } = useContractRead({
    addressOrName: "0x4372597f1c600d86598675dcb6cf5713bb7525cf",
    contractInterface: SnookAbi,
    functionName: "tokenByIndex",
    args: [data],
    enabled: false,
  });
  const { data: tokenUriData, refetch: getUri } = useContractRead({
    addressOrName: "0x4372597f1c600d86598675dcb6cf5713bb7525cf",
    contractInterface: SnookAbi,
    functionName: "tokenURI",
    args: [tokenIdData],
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (tokenIdData) {
      getUri();
    }
  }, [tokenIdData]);

  useEffect(() => {
    if (tokenIdData && snookData?.image) {
      onGetNftData({
        nftId: parseInt(tokenIdData.toString(), 10),
        nftImage: snookData?.image,
      });
    }
  }, [tokenIdData, snookData]);

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

  if (error || tokenRead) return null;

  return (
    <SelectableNft
      isLoading={!snookData}
      imageUrl={
        snookData
          ? `https://ipfs.io/ipfs/${snookData?.image
              .toString()
              .replace("ipfs://", "")}`
          : undefined
      }
      name={snookData?.name as string}
      {...props}
    />
  );
};

export default UserSnookIdWrapper;
