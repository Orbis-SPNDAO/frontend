import { createContext, SetStateAction, useContext, useState } from "react";
import { EnvOptions, VocdoniSDKClient, AccountData, PublishedElection } from "@vocdoni/sdk";
import { useSigner } from "wagmi";
import React from "react";
import { ethers } from "ethers";
import { useEffect } from "react";

type VocdoniContextType = {
  client: VocdoniSDKClient;
  setClient: React.Dispatch<SetStateAction<VocdoniSDKClient>>;
  proposalData: PublishedElection[];
  setProposalData: React.Dispatch<SetStateAction<PublishedElection[]>>;
};

const initVocdoni = {
  client: new VocdoniSDKClient({
    env: EnvOptions.DEV,
  }),
  setClient: () => {},  
  proposalData: [],
  setProposalData: () => {}
};


const VocdoniContext = createContext<VocdoniContextType>(initVocdoni);

export function VocdoniProvider({ children }: any) {
  const [client, setClient] = useState<any>();
  const [proposalData, setProposalData] = useState<PublishedElection[]>([]);
  
    return (
    <VocdoniContext.Provider value={{ client, setClient, proposalData, setProposalData }}>      
        {children}      
    </VocdoniContext.Provider>
  );
}

export function useVocdoni() {
  return useContext(VocdoniContext);
}