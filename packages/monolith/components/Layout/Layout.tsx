import Head from "next/head";
import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";

type LayoutProps = {
  title?: string;
  content?: string;
  children?: any;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "GuildJoinSoulbound",
  content = "DreamTeamGuildStuff",
}) => (
  <>
    <Head>
      {/* need to include this link to prevent large icon lazy loading with ssr */}
      <link
        href="https://use.fontawesome.com/releases/v5.15.4/css/svg-with-js.css"
        rel="stylesheet"
      />

      <title>{title}</title>
      <meta name="description" content={content} />

      <link rel="icon" href="/favicon.ico" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="og:title" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta charSet="UTF-8" />
    </Head>

    <Box as="main">
      <Navbar />
      {children}
    </Box>
  </>
);

export default Layout;
