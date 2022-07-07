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
import {
  useAddress,
  useDisconnect,
  useMetamask,
} from "@thirdweb-dev/react";
import Jazzicon from "react-jazzicon";
import truncateAddress from "../../utils/truncateAddress";

export default function ConnectButton() {
  const connectWithMetaMask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

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
              <MenuItem color="red" onClick={disconnect}>
                Disconnect
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <Button variant="secondary" onClick={connectWithMetaMask}>
            Connect MetaMask
          </Button>
        </>
      )}
    </>
  );
}
