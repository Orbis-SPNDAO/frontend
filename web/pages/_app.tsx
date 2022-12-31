import merge from "lodash.merge";
import type { AppProps } from "next/app";

import MainLayout from "../components/layouts/MainLayout";
import "../styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";

import { VocdoniProvider } from "../context/vocdoni";

import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
  Theme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useSigner, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { OrbisProvider } from "../context/orbis";

const myTheme = merge(lightTheme(), {
  colors: {
    accentColor: "#5D5FEF",
  },
  fonts: {
    body: "Rubik",
  },
} as Theme);

const App = ({ Component, pageProps }: AppProps) => {
  const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
  const { chains, provider } = configureChains(
    [polygonMumbai],
    [alchemyProvider({ apiKey: ALCHEMY_KEY as string }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "SPN DAO",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <OrbisProvider>
          <VocdoniProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </VocdoniProvider>
        </OrbisProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
