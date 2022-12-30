import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useAccount, useContract, useProvider } from "wagmi";
import { UNLOCK_ABI } from "../../abis/currentABI";
import PageLayout from "../../components/layouts/PageLayout";
import Spinner from "../../components/Spinner";

const Report: FC = () => {
  const [ratio, setRatio] = useState(16 / 9);
  const [ratio2, setRatio2] = useState(16 / 9);
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
      <div className="text-center my-5 md:my-10 mx-5 w-full max-w-5xl m-auto">
        {isAuthed ? (
          <>
            <div className="mb-10">
              <h1 className="text-2xl md:text-4xl leading-tight mx-4">
                {router.query.name}
              </h1>
            </div>
            <Image
              src="/assets/data_analysis_i.png"
              width={800}
              height={100 / ratio}
              onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                setRatio(naturalWidth / naturalHeight)
              }
              alt="data analysis"
              className="m-auto my-5 rounded-md icon-shadow"
            ></Image>
            <Image
              src="/assets/data_analysis_ii.png"
              width={800}
              height={100 / ratio2}
              onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                setRatio2(naturalWidth / naturalHeight)
              }
              alt="data analysis 2"
              className="m-auto my-5 rounded-md icon-shadow"
            ></Image>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </PageLayout>
  );
};

export default Report;
