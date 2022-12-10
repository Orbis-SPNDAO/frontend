import { ConnectButton } from "@rainbow-me/rainbowkit";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useContract, useSigner } from "wagmi";
import { SBT_ABI } from "../abis/currentABI";
import Button from "../components/Button";
import Header from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { SocialsFooter } from "../components/SocialsFooter";
import useIsMounted from "../hooks/useIsMounted";

enum UserType {
  EndUser = "endUser",
  DaoAdmin = "daoAdmin",
}

export default function Home() {
  const router = useRouter();

  const [activeChoice, setActiveChoice] = useState(UserType.EndUser);
  const isMounted = useIsMounted();

  const { address, isConnected, isConnecting } = useAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    abi: SBT_ABI,
    signerOrProvider: signer,
  });

  async function checkForSbtAndRoute() {
    if (signer && address && isConnected && contract) {
      const bal = parseInt(await contract.balanceOf(address), 10);
      console.log({ bal });
      if (UserType.EndUser) {
        router.push(bal < 2 ? "/join" : '/dashboard');
      } else {
        router.push('/admin-dashboard');
      }
    }
  }

  const boxShadowStyle = {
    boxShadow:
      "0px 0px 8px rgba(20, 23, 26, 0.08), 0px 0px 4px rgba(20, 23, 26, 0.04)",
  };

  return (
    <div className="w-full min-h-screen bg-cover bg-[url('/assets/landing_bg.png')]">
      {isConnected ? <Header hideLogo /> : null}
      <div className={classNames("text-center", { "pt-24": !isConnected })}>
        <h1 className="text-custom-purple text-9xl leading-tight">SPN DAO</h1>
        <h4 className="text-3xl mb-16">
          Your data is more valuable than you think
        </h4>
        <div className="flex flex-row w-96 m-auto h-10 bg-slate-100 border border-zinc-300 rounded-full">
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
        <div className="w-stretch my-16 mx-28 h-80 hero">
          <div className="flex flex-row justify-between gap-12 px-12 mb-10">
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
            {!isConnected ? (
              <ConnectButton label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Connect Wallet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
            ) : (
              <Button btnSize="px-24" onClick={checkForSbtAndRoute}>
                Go to Dashboard
              </Button>
            )}
          </div>
        </div>
        <SocialsFooter />
      </div>
    </div>
  );
}
