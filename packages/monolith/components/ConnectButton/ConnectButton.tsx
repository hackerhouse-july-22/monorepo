import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Flex,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import Jazzicon from "react-jazzicon";
import truncateAddress from "../../utils/truncateAddress";
import { useEffect, useState } from "react";
import useGigaConnect from "hooks/useGigaConnect";

export default function ConnectButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { connect, disconnect, address } = useGigaConnect();

  if (!mounted) return null;

  return (
    <>
      {address ? (
        <>
          <Menu>
            <MenuButton
              as={Button}
              variant="secondary"
              rightIcon={<BiChevronDown />}
            >
              <Flex alignItems="center">
                <Jazzicon
                  diameter={20}
                  seed={Math.round(Math.random() * 10000000)}
                />
                <Text ml={2}>{truncateAddress(address)}</Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem color="red" onClick={() => disconnect()}>
                Disconnect
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <Button variant="secondary" onClick={() => connect()}>
            Connect MetaMask
          </Button>
        </>
      )}
    </>
  );
}
