import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useProvider, useAccount, useContract } from "wagmi";
import { UNLOCK_ABI } from "../../abis/currentABI";
import Button, { ButtonStyle } from "../../components/Button";
import InsightsRow from "../../components/insights/InsightsRow";
import RowSection from "../../components/insights/RowSection";
import PageLayout from "../../components/layouts/PageLayout";
import Spinner from "../../components/Spinner";
import Subtitle from "../../components/Subtitle";

const List: FC = () => {
  const provider = useProvider();
  const router = useRouter();
  const { address } = useAccount();
  const [isAuthed, setIsAuthed] = useState(false);

  const contract = useContract({
    address: process.env.NEXT_PUBLIC_UNLOCK_ADDR,
    abi: UNLOCK_ABI,
    signerOrProvider: provider,
  });

  useEffect(() => {
    (async () => {
      if (contract && provider && address) {
        const hasSubsribed = parseInt(await contract.balanceOf(address), 10);
        if (!hasSubsribed) router.push("/insights");
        else setIsAuthed(true);
      }
    })();
  }, [router, contract, provider, address]);
  return (
    <PageLayout containerClassName="bg-custom-blue bg-cover min-h-screen">
      <div className="text-center my-5 md:my-10 w-full max-w-5xl m-auto">
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl leading-tight mx-4">
            Insight data
          </h1>
          <Subtitle>Reports of aggregated data from our community</Subtitle>
        </div>
        {isAuthed ? (
          <>
            <InsightsRow reportName="Report 1" />
            <InsightsRow reportName="OG Members" />
            <InsightsRow reportName="Big Spenders" />
            <InsightsRow reportName="October Data" />
            <InsightsRow reportName="All Data" />
            <InsightsRow reportName="Q1" />
            <InsightsRow reportName="2020" />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </PageLayout>
  );
};

export default List;
