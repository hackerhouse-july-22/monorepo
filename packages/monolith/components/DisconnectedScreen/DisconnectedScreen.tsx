import React from "react";
import { Button, Container, Heading, Icon } from "@chakra-ui/react";
import { TbPlugConnected } from "react-icons/tb";

const DisconnectedScreen: React.FC = () => (
  <Container textAlign="center">
    <Icon as={TbPlugConnected} w={20} h={20} color="white" />
    <Heading as="h1" size="2xl" mt={6}>
      Connect Your Wallet
    </Heading>
    <Button variant="outline" mt={6}>
      Connect
    </Button>
  </Container>
);

export default DisconnectedScreen;
