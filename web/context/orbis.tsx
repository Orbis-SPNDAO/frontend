import React from "react";
import { createContext, SetStateAction, useContext, useState } from "react";
import { useSigner, useProvider } from "wagmi";
import { useEffect } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";
import { ethers } from "ethers";

type OrbisContextType = {
  orbis: any;
  setOrbis: React.Dispatch<SetStateAction<any>>;
};

const initOrbisClient = {
  orbis: new Orbis(),
  setOrbis: () => {},
};

const OrbisContext = createContext<OrbisContextType>(initOrbisClient);

export function OrbisProvider({ children }: any) {
  const [orbis, setOrbis] = useState<any>();
  
  const provider = useProvider(); // get the provider from wagmi

  useEffect(() => {
    if (!orbis && provider) {
      setOrbis(
        new Orbis({
          provider: provider,
        })
      )
    } 
  }, [orbis, provider]);

  return (
    <OrbisContext.Provider value={{ orbis, setOrbis }}>      
        {children}      
    </OrbisContext.Provider>
  );
}

export function useOrbis() {
  return useContext(OrbisContext);
}