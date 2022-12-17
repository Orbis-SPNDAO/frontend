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

export default function ProposalId() {
  const router = useRouter();
  const { isConnecting, address } = useAccount();

  const [voteContainer, setVoteContainer] = useState<HTMLDivElement | null>();
  const { width: containerWidth } = useContainerDimensions(
    voteContainer as HTMLDivElement
  );

  function onProposalClick(proposal: ProposalData) {
    router.push(`/dashboard/governance/${proposal.id}`);
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
          <h2 className="text-left text-2xl font-normal">Proposals</h2>

          <div
            ref={(ref) => setVoteContainer(ref)}
            className="flex flex-col w-full text-left text-sm mt-4 py-2"
          >
            {proposalData
              ?.filter((p) => p.id.toString() === router.query?.proposalId)
              .map((p) => {
                const votes = voteData.filter(
                  (vote) => vote.proposalId === p.id
                );

                const votesByOption: Record<number, number> = {};
                votes.forEach((vote) => {
                  votesByOption[vote.option] =
                    (votesByOption[vote.option] || 0) + 1;
                });

                const maxVoteCount = Math.max(...Object.values(votesByOption));

                const widthPerVote = containerWidth / votes.length!;

                const proposal = new Proposal(p);

                return (
                  <button
                    key={proposal.id}
                    className="border-2 rounded-lg mb-4 p-4 text-left"
                    onClick={() => onProposalClick(proposal)}
                  >
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl">{proposal.title}</span>
                        <span className="text-md rounded-full border-2 border-gray py-1 px-4">
                          {proposal.getStatusDisplay()}
                        </span>
                      </div>

                      <span className="text-custom-gray text-sm my-4">
                        {proposal.description}
                      </span>

                      {proposal.options.map((option) => {
                        const optionVoteCount = votesByOption[option.id] || 0;

                        return (
                          <span key={`${option.id}`}>
                            <div
                              className="absolute flex items-center bg-custom-purple bg-opacity-20 my-2 py-2 px-4 rounded-lg h-9"
                              style={{
                                width: widthPerVote * optionVoteCount,
                              }}
                            />

                            <div className="flex items-center my-2 py-2 px-4 rounded-lg">
                              <div className="mx-2 w-6">
                                {optionVoteCount === maxVoteCount && (
                                  <IoIosCheckmark size="20" />
                                )}
                              </div>

                              <span> {option.name}</span>

                              <span className="ml-2 text-custom-gray">
                                {optionVoteCount} vote
                              </span>
                            </div>
                          </span>
                        );
                      })}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
