// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";

import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});


function MyApp({ Component, pageProps }: AppProps) {
  // const getLayout = Component.getLayout || ((page) => page);

  
  return (
    <>
      <WagmiConfig client={client}>
        <ChakraProvider theme={theme} resetCSS>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </WagmiConfig>
    </>
  )
}

export default MyApp
