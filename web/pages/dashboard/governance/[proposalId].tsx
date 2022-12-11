import { useRouter } from "next/router"
import { useState } from "react"
import { BsChevronLeft } from "react-icons/bs"
import { IoIosCheckmark } from "react-icons/io"
import { useAccount } from "wagmi"
import { VoteData, voteData } from "../../../components/dashboard/dummydata"
import PageLayout from "../../../components/layouts/PageLayout"
import { useContainerDimensions } from "../../../hooks/useContainerDimensions"

export default function ProposalId() {
  const router = useRouter()
  const { isConnecting, address } = useAccount()

  const [voteContainer, setVoteContainer] = useState<HTMLDivElement | null>()
  const { width: containerWidth } = useContainerDimensions(
    voteContainer as HTMLDivElement
  )

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
        <div className="flex justify-between">
          <button className="flex items-center" onClick={() => navigateBack()}>
            <BsChevronLeft /> <span className="ml-4">Back to Dashboard</span>
          </button>

          <div>
            <button className="mr-2">Forum</button>
            <button className="ml-2">Proposals</button>
          </div>

          <div />
        </div>

        <div className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero">
          <h2 className="text-left text-2xl font-normal">Proposals</h2>

          <div
            ref={(ref) => setVoteContainer(ref)}
            className="flex flex-col w-full text-left text-sm mt-4 py-2"
          >
            {voteData?.map((vote) => {
              const totalVotes = vote.options.reduce(
                (total, o) => total + o.voteCount,
                0
              )

              const maxVoteCount = Math.max(
                ...vote.options.map((o) => o.voteCount)
              )

              const widthPerVote = containerWidth / totalVotes

              return (
                <button
                  key={vote.id}
                  className="border-2 rounded-lg mb-4 p-4 text-left"
                  onClick={() => onProposalClick(vote)}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl">{vote.title}</span>
                      <span className="text-md rounded-full border-2 border-gray py-1 px-4">
                        {vote.status}
                      </span>
                    </div>

                    <span className="text-custom-gray text-sm my-4">
                      {vote.description}
                    </span>

                    {vote.options.map((option) => {
                      return (
                        <span key={`${option.id}`}>
                          <div
                            className="absolute flex items-center bg-custom-purple bg-opacity-20 my-2 py-2 px-4 rounded-lg h-9"
                            style={{
                              width: widthPerVote * option.voteCount,
                            }}
                          />

                          <div className="flex items-center my-2 py-2 px-4 rounded-lg">
                            <div className="mx-2 w-6">
                              {option.voteCount === maxVoteCount && (
                                <IoIosCheckmark size="20" />
                              )}
                            </div>

                            <span> {option.name}</span>

                            <span className="ml-2 text-custom-gray">
                              {option.voteCount} vote
                            </span>
                          </div>
                        </span>
                      )
                    })}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
