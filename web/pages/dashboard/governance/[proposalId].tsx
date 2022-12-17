import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { useAccount } from "wagmi";
import {
  ProposalData,
  proposalData,
  voteData,
} from "../../../components/dashboard/dummydata";
import BackButton from "../../../components/dashboards-shared/BackButton";
import PageLayout from "../../../components/layouts/PageLayout";
import Proposal from "../../../dataclass/Proposal";
import { useContainerDimensions } from "../../../hooks/useContainerDimensions";
import { abbrevAccount } from "../../../utils/string";

export default function ProposalId() {
  const router = useRouter();
  const { isConnecting, address } = useAccount();

  const [voteContainer, setVoteContainer] = useState<HTMLDivElement | null>();
  const { width: containerWidth } = useContainerDimensions(
    voteContainer as HTMLDivElement
  );
  const [selectedOption, setSelectedOption] = useState(0);

  const p = proposalData?.find(
    (p) => p.id.toString() === router.query?.proposalId
  );

  const votes = voteData.filter((vote) => vote.proposalId === p?.id);

  const votesByOption: Record<number, number> = {};
  votes.forEach((vote) => {
    votesByOption[vote.option] = (votesByOption[vote.option] || 0) + 1;
  });

  const maxVoteCount = Math.max(...Object.values(votesByOption));

  const widthPerVote = containerWidth / votes.length!;

  const proposal = p && new Proposal(p);

  function onSelectOption(optionId: number) {
    setSelectedOption(optionId);
  }

  function onCastVote() {
    if (!selectedOption) return;

    console.log("onCastVote");
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
      <div className="text-center my-5 md:my-10 w-full">
        <div className="flex justify-between md:mx-28">
          <BackButton
            backRoute="/dashboard/governance"
            text="Back to all proposals"
          />
        </div>

        <div className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero">
          <div
            ref={(ref) => setVoteContainer(ref)}
            className="flex flex-col w-full text-left text-sm mt-4 py-2"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="flex flex-col lg:col-span-3">
                <span className="text-2xl">{proposal?.title}</span>

                <div className="mt-4">
                  <span className="text-md rounded-full border-2 border-gray py-1 px-4">
                    {proposal?.getStatusDisplay()}
                  </span>

                  <span className="text-custom-gray text-md ml-4">
                    By {abbrevAccount(proposal?.creator ?? "")}
                  </span>
                </div>

                <div className="text-custom-gray text-sm my-8">
                  {proposal?.description}
                </div>

                <div className="w-full text-left text-sm mt-4 py-2 border-2 rounded-lg my-4 p-4">
                  <h2 className="text-left text-2xl font-normal mb-2">
                    Cast your vote
                  </h2>

                  {proposal?.options?.map((option) => {
                    return (
                      <button
                        key={`${option.id}`}
                        className={`w-full ${
                          selectedOption === option.id ? "bg-gray-200" : ""
                        } hover:bg-gray-300 p-2 rounded-lg border-2 border-gray my-2`}
                        onClick={() => onSelectOption(option.id)}
                      >
                        {option.name}
                      </button>
                    );
                  })}

                  {(proposal?.options?.length ?? 0) > 0 && (
                    <button
                      className="w-full hover:bg-gray-300 p-2 rounded-lg border-2 border-gray my-2"
                      onClick={onCastVote}
                    >
                      Submit your vote
                    </button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="flex flex-col text-left text-sm mt-4 py-2 border-2 rounded-lg mb-4 p-4 divide-y">
                  <h2 className="text-left text-2xl font-normal my-2">
                    Information
                  </h2>

                  <div className="grid-cols-2 pt-2">
                    <div className="flex justify-between text-custom-gray mb-2">
                      <span>Organisation</span>
                      <span>{proposal?.organisation}</span>
                    </div>
                    <div className="flex justify-between text-custom-gray mb-2">
                      <span>IPFS</span>
                      <span>{proposal?.ipfs}</span>
                    </div>
                    <div className="flex justify-between text-custom-gray mb-2">
                      <span>Voting System</span>
                      <span>{proposal?.votingSystem}</span>
                    </div>
                    <div className="flex justify-between text-custom-gray mb-2">
                      <span>Start Date</span>
                      <span>{proposal?.startDate?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-custom-gray mb-2">
                      <span>End Date</span>
                      <span>{proposal?.endDate?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-custom-gray mb-2">
                      <span>Snapshot</span>
                      <span>{proposal?.snapshot}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col text-left text-sm mt-4 py-2 border-2 rounded-lg mb-4 p-4 divide-y">
                  <h2 className="text-left text-2xl font-normal">
                    Current results
                  </h2>

                  {proposal?.options?.map((option) => {
                    return <button key={`${option.id}`}>{option.name}</button>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
