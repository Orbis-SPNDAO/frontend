import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { IoIosCheckmark } from "react-icons/io"
import { useAccount } from "wagmi"
import Overview from "../components/dashboard/Overview"
import PageLayout from "../components/layouts/PageLayout"
import { useContainerDimensions } from "../hooks/useContainerDimensions"

import { abbrevAccount } from "../utils"

export default function Home() {
  const router = useRouter()
  const { isConnecting, address } = useAccount()

  // const voteContainerRef = useRef<HTMLDivElement | null>()
  const [voteContainer, setVoteContainer] = useState<HTMLDivElement | null>()
  const { width: containerWidth } = useContainerDimensions(
    voteContainer as HTMLDivElement
  )

  const overviewData = {
    totalRewards: ethers.utils.parseEther("1.27"),
    decryptionSessions: 5,
    votesParticipated: 12,
    discussions: 63,
  }

  const discussionData = [
    {
      id: 1,
      title: "Topic 1 xxxxxxxxxxxxxxxxxxxxxxxxxx sadf asdf asd f",
      creator: ethers.constants.AddressZero,
      numberComments: 5,
    },
    {
      id: 2,
      title: "Topic 2 xxxxx",
      creator: ethers.constants.AddressZero,
      numberComments: 2,
    },
    {
      id: 3,
      title: "Topic 3 xxxxx",
      creator: ethers.constants.AddressZero,
      numberComments: 3,
    },
    {
      id: 4,
      title: "Topic 4 xxxxx",
      creator: ethers.constants.AddressZero,
      numberComments: 17,
    },
  ]

  const voteData = [
    {
      id: 1,
      title: "Proposal 1",
      description: "Lorem Ipsum",
      status: "Closed",
      options: [
        {
          id: 1,
          name: "Option 1",
          voteCount: 751,
        },
        { id: 2, name: "Option 2", voteCount: 1578 },
      ],
    },
    {
      id: 2,
      title: "Proposal 2",
      description:
        "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      status: "In Progress",
      options: [
        {
          id: 1,
          name: "Option 1",
          voteCount: 751,
        },
        {
          id: 2,
          name: "Option 2",
          voteCount: 1578,
        },
        {
          id: 3,
          name: "Option 3",
          voteCount: 12,
        },
      ],
    },
  ]

  function onDiscussVote() {}
  function onManageSbt() {}

  return (
    <>
      {!address || isConnecting ? (
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
            <Overview
              overviewData={overviewData}
              onDiscussVote={onDiscussVote}
              onManageSbt={onManageSbt}
            />

            <div className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero">
              <h2 className="text-left text-2xl font-normal">Discussion</h2>

              <div className="flex w-full overflow-x-auto text-left text-md mt-4 py-2">
                {discussionData?.map((discussion) => {
                  return (
                    <div
                      key={discussion.id}
                      className="border-2 rounded-lg mr-4 p-4 w-1/3"
                    >
                      <div className="flex flex-col truncate w-full text-2xl">
                        <div>{discussion.title}</div>

                        <div className="flex w-max text-custom-text-gray text-sm mt-2">
                          <span>{abbrevAccount(discussion.creator)}</span>
                          <span className="mx-2">|</span>
                          <span>{discussion.numberComments} comments</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="my-8 w-full h-0.5 bg-custom-border opacity-25"></div>

              <h2 className="text-left text-2xl font-normal mt-8">Vote</h2>

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
                    <div key={vote.id} className="border-2 rounded-lg mb-4 p-4">
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
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </PageLayout>
      )}
    </>
  )
}
