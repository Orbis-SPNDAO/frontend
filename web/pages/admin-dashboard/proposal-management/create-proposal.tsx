import React, { useState } from "react";
import Button from "../../../components/Button";
import BackButton from "../../../components/dashboards-shared/BackButton";
import PageLayout from "../../../components/layouts/PageLayout";

enum CreateProposalState {
  Step1BasicInfo = "basic_info",
  Step2VoteOptions = "vote_options",
}

export default function CreateProposal() {
  const [pageState, setPageState] = useState(
    CreateProposalState.Step1BasicInfo
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discussion, setDiscussion] = useState("");

  const isValidStep1 = title && description;

  function onStep1Continue() {
    if (!isValidStep1) return;

    console.log("onStep1Continue");
    setPageState(CreateProposalState.Step2VoteOptions);
  }

  return (
    <PageLayout
      isAdmin
      hideHeaderMargin
      containerClassName="bg-custom-blue min-h-screen overflow-hidden px-2 sm:px-4 sm:px-8 md:px-20 relative"
    >
      {/*this is just here for setting up vocdoni-ui */}
      <div className="text-center my-5 md:my-10 w-full">
        <div className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero">
          <div className="flex justify-between">
            <BackButton backRoute="/admin-dashboard" />
          </div>

          {pageState === CreateProposalState.Step1BasicInfo && (
            <div className="grid grid-cols-3 mt-8 mb-16">
              <div className="col-span-2 mr-8">
                <div className="flex flex-col text-left mt-4">
                  Title
                  <input
                    className="mt-2"
                    type={"text"}
                    placeholder={"Add proposal title here"}
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col text-left mt-4">
                  Description
                  <textarea
                    className="mt-2 min-h-[10rem]"
                    placeholder={"Describe the proposal in details"}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col text-left mt-4">
                  Discussion
                  <input
                    className="mt-2"
                    type={"text"}
                    placeholder={"https://(Link the discussion here)"}
                    name="discussion"
                    value={discussion}
                    onChange={(e) => setDiscussion(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-1 ml-8">
                <Button onClick={onStep1Continue} disabled={!isValidStep1}>
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
