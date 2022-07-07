import React from "react";
import {
  HStack,
  Grid,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import LinkButton from "../LinkButton";
import { useRouter } from "next/router";
import { ZebraText } from "../Icons";
import EthereumIcon from "../Icons/EthereumIcon";

const Navbar = () => {
  const router = useRouter();
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
            href="/games"
            variant="ghost"
            activeProps={{ variant: "primary" }}
          >
            Browse Games
          </LinkButton>
          <LinkButton
            href="/supply"
            variant="ghost"
            activeProps={{ variant: "primary" }}
          >
            Supply
          </LinkButton>
          <LinkButton
            href="/borrow"
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
              rightIcon={
                <ChevronDownIcon transform="scale(1.3) translate(0, 1px)" />
              }
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
              leftIcon={<EthereumIcon />}
              rightIcon={
                <ChevronDownIcon transform="scale(1.3) translate(0, 1px)" />
              }
            >
              ETH
            </MenuButton>
            <MenuList>
              <MenuItem>
                <EthereumIcon /> ETH
              </MenuItem>
            </MenuList>
          </Menu>
          <Button marginLeft="20px" variant="secondary">
            Connect
          </Button>
        </HStack>
      </Grid>
    </>
  );
};

export default Navbar;
