import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import InsightsRow from "../../components/insights/InsightsRow";
import PageLayout from "../../components/layouts/PageLayout";
import Subtitle from "../../components/Subtitle";

const Report: FC = () => {
  const [ratio, setRatio] = useState(16 / 9);
  const [ratio2, setRatio2] = useState(16 / 9);
  const {
    query: { name },
  } = useRouter();

  return (
    <PageLayout containerClassName="bg-custom-blue bg-cover min-h-screen">
      <div className="text-center my-5 md:my-10 w-full max-w-5xl m-auto">
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl leading-tight mx-4">{name}</h1>
        </div>
        <Image
          src="/assets/data_analysis_i.png"
          width={300}
          height={100 / ratio}
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio(naturalWidth / naturalHeight)
          }
          alt="data analysis"
          className="w-full"
        ></Image>
        <Image
          src="/assets/data_analysis_ii.png"
          width={300}
          height={100 / ratio2}
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio2(naturalWidth / naturalHeight)
          }
          alt="data analysis 2"
          className="w-full"
        ></Image>
      </div>
    </PageLayout>
  );
};

export default Report;
