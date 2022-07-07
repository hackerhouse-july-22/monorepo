import { Button, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import PageContainer from "@/components/PageContainer";
import React, { useState } from "react";
import SelectableImage from "@/components/SelectableImage";

const images = [
  "https://lh3.googleusercontent.com/jvaVcHdVPwuExwfjq4YFqV9lCXTx2QEMIZc1S240RzFCZVOHHFuYlW226Jbhk0bYFt1B-rdOx2RLz12N5AkoPyCS3IvLMrLn23Wp3CU=w600",
];

const OnboardingLending: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const onClick = (url: string) => {
    if (selected.includes(url)) {
      setSelected((p) => [...p.filter((i) => i !== url)]);
    } else {
      setSelected((p) => [...p, url]);
    }
  };

  return (
    <PageContainer>
      <Container textAlign="center">
        <Heading as="h1" size="2xl" textAlign="center">
          Lets setup your supply account...
        </Heading>
        <Text mt={6} maxW="600px" mx="auto">
          Choose which NFT’s to rent out, then confirm the rental price for each
          one.
        </Text>
        <SimpleGrid columns={4} mt={8}>
          {images.map((imageUrl, i) => (
            <SelectableImage
              key={i}
              imageUrl={imageUrl}
              onClick={() => onClick(imageUrl)}
              isSelected={selected.includes(imageUrl)}
            />
          ))}
        </SimpleGrid>
        <Button colorScheme="pink" size="lg" mt={8}>
          Continue
        </Button>
      </Container>
    </PageContainer>
  );
};

export default OnboardingLending;