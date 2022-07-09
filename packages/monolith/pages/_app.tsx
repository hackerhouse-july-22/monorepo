import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import theme from "../theme";

import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ThirdwebProvider desiredChainId={ChainId.Rinkeby} autoConnect>
        <ChakraProvider theme={theme} resetCSS>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
    </WagmiConfig>
  );
}

export default MyApp;
