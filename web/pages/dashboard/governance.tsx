import { useRouter } from "next/router";
import { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useAccount } from "wagmi";
import { VoteData, voteData } from "../../components/dashboard/dummydata";
import Forum from "../../components/dashboard/governance/Forum";
import Proposals from "../../components/dashboard/governance/Proposals";
import { SignInPrompt } from "../../components/dashboard/SignInPrompt";
import BackButton from "../../components/dashboards-shared/BackButton";
import PageLayout from "../../components/layouts/PageLayout";

enum ActiveTab {
  Forum = "forum",
  Proposal = "proposal",
}

export default function Governance() {
  const router = useRouter();
  const { "initial-active-tab": initialActiveTab } = router.query;
  const { isConnecting, address } = useAccount();

  const [activeTab, setActiveTab] = useState(
    initialActiveTab ?? ActiveTab.Proposal
  );

  function onProposalClick(proposal: VoteData) {
    router.push(`/dashboard/governance/${proposal.id}`);
  }

  return !address || isConnecting ? (
    <PageLayout containerClassName="bg-custom-blue bg-cover min-h-screen">
      <SignInPrompt />
    </PageLayout>
  ) : (
    <PageLayout containerClassName="bg-custom-blue bg-cover min-h-screen">
      <div className="text-center my-5 md:my-10 w-full">
        <div className="columns-3 md:mx-28">
          <BackButton />
          <div>
            <button
              className={`mr-2 ${
                activeTab === ActiveTab.Forum
                  ? "text-custom-purple underline"
                  : "text-neutral-400"
              }`}
              onClick={() => setActiveTab(ActiveTab.Forum)}
            >
              Forum
            </button>
            <button
              className={`ml-2 ${
                activeTab === ActiveTab.Proposal
                  ? "text-custom-purple underline"
                  : "text-neutral-400"
              }`}
              onClick={() => setActiveTab(ActiveTab.Proposal)}
            >
              Proposals
            </button>
          </div>

          <div />
        </div>

        <div className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero">
          {activeTab === ActiveTab.Forum && <Forum />}
          {activeTab === ActiveTab.Proposal && (
            <Proposals voteData={voteData} onProposalClick={onProposalClick} />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
