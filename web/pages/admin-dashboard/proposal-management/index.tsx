import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import Button from "../../../components/Button";
import Proposals from "../../../components/dashboard/governance/Proposals";
import BackButton from "../../../components/dashboards-shared/BackButton";
import PageLayout from "../../../components/layouts/PageLayout";

import { useVocdoni } from "../../../context/vocdoni";

import { PublishedElection } from "@vocdoni/sdk";
import { useContractRead } from "wagmi";
import { SBT_ABI } from "../../../abis/currentABI";

const ProposalManagement: FC = () => {
  const router = useRouter();
  const { client } = useVocdoni();

  const { proposalData, setProposalData } = useVocdoni();
  const { data: proposal_data } = useContractRead({
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    abi: SBT_ABI,
    functionName: "fetchProposalIds",
  });

  useEffect(() => {
    async function getProposalIDs() {
      console.log({ proposal_data });
      if (!proposal_data) return;
      const typedProposalData = proposal_data as {
        proposalId: string;
        index: number;
        isActive: boolean;
      }[];
      let temp_proposals: PublishedElection[] = [];
      for (let i = 0; i < typedProposalData.length; i++) {
        if (typedProposalData[i].isActive === false) continue;
        const id = typedProposalData[i].proposalId;
        const proposal = await client.fetchElection(id);
        temp_proposals.push(proposal);
      }
      setProposalData(temp_proposals);
    }

    if (client) {
      getProposalIDs();
    }
  }, [client, setProposalData, proposal_data]);

  const createProposal = async () => {
    router.push("/admin-dashboard/proposal-management/create-proposal");
  };

  function onProposalClick(proposal: PublishedElection) {
    router.push(`/admin-dashboard/proposal-management/${proposal.id}`);
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
          <Proposals onProposalClick={onProposalClick} />
        </div>
      </div>
    </PageLayout>
  );
};

export default ProposalManagement;
