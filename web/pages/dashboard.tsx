import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import Button, { ButtonStyle, ButtonTypes } from "../components/Button"
import Overview from "../components/dashboard/Overview"
import PageLayout from "../components/layouts/PageLayout"
import UserDashData from "../components/UserDashData"

export default function Home() {
  const router = useRouter()
  const { isConnecting, address } = useAccount()

  const overviewData = {
    totalRewards: ethers.utils.parseEther("1.27"),
    decryptionSessions: 5,
    votesParticipated: 12,
    discussions: 63,
  }

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

            <div>X</div>
          </div>
        </PageLayout>
      )}
    </>
  )
}
