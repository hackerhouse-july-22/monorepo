import {
  useAccount as useWagmiAccount,
  useDisconnect as useWagmiDisconnect,
  useConnect as useWagmiConnect,
} from "wagmi";
import {
  useMetamask as useThirdwebMetamask,
  useSDK,
  useDisconnect as useThirdwebDisconnect,
} from "@thirdweb-dev/react";

import { InjectedConnector } from "wagmi/connectors/injected";

function useGigaConnect() {
  const domain = process.env.NEXT_PUBLIC_SERVER_DOMAIN!;

  const connectWithMetamask = useThirdwebMetamask();
  const { connectAsync: wagmiConnect } = useWagmiConnect({
    connector: new InjectedConnector(),
  });
  const sdk = useSDK();

  async function login() {
    const payload = await sdk?.auth.login(domain);
    await fetch(`${process.env.NEXT_PUBLIC_UI_DOMAIN}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });
    console.log();
  }

  const connect = async () => {
    await Promise.all([connectWithMetamask(), wagmiConnect()]);
    await login();
  };

  function logout() {
    Cookie.remove("cookie");
  }

  const { disconnect: wagmiDisconnect } = useWagmiDisconnect();
  const thirdwebDisconnect = useThirdwebDisconnect();

  const disconnect = () => {
    wagmiDisconnect();
    thirdwebDisconnect();
    logout();
  };

  const { address } = useWagmiAccount();

  return {
    connect,
    disconnect,
    address,
  };
}

export default useGigaConnect;
