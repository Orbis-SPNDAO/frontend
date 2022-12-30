import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { ProposalData } from "../../components/dashboard/dummydata";
import Proposals from "../../components/dashboard/governance/Proposals";
import BackButton from "../../components/dashboards-shared/BackButton";
import PageLayout from "../../components/layouts/PageLayout";

import { useVocdoni } from "../../context/vocdoni";

import { PublishedElection } from "@vocdoni/sdk";

const ProposalManagement: FC = () => {
  const router = useRouter();
  const { client } = useVocdoni();
  const [proposals, setProposals] = useState<PublishedElection[]>([]);

  useEffect(() => {
    async function getProposalIDs() {
      await fetch("/api/proposals", { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          for (let i = 0; i < res.data.id.length; i++) {
            client.fetchElection(res.data.id[i]).then((p) => {
              setProposals([...proposals, p]);
            });
          }
        });
    }

    if (client) {
      getProposalIDs().then(() =>
        console.log(`proposals: ${JSON.stringify(proposals)}`)
      );
    }
  }, [client]);

  useEffect(() => {
    console.log(`proposals: ${JSON.stringify(proposals)}`);
  }, [proposals]);

  const createProposal = async () => {
    router.push("/admin-dashboard/proposal-management/create-proposal");
  };

  function onProposalClick(proposal: ProposalData) {
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
          <Proposals
            proposalData={proposals}
            onProposalClick={onProposalClick}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ProposalManagement;
