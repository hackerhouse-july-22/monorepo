import SelectableNft, {
  SelectableNftProps,
} from "@/components/SelectableNft/SelectableNft";
import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { SnookAbi } from "@/components/UsersSnooks/UsersSnooks.constants";

type UserSnookIdWrapperProps = {
  snookIndex: number;
} & Omit<SelectableNftProps, "imageUrl" | "isLoading" | "name">;

type SnookData = {
  name: string;
  description: string;
  external_url: "https://playsnook.com";
  image: string;
  inGameImage: string;
  imageCID: string;
  inGameImageCID: string;
  snookObject: {
    colors: string[];
    patterns: string[];
    wearables: string[];
    skinId: string;
    stars: string;
    traits: string[];
    score: string;
  };
};

const UserSnookIdWrapper: React.FC<UserSnookIdWrapperProps> = ({
  snookIndex,
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
