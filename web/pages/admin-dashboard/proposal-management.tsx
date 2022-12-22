import { VocdoniSDKClient, EnvOptions } from "@vocdoni/sdk";
import { FC, useEffect, useState, useRef } from "react";

import { useSigner } from "wagmi";
import PageLayout from "../../components/layouts/PageLayout";


const ProposalManagement: FC = () => {
  
  const client = useRef<VocdoniSDKClient>();  

  const { data: signer } = useSigner();

  useEffect(() => {            
    if (!client.current && signer)
      client.current = new VocdoniSDKClient({env: EnvOptions.DEV, wallet: signer})

  }, [signer]);

  useEffect(() => {
        
    const accountHandler = async () => {
      try {
        let info = await client.current!.fetchAccountInfo();
        console.log("account exists", info)
      } catch (e) { // account not created yet
        const info = await client.current!.createAccount();
        console.log("account created", info)
      }
    }

    if (client.current)
      accountHandler();      

  }, [client]);

  
  
  const createProposal = async () => {
        

    // can switch to client.fetchAccountInfo later for performance
    // returns existing account info if already created
    // let vocAccount = await client.createAccount();
    // console.log("vocAccount", vocAccount)
    
    // // get tokens
    // if (vocAccount.balance === 0) {
    //   await client.collectFaucetTokens()
    // }

  };

  return (
    <PageLayout
      isAdmin
      hideHeaderMargin
      containerClassName="bg-custom-blue min-h-screen overflow-hidden px-2 sm:px-4 sm:px-8 md:px-20 relative"
    >
      {/*this is just here for setting up vocdoni-ui */}
      <div>
        <button onClick={createProposal}>New proposal</button>
      </div>
    </PageLayout>
  );
};

export default ProposalManagement;
