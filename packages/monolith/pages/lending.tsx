import React from "react";
import PageContainer from "@/components/PageContainer";
import {
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import NftCard from "@/components/NftCard";

const Lending: React.FC = () => (
  <PageContainer>
    <Container>
      <Heading as="h1" size="2xl">
        Supplied NFTs
      </Heading>
      <SimpleGrid columns={3} spacing={4} mt={8}>
        <Stat>
          <StatLabel>Total Lent NFTs</StatLabel>
          <StatNumber>12</StatNumber>
          <StatHelpText>4 Actively Rented</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Monthly Revenue</StatLabel>
          <StatNumber>$192.12</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Collected Fees</StatLabel>
          <StatNumber>£0.00</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      <Heading as="h1" size="2xl" mt={8}>
        NFTs Lent
      </Heading>

      <Heading as="h3" size="md" mt={6}>
        Snook
      </Heading>
      <SimpleGrid columns={4} mt={4} spacing={6}>
        <NftCard imageUrl="https://lh3.googleusercontent.com/jvaVcHdVPwuExwfjq4YFqV9lCXTx2QEMIZc1S240RzFCZVOHHFuYlW226Jbhk0bYFt1B-rdOx2RLz12N5AkoPyCS3IvLMrLn23Wp3CU=w600" />
        <NftCard
          imageUrl="https://lh3.googleusercontent.com/jvaVcHdVPwuExwfjq4YFqV9lCXTx2QEMIZc1S240RzFCZVOHHFuYlW226Jbhk0bYFt1B-rdOx2RLz12N5AkoPyCS3IvLMrLn23Wp3CU=w600"
          isRented
        />
      </SimpleGrid>
    </Container>
  </PageContainer>
);

export default Lending;
