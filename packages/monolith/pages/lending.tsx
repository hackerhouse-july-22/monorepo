import React, { useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import {
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import EditPriceModal from "@/components/EditPriceModal";
import {
  useGetNftsBySupplierQuery,
  useUpdateNftListingMutation,
} from "@/slices/zebraApi";
import { useAccount } from "wagmi";
import { IZebraNFT } from "@/types/IZebraNFT";
import SnookCardFromId from "@/components/SnookCardFromId";
import { EditPriceModalData } from "@/components/EditPriceModal/EditPriceModal";

const Lending: React.FC = () => {
  const [edited, setEdited] = useState<IZebraNFT | undefined>(undefined);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();
  const { data, isLoading } = useGetNftsBySupplierQuery(address);
  const [updateNftListing, { error, isSuccess }] =
    useUpdateNftListingMutation();

  const handleEdit = ({ price, maxTime }: EditPriceModalData) => {
    console.log(edited);
    updateNftListing({
      ...edited,
      id: edited?.id,
      pricePerSecond: price,
      maxRentDuration: maxTime,
    });
    onClose();
  };

  useEffect(() => {
    if (isSuccess)
      toast({
        title: "NFT Updated",
        status: "success",
      });
  }, [isSuccess]);

  useEffect(() => {
    if (error)
      toast({
        title: "Error updating NFT",
        status: "error",
      });
  }, [error]);

  return (
    <>
      <EditPriceModal
        isOpen={isOpen}
        onClose={onClose}
        onEdit={handleEdit}
        defaults={{
          price: edited?.pricePerSecond,
          maxTime: edited?.maxRentDuration,
        }}
      />
      <PageContainer>
        <Container>
          <Heading as="h1" size="2xl" mt={12}>
            Supplied NFTs
          </Heading>
          <SimpleGrid columns={3} spacing={4} mt={8}>
            <Stat>
              <StatLabel>Total Lent NFTs</StatLabel>
              <StatNumber>{data?.nfts?.length}</StatNumber>
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
          {!data ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <SimpleGrid columns={4} mt={4} spacing={6}>
              {(data?.nfts as IZebraNFT[])?.map(
                ({
                  id,
                  pricePerSecond,
                  tokenId,
                  maxRentDuration,
                  ...props
                }) => (
                  <SnookCardFromId
                    key={tokenId}
                    nftId={tokenId}
                    onButtonClick={() => {
                      onOpen();
                      setEdited({
                        id,
                        pricePerSecond,
                        tokenId,
                        maxRentDuration,
                        ...props,
                      });
                    }}
                    buttonText="Edit"
                    secondaryText={pricePerSecond.toString()}
                  />
                )
              )}
            </SimpleGrid>
          )}
        </Container>
      </PageContainer>
    </>
  );
};

export default Lending;
