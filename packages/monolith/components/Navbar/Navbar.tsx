import React, { RefObject } from "react";
import {
  HStack,
  Grid,
  Box,
  Button,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
// import { MockCountryPicker, TeamIcon } from "../Icons";
// import LinkButton from "../LinkButton";
// import UserSidebar from "../UserSidebar";
// import ConnectModal from "../ConnectModal";
// import ConnectButton from "../ConnectButton";
import ConnectButton from "../ConnectButton/ConnectButton";

import Link from "next/link";

const Navbar = () => (
  <>
    <Grid
      w="100%"
      color="white"
      gridTemplateColumns="1fr 1fr 1fr"
      px="27px"
      my={18}
    >
      <Link href="/">
        {/* <TeamIcon w={20} h="auto" color="white" />
         */}
        <p>ZEBRA</p>
      </Link>
      <Box placeSelf="center">
        {/* <LinkButton
          href="/"
          variant="text"
          mr="2"
          activeProps={{ variant: "primary" }}
        >
          Guilds
        </LinkButton>
        <LinkButton
          href="/documentation"
          variant="text"
          activeProps={{ variant: "primary" }}
        >
          Documentation
        </LinkButton> */}
      </Box>
      <HStack alignItems="center" justifyContent="flex-end">
        <ConnectButton />
      </HStack>
    </Grid>
  </>
);

export default Navbar;
