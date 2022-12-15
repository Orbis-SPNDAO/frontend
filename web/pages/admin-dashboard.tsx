import { useRouter } from "next/router";
import PageLayout from "../components/layouts/PageLayout";

import { useEffect } from "react";
import { ADMIN_ABI } from "../abis/currentABI";

import { useAccount, useContract, useProvider } from "wagmi";
import AdminDashData from "../components/AdminDashData";

export default function Home() {
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
      if (!provider) {
        console.log("no provider");
        return;
      } else if (!contract) {
        console.log("No Contract");
        return;
      }
      try {
        const bal = await contract.balanceOf(address);

        if (bal > 0) {
          console.log("admin NFT found");
        } else {
          console.log("NOT found");
          // router.push("/")
        }
      } catch (e) {
        console.log(address);
        // router.push("/");
      }
    }

    checkForAdminNFT();
  }, [address, contract, provider, router]);

  return (
    <PageLayout containerClassName="bg-custom-blue min-h-screen">
      <div className="w-full bg-cover">
        <div className="text-center mt-32">
          <h1 className="font-bold text-6xl leading-tight text-custom-purple">Decrypted Data</h1>

          <div className="mt-8 flex flex-col items-center mx-auto">
            <AdminDashData />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
