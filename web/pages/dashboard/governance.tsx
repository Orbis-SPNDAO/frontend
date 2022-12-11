import { useRouter } from "next/router"
import { useState } from "react"
import { BsChevronLeft } from "react-icons/bs"
import { useAccount } from "wagmi"
import { VoteData, voteData } from "../../components/dashboard/dummydata"
import Proposals from "../../components/dashboard/governance/Proposals"
import PageLayout from "../../components/layouts/PageLayout"

enum ActiveTab {
  Forum = "forum",
  Proposal = "proposal",
}

export default function Governance() {
  const router = useRouter()
  const { isConnecting, address } = useAccount()

  const [activeTab, setActiveTab] = useState(ActiveTab.Proposal)

  function navigateBack() {
    router.push("/dashboard")
  }

  function onProposalClick(proposal: VoteData) {
    router.push(`/dashboard/governance/${proposal.id}`)
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
        <div className="columns-3 md:mx-28">
          <button className="flex items-center" onClick={() => navigateBack()}>
            <BsChevronLeft /> <span className="ml-4">Back to Dashboard</span>
          </button>

          <div className="">
            <button
              className={`mr-2 ${
                activeTab === ActiveTab.Forum
                  ? "text-custom-purple underline"
                  : ""
              }`}
              onClick={() => setActiveTab(ActiveTab.Forum)}
            >
              Forum
            </button>
            <button
              className={`ml-2 ${
                activeTab === ActiveTab.Proposal
                  ? "text-custom-purple underline"
                  : ""
              }`}
              onClick={() => setActiveTab(ActiveTab.Proposal)}
            >
              Proposals
            </button>
          </div>

          <div />
        </div>

        <div className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero">
          {activeTab === ActiveTab.Proposal && (
            <Proposals voteData={voteData} onProposalClick={onProposalClick} />
          )}
        </div>
      </div>
    </PageLayout>
  )
}
