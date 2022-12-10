import type { AppProps } from "next/app";
import merge from 'lodash.merge';

import { Provider as SelfProvider } from '@self.id/framework'


import MainLayout from "../components/layouts/MainLayout";
import "../styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";

import { darkTheme, getDefaultWallets, lightTheme, RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const myTheme = merge(lightTheme(), {
  colors: {
    accentColor: '#5D5FEF',
  },
  fonts: {
    body: 'Rubik',
  }
} as Theme);

const App = ({ Component, pageProps }: AppProps) => {
  const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Pattern DAO",
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
        <SelfProvider client={{ ceramic: 'testnet-clay' }}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </SelfProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
