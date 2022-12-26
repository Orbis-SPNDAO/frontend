import { useRouter } from "next/router";
import { MouseEventHandler, useMemo, useState } from "react";
import Proposal from "../../../dataclass/Proposal";
import { useContainerDimensions } from "../../../hooks/useContainerDimensions";
import { abbrevAccount } from "../../../utils/string";
import Button, { ButtonStyle } from "../../Button";
import { DiscussionData, VoteData } from "../dummydata";

export default function ProposalDetails({
  proposal,
  discussionData,
  votes,
  navigateToDiscussion,
  selectedOption,
  onSelectOption,
  onCastVote,
  onDeleteProposal,
}: {
  proposal: Proposal | undefined;
  discussionData: DiscussionData[];
  votes: VoteData[];
  navigateToDiscussion: Function;
  selectedOption: number;
  onSelectOption: Function;
  onCastVote: MouseEventHandler<HTMLButtonElement> | undefined;
  onDeleteProposal?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const router = useRouter();

  const [voteContainer, setVoteContainer] = useState<HTMLDivElement | null>();

  const { width: containerWidth } = useContainerDimensions(
    voteContainer as HTMLDivElement
  );

  const votesByOption = useMemo(() => {
    const votesByOpt: Record<number, number> = {};

    votes.forEach((vote) => {
      votesByOpt[vote.option] = (votesByOpt[vote.option] || 0) + 1;
    });

    return votesByOpt;
  }, [votes]);

  const widthPerVote = containerWidth / votes.length!;

  const isAdminPage = router.pathname.includes("/admin-dashboard");

  return (
    <div className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero">
      <div className="flex flex-col w-full text-left text-sm mt-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
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
                {isAdminPage ? "Vote options" : "Cast your vote"}
              </h2>

              {proposal?.options?.map((option) => {
                return (
                  <button
                    key={`${option.id}`}
                    className={`w-full ${
                      selectedOption === option.id ? "bg-gray-200" : ""
                    } ${
                      isAdminPage ? "" : "hover:bg-gray-300"
                    } p-2 rounded-lg border-2 border-gray my-2`}
                    onClick={() => onSelectOption(option.id)}
                    disabled={isAdminPage}
                  >
                    {option.name}
                  </button>
                );
              })}

              {!isAdminPage && (proposal?.options?.length ?? 0) > 0 && (
                <button
                  className="w-full hover:bg-gray-300 p-2 rounded-lg border-2 border-gray my-2"
                  onClick={onCastVote}
                >
                  Submit your vote
                </button>
              )}
            </div>

            <div className="w-full text-left text-sm mt-4 py-2 border-2 rounded-lg my-4 p-4">
              <h2 className="text-left text-2xl font-normal mb-2">
                Discussion
              </h2>

              {proposal?.discussions?.map((discussionId) => {
                const discussion = discussionData.find(
                  (d) => d.id === discussionId
                );

                if (!discussion) return;

                return (
                  <div
                    key={discussion.id}
                    className="border-2 rounded-lg p-4 my-4 cursor-pointer"
                    onClick={() => navigateToDiscussion(discussionId)}
                  >
                    <div className="flex flex-col truncate text-2xl">
                      <div>{discussion.title}</div>

                      <div className="text-custom-gray text-sm mt-2">
                        {discussion.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full text-left text-sm mt-4 py-2 border-2 rounded-lg my-4 p-4">
              <h2 className="text-left text-2xl font-normal mb-2">
                Votes
                <span className="rounded-full bg-custom-purple-light p-1 ml-4">
                  {votes?.length}
                </span>
              </h2>

              {votes?.map((vote) => {
                return (
                  <div key={vote.id} className="flex justify-between">
                    <span className="text-custom-gray break-all">
                      {vote.voter}
                    </span>

                    <span className="ml-4">Option {vote.option}</span>
                  </div>
                );
              })}
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

            <div
              ref={(ref) => setVoteContainer(ref)}
              className="flex flex-col text-left text-sm mt-4 py-2 border-2 rounded-lg mb-4 p-4 divide-y"
            >
              <h2 className="text-left text-2xl font-normal mb-2">
                Current results
              </h2>

              <div className="pt-2">
                {proposal?.options?.map((option) => {
                  const optionVoteCount = votesByOption[option.id] || 0;

                  return (
                    <div key={`${option.id}`}>
                      <div className="">{option.name}</div>
                      <div className="relative h-6 mb-2">
                        <div
                          className="absolute bg-custom-purple-light my-2 py-1 px-2 rounded-lg h-3"
                          style={{
                            width: containerWidth - 48,
                          }}
                        />
                        <div
                          className="absolute bg-custom-purple my-2 py-1 px-2 rounded-lg h-3"
                          style={{
                            width: widthPerVote * optionVoteCount,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {isAdminPage && (
              <div>
                <Button
                  onClick={onDeleteProposal}
                  buttonStyle={ButtonStyle.Outline}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
