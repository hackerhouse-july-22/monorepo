import { useContractRead } from "wagmi";
import { SnookAbi } from "@/components/UsersSnooks/UsersSnooks.constants";
import { useEffect, useState } from "react";
import SnookData from "@/types/SnookData";

type UseSnookNftData = {
  data?: SnookData;
  isLoading?: boolean;
  error?: any;
};

const useSnookNftData = (nftId: number): UseSnookNftData => {
  const [snookData, setSnookData] = useState<SnookData>();

  const {
    data: tokenUriData,
    error,
    isLoading,
  } = useContractRead({
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

  return {
    data: snookData,
    error,
    isLoading,
  };
};

export default useSnookNftData;
