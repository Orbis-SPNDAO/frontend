import { ConnectButton } from "@rainbow-me/rainbowkit";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useAccount,
  useContract,
  useProvider,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import { SBT_ABI } from "../abis/currentABI";
import Button from "../components/Button";
import Header from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { SocialsFooter } from "../components/SocialsFooter";
import Spinner from "../components/Spinner";
import useIsMounted from "../hooks/useIsMounted";

enum UserType {
  EndUser = "endUser",
  DaoAdmin = "daoAdmin",
}

export default function Home() {
  const router = useRouter();

  const [activeChoice, setActiveChoice] = useState(UserType.EndUser);
  const [isLoading, setIsLoading] = useState(false);
  const provider = useProvider();

  const network = useSwitchNetwork({
    chainId: 80001,
    onError: () => null,
  });

  const { address } = useAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    abi: SBT_ABI,
    signerOrProvider: provider,
  });
  useEffect(() => {
    (async function checkForSbtAndRoute() {
      if (signer && address && contract) {
        setIsLoading(true);
        const bal = parseInt(await contract.balanceOf(address), 10);
        console.log({ bal });
        if (UserType.EndUser) {
          if (bal === 0) router.push("/join");
          else router.push({ pathname: "/dashboard", query: { bal } });
        } else {
          router.push("/admin-dashboard");
        }
      }
    })();
  }, [signer, address, contract, router]);

  const boxShadowStyle = {
    boxShadow:
      "0px 0px 8px rgba(20, 23, 26, 0.08), 0px 0px 4px rgba(20, 23, 26, 0.04)",
  };

  return (
    <div className="min-w-screen min-h-screen bg-cover bg-[url('/assets/landing_bg.png')]">
      <div className="text-center py-10 sm:py-20">
        <h1 className="text-6xl text-custom-purple sm:text-9xl leading-tight">
          SPN DAO
        </h1>
        <h4 className="text-md sm:text-3xl mb-16">
          Your data is more valuable than you think
        </h4>
        <div className="w-3/4 flex flex-row sm:w-96 m-auto h-10 bg-slate-100 border border-zinc-300 rounded-full">
          <button
            className={classNames("w-1/2 m-1 rounded-full text-sm", {
              "bg-white": activeChoice === UserType.EndUser,
            })}
            style={activeChoice === UserType.EndUser ? boxShadowStyle : {}}
            onClick={() => setActiveChoice(UserType.EndUser)}
          >
            SPN Member
          </button>
          <button
            className={classNames("w-1/2 m-1 rounded-full text-sm", {
              "bg-white": activeChoice === UserType.DaoAdmin,
            })}
            style={activeChoice === UserType.DaoAdmin ? boxShadowStyle : {}}
            onClick={() => setActiveChoice(UserType.DaoAdmin)}
          >
            DAO Admin
          </button>
        </div>
        <div className="w-stretch my-12 mx-6 sm:mx-14 md:mx-28 min-h-80 hero pb-8">
          <div className="flex flex-row flex-wrap justify-around mb-10">
            <HeroSection
              title="Control Your Data"
              subtitle="Have true ownership and governance in the data economy"
            />
            <HeroSection
              title="Get Rewards"
              subtitle="Get rewards in MATIC whenever your data is decrypted"
            />
            <HeroSection
              title="Preserve Privacy"
              subtitle="Pool your anonymized transaction data with other DAO members"
            />
          </div>
          <div className="m-auto w-fit">
            {isLoading || address ? (
              <Spinner />
            ) : (
              <ConnectButton label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Connect Wallet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
            )}
          </div>
        </div>
        <SocialsFooter />
      </div>
    </div>
  );
}
