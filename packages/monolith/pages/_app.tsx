import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import theme from "../theme";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ThirdwebProvider desiredChainId={ChainId.Polygon} autoConnect>
        <ChakraProvider theme={theme} resetCSS>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
    </WagmiConfig>
  );
}

export default MyApp;
