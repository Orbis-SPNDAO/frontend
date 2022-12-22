import { VocdoniSDKClient, EnvOptions, AccountData } from "@vocdoni/sdk";
import { FC, useEffect, useState, useRef } from "react";
import { useSigner, useContractRead } from "wagmi";
import { SBT_ABI } from "../../abis/currentABI";
import PageLayout from "../../components/layouts/PageLayout";

const ProposalManagement: FC = () => {
  const client = useRef<VocdoniSDKClient>();
  const vocAccount = useRef<AccountData>();

  const { data: signer } = useSigner();
  
  const { data: sbtHolders } = useContractRead({      
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    abi: SBT_ABI,
    functionName: "fetchNfts",
  });  

  useEffect(() => {
    if (!client.current && signer)
      client.current = new VocdoniSDKClient({
        env: EnvOptions.DEV,
        wallet: signer,
      });
  }, [signer]);

  useEffect(() => {
    const accountHandler = async () => {
      try {
        // account already exists
        vocAccount.current = await client.current!.fetchAccountInfo();
      } catch (e) {
        // account not created yet
        vocAccount.current = await client.current!.createAccount();
      }

      // top up account with faucet tokens
      if (vocAccount.current.balance === 0) {
        await client.current!.collectFaucetTokens();
      }
    };

    if (client.current) accountHandler();
  }, [client]);

  const createProposal = async () => {};

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
