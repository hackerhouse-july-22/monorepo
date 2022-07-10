import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import theme from "../theme";
import { Provider as RTKProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "../store";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "@/components/Navbar";

const { provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RTKProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WagmiConfig client={client}>
          <ThirdwebProvider desiredChainId={ChainId.Rinkeby} autoConnect>
            <ChakraProvider theme={theme} resetCSS>
              <Navbar />
              <Component {...pageProps} />
            </ChakraProvider>
          </ThirdwebProvider>
        </WagmiConfig>
      </PersistGate>
    </RTKProvider>
  );
}

export default MyApp;
