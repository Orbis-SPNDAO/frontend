import { createContext, SetStateAction, useContext, useState } from "react";
import { EnvOptions, VocdoniSDKClient, AccountData } from "@vocdoni/sdk";
import { useSigner } from "wagmi";
import React from "react";
import { ethers } from "ethers";
import { useEffect } from "react";

type VocdoniContextType = {
  client: VocdoniSDKClient;
  setClient: React.Dispatch<SetStateAction<VocdoniSDKClient>>;
};

const initVocdoniClient = {
  client: new VocdoniSDKClient({
    env: EnvOptions.DEV,
  }),
  setClient: () => {},
};

const VocdoniContext = createContext<VocdoniContextType>(initVocdoniClient);

export function VocdoniProvider({ children }: any) {
  const [client, setClient] = useState<any>();
  const { data: signer } = useSigner(); // get the signer from wagmi

  useEffect(() => {
    const accountHandler = async () => {      
      if (!client) return;
      
      let info = null as AccountData | null;      
      try {        
         info = await client.fetchAccountInfo(); // account already exists
      } catch (e) {        
        info = await client.createAccount(); // account not created yet        
      }      
      // top up account with faucet tokens
      if (info && info.balance === 0) {
        await client.collectFaucetTokens();
      }
      console.log(`Account info: ${info}`)
    };    
    accountHandler();
  }, [client]);

  // initialize the sdk provider
  useEffect(() => {
    try {
      if (!client && signer) {
        setClient(
          new VocdoniSDKClient({
            env: EnvOptions.DEV,
            wallet: signer!,
          })
        )        
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log(
        `Vocdoni SDK initialized with signer: ${signer}, client: ${client}`
      );
    }
  }, [signer, client]);

  return (
    <VocdoniContext.Provider value={{ client, setClient }}>      
        {children}      
    </VocdoniContext.Provider>
  );
}

export function useVocdoni() {
  return useContext(VocdoniContext);
}