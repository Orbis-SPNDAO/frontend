import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
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
                  <div className="text-4xl">
                    {overviewData?.discussions ?? "-"}
                  </div>
                  <div>Discussions</div>
                </div>
              </div>
            </div>

            <div>X</div>
          </div>
        </PageLayout>
      )}
    </>
  )
}
