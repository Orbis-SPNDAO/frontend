import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import DiscussionNVote from "../../components/dashboard/Discussion&Vote";
import {
  discussionData,
  overviewData,
  proposalData,
  voteData,
} from "../../components/dashboard/dummydata";
import Overview from "../../components/dashboards-shared/Overview";
import PageLayout from "../../components/layouts/PageLayout";
import { SocialsFooter } from "../../components/SocialsFooter";

export default function Dashboard() {
  const router = useRouter();
  const { isConnecting, address } = useAccount();
  const { bal } = router.query;

  function onDiscussVote() {
    document.querySelector("#discussion")?.scrollIntoView();
  }
  function onManageSbt() {
    router.push({ pathname: "/dashboard/manage-membership", query: { bal } });
  }
  function onProposal(proposalId: number) {
    router.push({ pathname: `/dashboard/governance/${proposalId}` });
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
              onClick1={onDiscussVote}
              onClick2={onManageSbt}
            />

            <DiscussionNVote
              discussionData={discussionData}
              proposalData={proposalData}
              voteData={voteData}
              onProposal={onProposal}
            />
            <SocialsFooter />
          </div>
        </PageLayout>
      )}
    </>
  );
}
