import { AccountData, EnvOptions, VocdoniSDKClient } from "@vocdoni/sdk";
import { useRouter } from "next/router";
import { FC, useEffect, useRef } from "react";
import { useContractRead, useSigner } from "wagmi";
import { SBT_ABI } from "../../abis/currentABI";
import Button from "../../components/Button";
import {
  ProposalData,
  proposalData,
  voteData,
} from "../../components/dashboard/dummydata";
import Proposals from "../../components/dashboard/governance/Proposals";
import BackButton from "../../components/dashboards-shared/BackButton";
import PageLayout from "../../components/layouts/PageLayout";

const ProposalManagement: FC = () => {
  const router = useRouter();

  const client = useRef<VocdoniSDKClient>();
  const vocAccount = useRef<AccountData>();

  const { data: signer } = useSigner();

  const { data: sbtHolders } = useContractRead({
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    abi: SBT_ABI,
    functionName: "fetchHolders",
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

  const createProposal = async () => {
    console.log(sbtHolders);
  };

  function onProposalClick(proposal: ProposalData) {
    router.push(`/admin-dashboard/governance/${proposal.id}`);
  }

  return (
    <PageLayout
      isAdmin
      hideHeaderMargin
      containerClassName="bg-custom-blue min-h-screen overflow-hidden px-2 sm:px-4 sm:px-8 md:px-20 relative"
    >
      {/*this is just here for setting up vocdoni-ui */}
      <div className="text-center my-5 md:my-10 w-full">
        <div className="flex justify-between md:mx-28">
          <BackButton backRoute="/admin-dashboard" />

          <div>
            <Button onClick={createProposal}>+ New proposal</Button>
          </div>
        </div>

        <div className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero">
          <Proposals
            proposalData={proposalData}
            voteData={voteData}
            onProposalClick={onProposalClick}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ProposalManagement;
