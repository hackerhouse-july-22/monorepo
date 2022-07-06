import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";


function MyApp({ Component, pageProps }: AppProps) {
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
