// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";


function MyApp({ Component, pageProps }: AppProps) {
  // const getLayout = Component.getLayout || ((page) => page);

  
  return (
    <>
      <ThirdwebProvider desiredChainId={ChainId.Polygon}>
        <ChakraProvider theme={theme} resetCSS>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ThirdwebProvider>
    </>
  )
}

export default MyApp
