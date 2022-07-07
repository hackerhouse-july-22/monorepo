import { Button, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useCoinbaseWallet,
} from "@thirdweb-dev/react";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop, faBan } from "@fortawesome/free-solid-svg-icons";
import Jazzicon from "@metamask/jazzicon";
import styles from "./ConnectButton.module.scss";
import truncateAddress from "../../utils/truncateAddress";

export default function ConnectButton() {
  const router = useRouter();

  const connectWithMetaMask = useMetamask();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const disconnect = useDisconnect();
  const address = useAddress();

  const acctIconRef = useRef();
  useEffect(() => {
    if (address && acctIconRef.current) {
      acctIconRef.current.innerHTML = "";
      acctIconRef.current.append(
        Jazzicon(16, parseInt(address.slice(2, 10), 16))
      );
    }
  }, [address]);

  return (
    <>
      {address ? (
        <>
          <div ref={acctIconRef} className={styles.addressIconStyle}></div>
          <h6>{truncateAddress(address)}</h6>
          <IconButton
            icon={
              <FontAwesomeIcon
                className={styles.disconnectIcon}
                icon={faBan}
                onClick={disconnect}
              />
            }
            colorScheme={"red"}
            onClick={disconnect}
          >
            Disconnect
          </IconButton>
        </>
      ) : (
        <>
          <Button size="lg" variant="outline" onClick={connectWithMetaMask}>
            Connect MetaMask
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={connectWithCoinbaseWallet}
          >
            Connect Coinbase
          </Button>
        </>
      )}
    </>
  );
}
