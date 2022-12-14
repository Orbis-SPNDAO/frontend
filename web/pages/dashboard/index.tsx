import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import DiscussionNVote from "../../components/dashboard/Discussion&Vote";
import {
  discussionData,
  overviewData,
  voteData,
} from "../../components/dashboard/dummydata";
import Overview from "../../components/dashboard/Overview";
import PageLayout from "../../components/layouts/PageLayout";
import { SocialsFooter } from "../../components/SocialsFooter";

export default function Home() {
  const router = useRouter();
  const { isConnecting, address } = useAccount();
  const { bal } = router.query;

  function onDiscussVote() {
    router.push("/dashboard/governance");
  }
  function onManageSbt() {
    router.push({ pathname: "/dashboard/manage-membership", query: { bal } });
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
            <SocialsFooter />
          </div>
        </PageLayout>
      )}
    </>
  );
}
