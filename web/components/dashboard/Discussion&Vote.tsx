import { PublishedElection } from "@vocdoni/sdk";
import Link from "next/link";
import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import Proposal from "../../dataclass/Proposal";
import { useContainerDimensions } from "../../hooks/useContainerDimensions";
import { abbrevAccount } from "../../utils/string";
import { DiscussionData, ProposalData, VoteData } from "./dummydata";

interface IPosts {
  data: [];
  error: string;
  status: number;
}

export default function DiscussionNVote({
  discussionData,
  proposalData,
  voteData,
  onProposal,
}: {
  discussionData: IPosts;
  proposalData: PublishedElection[];
  voteData: VoteData[];
  onProposal: (proposalId: number) => void;
}) {
  const [voteContainer, setVoteContainer] = useState<HTMLDivElement | null>();
  const { width: containerWidth } = useContainerDimensions(
    voteContainer as HTMLDivElement
  );

  return (
    <div
      id="discussion"
      className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-left text-2xl font-normal">Discussion</h2>
        <Link
          href={{
            pathname: "/dashboard/governance",
            query: { "initial-active-tab": "forum" },
          }}
          className="font-normal text-custom-purple"
        >
          View All Discussions
        </Link>
      </div>

      {!discussionData || !discussionData.data || !discussionData.data.length ? (
        <p className="text-center m-auto my-7">No posts found</p>
      ) : (
        <div className="flex w-full overflow-x-auto text-left text-md mt-4 py-2">
          {discussionData.data.map((post: any) => {
            return (
              <div
                key={post.timestamp}
                className="border-2 rounded-lg mr-4 p-4 w-1/3 min-w-[15rem]"
              >
                <div className="flex flex-col truncate w-full text-2xl">
                  <div>{post.content.title}</div>

                  <div className="flex w-max text-custom-text-gray text-sm mt-2">
                    <span>
                      {post.creator_details.metadata?.ensName ??
                        post.creator_details.metadata?.address ??
                        ""}
                    </span>
                    <span className="mx-2">|</span>
                    <span>{post.content.comments.length} comments</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="my-8 w-full h-0.5 bg-custom-border opacity-25"></div>

      <div className="flex justify-between items-center">
        <h2 className="text-left text-2xl font-normal">Vote</h2>
        <Link
          href={{
            pathname: "/dashboard/governance",
            query: { "initial-active-tab": "proposal" },
          }}
          className="font-normal text-custom-purple"
        >
          View All Proposals
        </Link>
      </div>
      <div
        ref={(ref) => setVoteContainer(ref)}
        className="flex flex-col w-full text-left text-sm mt-4 py-2"
      >
        {proposalData ? (
          proposalData.map((p) => {
            // let jp = JSON.parse(JSON.stringify(p));
            // console.log("JSON PARSE", jp);
            return (
              <button
                key={p.id}
                className="border-2 rounded-lg mb-4 p-4 text-left"
              >
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl">{p.title.default}</span>
                    <span className="text-md rounded-full border-2 border-gray py-1 px-4">
                      {p.status}
                    </span>
                  </div>

                  <span className="text-custom-gray text-sm my-4">
                    {p.description.default}
                  </span>

                  {p.questions.map((question) => {
                    return question.choices.map((choice) => {
                      return (
                        <span key={choice.value}>
                          <div
                            className="absolute flex items-center bg-custom-purple bg-opacity-20 my-2 py-2 px-4 rounded-lg h-9"
                            style={{
                              width: p.voteCount * Number(choice.results),
                            }}
                          />

                          <div className="flex items-center my-2 py-2 px-4 rounded-lg">
                            <div className="mx-2 w-6">
                              {Number(choice.results) === p.voteCount && (
                                <IoIosCheckmark size="20" />
                              )}
                            </div>
                            <span>{choice.title.default}</span>

                            <span className="ml-2 text-custom-gray">
                              {choice.answer} vote
                            </span>
                          </div>
                        </span>
                      );
                    });
                  })}
                </div>
              </button>
            );
          })
        ) : (
          <div className="flex justify-center items-center w-full h-20">
            <span className="text-custom-gray">No proposals yet</span>
          </div>
        )}
      </div>
    </div>
  );
}
