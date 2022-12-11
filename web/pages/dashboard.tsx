import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import DiscussionNVote from "../components/dashboard/Discussion&Vote"
import Overview from "../components/dashboard/Overview"
import PageLayout from "../components/layouts/PageLayout"

export default function Home() {
  const router = useRouter()
  const { isConnecting, address } = useAccount()

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

  function onDiscussVote() {
    router.push("/dashboard/governance")
  }
  function onManageSbt() {
    router.push("/dashboard/manage-sbt")
  }

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

            <DiscussionNVote
              discussionData={discussionData}
              voteData={voteData}
            />
          </div>
        </PageLayout>
      )}
    </>
  )
}
