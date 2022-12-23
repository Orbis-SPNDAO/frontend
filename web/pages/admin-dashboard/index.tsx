import { useRouter } from "next/router";
import PageLayout from "../../components/layouts/PageLayout";

import { useEffect } from "react";
import { ADMIN_ABI } from "../../abis/currentABI";

import { useAccount, useContract, useProvider } from "wagmi";
import { overviewData } from "../../components/dashboard/dummydata";
import Overview from "../../components/dashboards-shared/Overview";
import { SocialsFooter } from "../../components/SocialsFooter";

export default function AdminDashboard() {
  const provider = useProvider();
  const contract = useContract({
    address: process.env.NEXT_PUBLIC_ADMIN_ADDR,
    abi: ADMIN_ABI,
    signerOrProvider: provider,
  });
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    // check for admin NFT
    async function checkForAdminNFT() {
      if (!provider || !contract) {
        return;
      }
      try {
        const bal = await contract.balanceOf(address);

        if (bal > 0) {
          console.log("admin NFT found");
        } else {
          // router.push("/");
        }
      } catch (e) {
        // router.push("/");
      }
    }

    checkForAdminNFT();
  }, [address, contract, provider, router]);

  return (
    <PageLayout
      isAdmin
      containerClassName="bg-custom-blue min-h-screen relative pb-10"
    >
      <div className="text-center my-5 md:my-10 w-full h-full">
        <Overview
          overviewData={overviewData}
          onClick1={() => router.push("/admin-dashboard/data-management")}
          onClick2={() => router.push("/admin-dashboard/proposal-management")}
          isAdmin
        ></Overview>
        <SocialsFooter addClasses="absolute bottom-0 left-0 right-0 pb-4 sm:pb-8" />
      </div>
    </PageLayout>
  );
}
