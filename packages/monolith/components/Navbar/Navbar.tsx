import React, { useEffect, useState } from "react";
import {
  HStack,
  Grid,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import LinkButton from "../LinkButton";
import { ZebraText } from "../Icons";
import ConnectButton from "@/components/ConnectButton";
import EthIcon from "cryptocurrency-icons/svg/color/eth.svg";

const Navbar = () => {
  // https://github.com/vercel/next.js/discussions/17443
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <Grid
        w="100%"
        color="white"
        gridTemplateColumns="1fr 1fr 1fr"
        px="27px"
        my={18}
      >
        <LinkButton href="/" placeSelf="center start" variant="unstyled">
          <ZebraText w="106px" h="43px" />
        </LinkButton>
        <HStack placeSelf="center" spacing="3">
          <LinkButton
            href="/"
            variant="ghost"
            activeProps={{ variant: "primary" }}
          >
            Browse Games
          </LinkButton>
          <LinkButton
            href="/lending"
            variant="ghost"
            activeProps={{ variant: "primary" }}
          >
            Supply
          </LinkButton>
          <LinkButton
            href="/renting"
            variant="ghost"
            activeProps={{ variant: "primary" }}
          >
            Borrowing
          </LinkButton>
        </HStack>
        <HStack alignItems="center" justifyContent="flex-end" spacing="3">
          <Menu>
            <MenuButton
              variant="unstyled"
              as={Button}
              leftIcon="🇺🇸"
              rightIcon={<BiChevronDown />}
            >
              US
            </MenuButton>
            <MenuList>
              <MenuItem>🇺🇸 US</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              variant="unstyled"
              as={Button}
              leftIcon={
                <Icon
                  as={EthIcon}
                  h="16px"
                  w="16px"
                  transform="translate(0,1.5px)"
                />
              }
              rightIcon={<BiChevronDown />}
            >
              ETH
            </MenuButton>
            <MenuList>
              <MenuItem>ETH</MenuItem>
            </MenuList>
          </Menu>
          <ConnectButton />
        </HStack>
      </Grid>
    </>
  );
};

export default Navbar;
