import { useRouter } from "next/router";
import { FC } from "react";
import Button, { ButtonStyle } from "../Button";
import RowSection from "./RowSection";

const InsightsRow: FC<{ reportName: string }> = ({ reportName }) => {
  const router = useRouter();
  return (
    <div className="p-4 rounded-xl bg-white flex justify-between shadow-md my-2 mx-4">
      <RowSection title="Report name" value={reportName} />
      <RowSection title="Consumer data #" value="3,853" />
      <RowSection title="Release date" value="12/22/2023" />
      <Button
        buttonStyle={ButtonStyle.Outline}
        btnSize="w-fit"
        padding="px-20"
        onClick={() => {
          router.push({
            pathname: "/insights/report",
            query: {
              name: reportName,
            },
          });
        }}
      >
        Read
      </Button>
    </div>
  );
};
export default InsightsRow;
