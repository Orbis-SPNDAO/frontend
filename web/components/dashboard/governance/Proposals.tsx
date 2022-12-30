import React, { Dispatch, useEffect, useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import Proposal from "../../../dataclass/Proposal";
import { useContainerDimensions } from "../../../hooks/useContainerDimensions";
import { ProposalData, VoteData } from "../dummydata";

import { PublishedElection, IQuestion, ElectionStatus } from "@vocdoni/sdk";

export default function Proposals({
  proposalData,
  onProposalClick,
}: {
  proposalData: PublishedElection[];
  onProposalClick: any;
}) {
  const [voteContainer, setVoteContainer] = useState<HTMLDivElement | null>();
  const { width: containerWidth } = useContainerDimensions(
    voteContainer as HTMLDivElement
  );

  return (
    <>
      <h2 className="text-left text-2xl font-normal">Proposals</h2>

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
                onClick={() => onProposalClick(p)}
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
          <div className="text-center">No proposals</div>
        )}
      </div>
    </>
  );
}
