import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { Box, BoxProps } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import DisconnectedScreen from "@/components/DisconnectedScreen";

type PageContainerProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
  children?: ReactNode;
} & BoxProps;

const PageContainer: React.FC<PageContainerProps> = ({
  title = "Zebra",
  description = "Zebra Time",
  imageUrl = "",
  children,
  ...props
}) => {
  // https://github.com/vercel/next.js/discussions/17443
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { isConnected } = useAccount();
  const { asPath } = useRouter();
  const url = `http://localhost:3000/${asPath}`;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={imageUrl} />
        <link rel="canonical" href={url} />
      </Head>

      <Navbar />
      <Box as="main" pb={8} {...props}>
        {isConnected ? children : !mounted ? children : <DisconnectedScreen />}
      </Box>
    </>
  );
};

export default PageContainer;
