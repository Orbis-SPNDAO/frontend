import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount } from "wagmi";
import BaseModal from "../../../components/BaseModal";
import {
  discussionData,
  proposalData,
  voteData,
} from "../../../components/dashboard/dummydata";
import ProposalDetails from "../../../components/dashboard/governance/ProposalDetails";
import BackButton from "../../../components/dashboards-shared/BackButton";
import PageLayout from "../../../components/layouts/PageLayout";
import Proposal from "../../../dataclass/Proposal";

export default function ProposalId() {
  const router = useRouter();
  const { isConnecting, address } = useAccount();

  const [selectedOption, setSelectedOption] = useState(0);

  const [showCastModal, setShowCastModal] = useState(false);

  const p = proposalData?.find(
    (p) => p.id.toString() === router.query?.proposalId
  );

  const votes = voteData.filter((vote) => vote.proposalId === p?.id);

  const proposal = p && new Proposal(p);

  function navigateToDiscussion(discussionId: number) {
    router.push(`/admin-dashboard/governance/discussion/${discussionId}`);
  }

  function onSelectOption(optionId: number) {
    setSelectedOption(optionId);
  }

  function onCastVote() {
    if (!selectedOption) return;

    setShowCastModal(true);
  }

  async function onModalConfirm() {
    console.log("onCastVote call contract for vote async");

    setShowCastModal(false);
  }

  function onModalCancel() {
    setShowCastModal(false);
  }

  return !address || isConnecting ? (
    <PageLayout containerClassName="bg-custom-blue bg-cover min-h-screen">
      <div className="text-center mt-20 min-w-full">
        <h1 className="font-bold text-custom-purple text-3xl leading-tight">
          Please Sign In To View Dashboard
        </h1>
      </div>
    </PageLayout>
  ) : (
    <PageLayout containerClassName="bg-custom-blue bg-cover min-h-screen">
      <BaseModal
        open={showCastModal}
        onClose={onModalCancel}
        title="Cast your vote"
        footerActions={[
          { type: "cancel", action: onModalCancel },
          { type: "confirm", action: onModalConfirm },
        ]}
      >
        <div className="grid-cols-2 pt-2">
          <div className="flex justify-between">
            <span>Choice:</span>
            <span className="text-custom-gray mb-2">
              {proposal?.options?.[selectedOption - 1]?.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Snapshot:</span>
            <span className="text-custom-gray mb-2">{proposal?.snapshot}</span>
          </div>

          <div className="flex justify-between">
            <span>Voting Power:</span>
            <span className="text-custom-gray mb-2">??? Implement me!!!</span>
          </div>
        </div>
      </BaseModal>
      <div className="text-center my-5 md:my-10 w-full">
        <div className="flex justify-between md:mx-28">
          <BackButton
            backRoute="/dashboard/governance"
            text="Back to all proposals"
          />
        </div>

        <ProposalDetails
          proposal={proposal}
          discussionData={discussionData}
          votes={votes}
          navigateToDiscussion={navigateToDiscussion}
          selectedOption={selectedOption}
          onSelectOption={onSelectOption}
          onCastVote={onCastVote}
        />
      </div>
    </PageLayout>
  );
}
