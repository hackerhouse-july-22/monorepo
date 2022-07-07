import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import Layout from '../components/Layout/Layout';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Polygon}>
      <ChakraProvider theme={theme} resetCSS>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
