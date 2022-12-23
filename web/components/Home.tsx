import { ConnectButton } from "@rainbow-me/rainbowkit";
import classNames from "classnames";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import {
  useAccount,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
} from "wagmi";
import { ADMIN_ABI, SBT_ABI } from "../abis/currentABI";
import { HeroSection } from "../components/HeroSection";
import { SocialsFooter } from "../components/SocialsFooter";
import Spinner from "../components/Spinner";
import Button from "./Button";
import Header from "./Header";
import { JoinSubText } from "./join/JoinSubText";
import { RiErrorWarningFill } from "react-icons/ri";

enum UserType {
  EndUser = "endUser",
  DaoAdmin = "daoAdmin",
}

const Home: FC<{ justBurned?: boolean }> = ({ justBurned }) => {
  const [hasJustBurned, setHasJustBurned] = useState(justBurned);
  const router = useRouter();

  const [activeChoice, setActiveChoice] = useState(UserType.EndUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isMissingAdminToken, setIsMissingAdminToken] = useState(false);
  const provider = useProvider();

  const { chain } = useNetwork();
  const wrongNetwork = chain?.id !== 80001;

  const { address } = useAccount();
  const { data: signer } = useSigner();
  const endUserContract = useContract({
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    abi: SBT_ABI,
    signerOrProvider: provider,
  });
  const adminContract = useContract({
    address: process.env.NEXT_PUBLIC_ADMIN_ADDR,
    abi: ADMIN_ABI,
    signerOrProvider: provider,
  });
  useEffect(() => {
    (async function checkForSbtAndRoute() {
      if (
        signer &&
        address &&
        ((endUserContract && activeChoice == UserType.EndUser) ||
          (adminContract && activeChoice == UserType.DaoAdmin)) &&
        !wrongNetwork &&
        !hasJustBurned &&
        !isMissingAdminToken
      ) {
        setIsLoading(true);
        if (activeChoice === UserType.EndUser && endUserContract) {
          const tokenId = await endUserContract
            .ownerToTokenId(address)
            .then(parseInt);
          if (tokenId) router.push("/dashboard");
          else router.push("/join");
        } else if (adminContract) {
          const bal = parseInt(await adminContract.balanceOf(address), 10);
          if (bal === 0) setIsMissingAdminToken(true);
          else router.push("/admin-dashboard");
        }
      }
    })();
  }, [
    signer,
    address,
    endUserContract,
    router,
    wrongNetwork,
    hasJustBurned,
    activeChoice,
    isMissingAdminToken,
    adminContract,
  ]);

  const boxShadowStyle = {
    boxShadow:
      "0px 0px 8px rgba(20, 23, 26, 0.08), 0px 0px 4px rgba(20, 23, 26, 0.04)",
  };

  return (
    <div className="w-stretch min-h-screen bg-cover bg-[url('/assets/landing_bg.png')]">
      {justBurned ? <Header hideButton /> : null}
      <div
        className={`text-center ${
          justBurned ? "py-2 sm:py-10" : "py-6 sm:py-20"
        }`}
      >
        {justBurned ? (
          <div className="w-stretch">
            <h2 className="text-2xl sm:text-4xl mx-5">
              Sorry to see you go 🥺
            </h2>
            <h3 className="text-md mx-5 sm:text-xl text-zinc-600 mt-3 mb-10 font-normal">
              Have some questions about SPN DAO?
              <a className="ml-2 text-custom-purple underline">Read FAQs</a>
            </h3>
          </div>
        ) : (
          <div>
            <h1 className="text-6xl text-custom-purple sm:text-9xl leading-tight">
              SPN DAO
            </h1>
            <h4 className="text-md sm:text-3xl mb-16">
              {activeChoice === UserType.EndUser
                ? "Your data is more valuable than you think"
                : "Be the shepherd for a vibrant data economy"}
            </h4>
          </div>
        )}
        {isMissingAdminToken ? (
          <JoinSubText amber>
            <RiErrorWarningFill className="text-2xl sm:text-xl mr-2" /> Admin
            NFT is not detected. Please check your wallet again.
          </JoinSubText>
        ) : (
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
        )}
        <div className="w-stretch my-12 mx-6 sm:mx-14 lg:mx-20 2xl:mx-28 min-h-80 hero pb-8">
          {justBurned ? (
            <h2 className="text-2xl px-4 sm:text-4xl pt-12">
              Don&apos;t miss the benefit you can get with SPN DAO
            </h2>
          ) : null}
          <div className="flex flex-row flex-wrap justify-around mb-10">
            {activeChoice === UserType.EndUser ? (
              <>
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
              </>
            ) : (
              <>
                <HeroSection
                  title="Access Valuable Data"
                  subtitle="Access valuable data crowd-sourced by DAO members"
                />
                <HeroSection
                  title="Reward DAO members"
                  subtitle="Reward DAO members for their contribution to the data economy"
                />
                <HeroSection
                  title="Protect data Privacy"
                  subtitle="Get behavioral insights without compromising data privacy"
                />
              </>
            )}
          </div>
          <div className="m-auto w-fit">
            {hasJustBurned ? (
              <>
                <h4 className="text-zinc-600 mb-4 text-xl">
                  Change your mind?
                </h4>
                <Button onClick={() => setHasJustBurned(false)} btnSize="px-20">
                  Re-join SPN DAO
                </Button>
              </>
            ) : isMissingAdminToken ? (
              <Button
                onClick={() => {
                  setActiveChoice(UserType.DaoAdmin);
                  setIsMissingAdminToken(false);
                }}
                btnSize="px-20"
              >
                Connect Wallet
              </Button>
            ) : (isLoading || address) && !wrongNetwork ? (
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
};

export default Home;
