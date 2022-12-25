import { useRouter } from "next/router";
import React from "react";
import BackButton from "../../../../components/dashboards-shared/BackButton";
import PageLayout from "../../../../components/layouts/PageLayout";

export default function DiscussionDetails() {
  const router = useRouter();

  return (
    <PageLayout containerClassName="bg-custom-blue bg-cover min-h-screen px-2 sm:px-4 sm:px-8 md:px-20">
      <div className="text-center mt-20 min-w-full">
        <div className="text-center my-5 md:my-10 w-full">
          <BackButton
            onBackRoute={() => router.back()}
            text="Back to Proposal Details"
          />

          <h1 className="font-bold text-custom-purple text-3xl leading-tight">
            This page is not implemented yet
          </h1>
        </div>
      </div>
    </PageLayout>
  );
}
