import { useAccount, useDisconnect, useConnect } from "wagmi";
import { useMetamask, useSDK } from "@thirdweb-dev/react";

import { InjectedConnector } from "wagmi/connectors/injected";

function useGigaConnect() {
  const domain = process.env.NEXT_PUBLIC_SERVER_URL!;

  const connectWithMetamask = useMetamask();
  const { connect: connectWagmi } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect: disconnectWagmi } = useDisconnect();
  const { address } = useAccount();
  const sdk = useSDK();

  async function loginThirdweb() {
    const payload = await sdk?.auth.login(domain);
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });
  }

  async function authenticateThirdweb() {
    const res = await fetch("/api/authenticate", {
      method: "POST",
    });
    return res;
  }

  async function logoutThirdweb() {
    await fetch("/api/logout", {
      method: "POST",
    });
  }

  const connect = async () => {
    await Promise.all([connectWithMetamask, connectWagmi]);
  };
}
