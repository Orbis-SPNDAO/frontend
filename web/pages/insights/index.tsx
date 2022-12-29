import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BannerAndSubText from "../../components/BannerAndSubText";
import Button from "../../components/Button";
import { HeroSection } from "../../components/HeroSection";

export default function Insights() {
  const router = useRouter();
  const [baseUrl, setBaseUrl] = useState("");
  const [ratio, setRatio] = useState(16 / 9);
  const [ratio2, setRatio2] = useState(16 / 9);
  useEffect(() => {
    const { query } = router;
    if (query["address"] && query["signature"]) router.push("/insights/list");
    if (typeof window !== undefined) {
      setBaseUrl(
        (window.location.host.includes("localhost") ? "http://" : "https://") +
          window.location.host +
          "/insights"
      );
    }
  }, [router]);

  return (
    <div className="w-stretch min-h-screen bg-cover bg-[url('/assets/landing_bg.png')]">
      <div className="min-h-full pt-4 w-stretch">
        <div className="mx-6 md:mx-20 flex items-center h-20 text-gray-600">
          <Link
            href="/"
            className="font-normal text-custom-purple text-xl ml-auto"
          >
            Community Portal
          </Link>
        </div>
      </div>
      <div className="text-center">
        <BannerAndSubText subtext="Harvest data insights & stay compliant"></BannerAndSubText>
        <a
          href={`https://app.unlock-protocol.com/checkout?paywallConfig=%7B%22locks%22%3A%7B%22${process
            .env
            .NEXT_PUBLIC_UNLOCK_ADDR!}%22%3A%7B%22network%22%3A80001%7D%7D%2C%22pessimistic%22%3Atrue%2C%22skipRecipient%22%3Atrue%2C%22redirectUri%22%3A%22${encodeURIComponent(
            baseUrl
          )}%22%2C%22persistentCheckout%22%3Afalse%2C%22referrer%22%3A%22%22%2C%22messageToSign%22%3A%22Sign+to+confirm+your+identity+for+SPN+DAO%22%2C%22hideSoldOut%22%3Afalse%7D`}
          className="max-w-fit m-auto block"
        >
          <Button btnSize="w-xl" addClassName="m-auto">
            View Dashboard
          </Button>
        </a>
        <div className="w-stretch mt-12 mb-6 mx-6 sm:mx-14 lg:mx-20 2xl:mx-28 min-h-80 hero py-6 px-20 flex items-center">
          <HeroSection
            title="Access valuable data"
            subtitle="Access valuable data crowd-sourced from DAO members"
            hideMarginTop
          ></HeroSection>
          <Image
            src="/assets/data_analysis_i.png"
            width={500}
            height={100 / ratio}
            onLoadingComplete={({ naturalWidth, naturalHeight }) =>
              setRatio(naturalWidth / naturalHeight)
            }
            alt="data analysis"
            className="w-1/2"
          ></Image>
        </div>
        <div className="w-stretch mx-6 sm:mx-14 lg:mx-20 2xl:mx-28 min-h-80 hero py-6 px-20 flex items-center">
          <Image
            src="/assets/data_analysis_ii.png"
            width={300}
            height={100 / ratio2}
            onLoadingComplete={({ naturalWidth, naturalHeight }) =>
              setRatio2(naturalWidth / naturalHeight)
            }
            alt="data analysis"
            className="w-1/2"
          ></Image>
          <HeroSection
            title="Reward DAO members"
            subtitle="Reward DAO members for their contribution to the data economy"
            hideMarginTop
          ></HeroSection>
        </div>
      </div>
    </div>
  );
}
