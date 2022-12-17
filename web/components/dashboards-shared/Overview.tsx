import { ethers } from "ethers";
import React from "react";
import Button, { ButtonStyle } from "../Button";

export default function Overview({
  overviewData,
  onClick1,
  onClick2,
  isAdmin,
}: {
  overviewData: Record<string, any>;
  onClick1: Function;
  onClick2: Function;
  isAdmin?: boolean;
}) {
  return (
    <div className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero">
      <h1 className="text-xl md:text-4xl font-normal">
        {isAdmin
          ? "Be the shepherd for a vibrant data economy"
          : "Your data is more valuable than you think"}
      </h1>
      {!isAdmin ? (
        <p className="text-sm mt-3 text-zinc-500">
          Control your data and engage in the SPN DAO governance
        </p>
      ) : null}

      <div className="m-5 md:my-12 h-fit py-6 px-4 flex justify-around flex-wrap border-2 rounded-lg font-normal">
        <div className="flex flex-col m-1">
          <div className="flex items-center">
            <span className="text-4xl sm:text-6xl">
              {overviewData?.totalRewards
                ? ethers.utils.formatEther(overviewData.totalRewards)
                : "-"}
            </span>{" "}
            <span className="text-md sm:text-xl text-neutral-600">Matic</span>
          </div>
          <div className="text-neutral-600 text-lg sm:text-2xl">
            {isAdmin ? "Disbursements" : "Rewards"}
          </div>
        </div>
        <div className="flex flex-col m-1">
          <div className="text-4xl sm:text-6xl">
            {overviewData?.decryptionSessions ?? "-"}
          </div>
          <div className="text-neutral-600 text-lg sm:text-2xl">
            Decryption Sessions
          </div>
        </div>

        <span className="h-20 w-0.5 my-auto hidden lg:inline bg-custom-border opacity-25"></span>

        <div className="flex flex-col m-1">
          <div className="text-4xl sm:text-6xl">
            {overviewData?.votesParticipated ?? "-"}
          </div>
          <div className="text-neutral-600 text-lg sm:text-2xl">
            {isAdmin ? "Proposals" : "Votes Participated"}
          </div>
        </div>

        <div className="flex flex-col m-1">
          <div className="text-4xl sm:text-6xl">
            {overviewData?.discussions ?? "-"}
          </div>
          <div className="text-neutral-600 text-lg sm:text-2xl">
            Discussions
          </div>
        </div>
      </div>

      <div className="mx-auto w-fit flex">
        <Button
          buttonStyle={isAdmin ? ButtonStyle.Outline : ButtonStyle.Fill}
          onClick={() => onClick1()}
          addClassName={`mr-2 whitespace-nowrap${isAdmin ? " text-xs" : ""}`}
          btnSize="w-fit lg:w-72"
        >
          {isAdmin ? "Data Management " : "Discuss & Vote"}
        </Button>

        <Button
          buttonStyle={ButtonStyle.Outline}
          onClick={() => onClick2()}
          addClassName={`whitespace-nowrap${isAdmin ? " text-xs" : ""}`}
          btnSize="w-fit lg:w-72"
        >
          {isAdmin ? "Proposal Management " : "Manage SBT"}
        </Button>
      </div>
    </div>
  );
}
