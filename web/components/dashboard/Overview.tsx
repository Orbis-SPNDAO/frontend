import { ethers } from "ethers"
import React from "react"
import Button, { ButtonStyle } from "../Button"

export default function Overview({
  overviewData,
  onDiscussVote,
  onManageSbt,
}: {
  overviewData: Record<string, any>
  onDiscussVote: Function
  onManageSbt: Function
}) {
  return (
    <div className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero border-2">
      <h1 className="text-xl md:text-4xl font-normal">
        Your data is more valuable than you think
      </h1>
      <p className="text-sm mt-3">
        Control your data and engage in the SPN DAO governance
      </p>

      <div className="m-5 md:my-12 h-fit py-6 px-4 flex justify-around border-2 rounded-lg font-normal">
        <div className="flex flex-col">
          <div>
            <span className="text-4xl">
              {overviewData?.totalRewards
                ? ethers.utils.formatEther(overviewData.totalRewards)
                : "-"}
            </span>{" "}
            Matic
          </div>
          <div>Rewards</div>
        </div>
        <div className="flex flex-col">
          <div className="text-4xl">
            {overviewData?.decryptionSessions ?? "-"}
          </div>
          <div>Decryption Sessions</div>
        </div>

        <span className="h-10 w-0.5 my-auto bg-custom-border opacity-25"></span>

        <div className="flex flex-col">
          <div className="text-4xl">
            {overviewData?.votesParticipated ?? "-"}
          </div>
          <div>Votes Participated</div>
        </div>

        <div className="flex flex-col">
          <div className="text-4xl">{overviewData?.discussions ?? "-"}</div>
          <div>Discussions</div>
        </div>
      </div>

      <div className="mx-auto w-fit flex">
        <Button
          onClick={() => onDiscussVote()}
          addClassName="mr-2 whitespace-nowrap"
        >
          Discuss & Vote
        </Button>

        <Button
          buttonStyle={ButtonStyle.Outline}
          onClick={() => onManageSbt()}
          addClassName="whitespace-nowrap bg-white text-custom-purple hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-500 ml-2"
        >
          Manage SBT
        </Button>
      </div>
    </div>
  )
}
