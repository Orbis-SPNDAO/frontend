import { FC } from "react";
import Button, { ButtonStyle } from "../../components/Button";
import InsightsRow from "../../components/insights/InsightsRow";
import RowSection from "../../components/insights/RowSection";
import PageLayout from "../../components/layouts/PageLayout";
import Subtitle from "../../components/Subtitle";

const List: FC = () => {
  return (
    <PageLayout containerClassName="bg-custom-blue bg-cover min-h-screen">
      <div className="text-center my-5 md:my-10 w-full max-w-5xl m-auto">
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl leading-tight mx-4">
            Insight data
          </h1>
          <Subtitle>Reports of aggregated data from our community</Subtitle>
        </div>
        <InsightsRow reportName="Report 1"/>
        <InsightsRow reportName="OG Members"/>
        <InsightsRow reportName="Big Spenders"/>
        <InsightsRow reportName="October Data"/>
        <InsightsRow reportName="All Data"/>
        <InsightsRow reportName="Q1"/>
        <InsightsRow reportName="2020"/>
      </div>
    </PageLayout>
  );
};

export default List;
