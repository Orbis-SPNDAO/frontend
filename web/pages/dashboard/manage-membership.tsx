import { add } from "lodash";
import { useRouter } from "next/router";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import { RxCaretLeft, RxCross2 } from "react-icons/rx";
import { useAccount, useContract, useContractWrite, useSigner } from "wagmi";
import { SBT_ABI } from "../../abis/currentABI";
import Button, { ButtonStyle } from "../../components/Button";
import { MembershipSection } from "../../components/dashboard/membership/MembershipSection";
import { SignInPrompt } from "../../components/dashboard/SignInPrompt";
import BackButton from "../../components/dashboards-shared/BackButton";
import PageLayout from "../../components/layouts/PageLayout";
import { SocialsFooter } from "../../components/SocialsFooter";

export default function ManageMembership() {
  const router = useRouter();
  const { address, isConnecting } = useAccount();
  const [tokenId, setTokenId] = useState<number | null>(null);
  const { data: signer } = useSigner();
  const contract = useContract({
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    abi: SBT_ABI,
    signerOrProvider: signer,
  });
  const { write, isLoading, isSuccess } = useContractWrite({
    abi: SBT_ABI,
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    functionName: "userBurn",
    mode: "recklesslyUnprepared",
  });

  useEffect(() => {
    (async () => {
      if (contract && address && signer && router) {
        const scopedTokenId = await contract
          .ownerToTokenId(address)
          .then(parseInt);
        if (scopedTokenId) setTokenId(scopedTokenId);
        else router.push("/join");
      }
    })();
  }, [contract, address, signer, router]);
  useEffect(() => {
    if (isSuccess) router.push("/come-back");
  }, [isSuccess, router]);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  async function burnToken() {
    if (contract && signer && write && typeof tokenId === "number") {
      write({ recklesslySetUnpreparedArgs: [tokenId] });
    }
  }

  return (
    <PageLayout containerClassName="bg-custom-blue bg-cover min-h-screen font-normal relative">
      {!address || isConnecting ? (
        <SignInPrompt />
      ) : (
        <>
          {confirmModalOpen ? (
            <div
              onClick={() => setConfirmModalOpen(false)}
              className="bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0 absolute z-1 backdrop-blur-md flex items-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-4/5 h-fit sm:w-1/2 md:w-1/3 bg-white m-auto rounded-2xl shadow-lg flex flex-col items-center p-8"
              >
                <div className="flex w-full justify-center relative">
                  <span className="text-2xl font-semibold">Are you sure?</span>
                  <button
                    className="absolute right-0 top-1"
                    onClick={() => setConfirmModalOpen(false)}
                  >
                    <RxCross2 size={24} className="text-slate-500" />
                  </button>
                </div>
                <span className="my-6 text-base">
                  If you burn your soul-bound token, you will lose your DAO
                  membership and stop sharing your data. You will also stop
                  receiving rewards.
                </span>
                {isLoading || isSuccess ? (
                  <Button disabled>Waiting for approval...</Button>
                ) : (
                  <div className="flex justify-between w-full gap-5">
                    <Button
                      buttonStyle={ButtonStyle.Error}
                      btnSize="w-1/2"
                      onClick={() => setConfirmModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      buttonStyle={ButtonStyle.ErrorOutline}
                      btnSize="w-1/2"
                      onClick={() => burnToken()}
                    >
                      Burn Anyway
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
          <div className="h-full w-full flex flex-col">
            <div className="text-center m-5 md:my-10 md:mx-20 2xl:mx-auto max-w-7xl p-3 md:p-6 w-stretch 2xl:w-full hero">
              <div className="flex justify-between items-center mb-4 w-stretch">
                <BackButton />
                <Button
                  buttonStyle={ButtonStyle.HiddenError}
                  btnSize="w-fit"
                  addClassName="px-3 md:px-12 md:text-sm"
                  padding="md:px-12 py-2.5"
                  onClick={() => setConfirmModalOpen(true)}
                >
                  Burn SBT Token
                </Button>
              </div>
              <span className="font-normal md:text-3xl">
                Manage SPN DAO membership token
              </span>
              <div className="flex flex-col w-stretch my-4 flex-wrap">
                <div className="flex w-stretch flex-wrap">
                  <MembershipSection>
                    <div className="flex flex-col m-1">
                      <div className="flex items-center">
                        <span className="text-2xl md:text-6xl">1.27</span>{" "}
                        <span className="text-sm md:text-xl text-neutral-600">
                          Matic
                        </span>
                      </div>
                      <div className="text-neutral-600 text-md md:text-2xl">
                        Rewards
                      </div>
                    </div>
                  </MembershipSection>
                  <MembershipSection>
                    <div className="flex flex-col m-1">
                      <span className="text-2xl md:text-6xl">5</span>{" "}
                      <div className="text-neutral-600 text-md md:text-2xl">
                        Decryption Sessions
                      </div>
                    </div>
                  </MembershipSection>
                </div>
                <div className="flex w-stretch flex-wrap">
                  <MembershipSection>
                    <div className="flex flex-col m-1">
                      <span className="text-xl md:text-4xl">{tokenId}</span>{" "}
                      <div className="text-neutral-600 text-md md:text-2xl">
                        Token ID
                      </div>
                    </div>
                  </MembershipSection>
                  <MembershipSection>
                    <div className="flex flex-col m-1">
                      <span className="text-xl md:text-4xl">
                        <Tooltip
                          placement="top"
                          trigger={["click", "hover"]}
                          overlay={
                            <div className="flex items-center">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    process.env.NEXT_PUBLIC_SBT_ADDR!
                                  );
                                }}
                              >
                                <MdContentCopy className="mr-1" size={16} />
                              </button>
                              <span>{process.env.NEXT_PUBLIC_SBT_ADDR}</span>
                            </div>
                          }
                          showArrow={true}
                          overlayStyle={{ width: "fit-content" }}
                          overlayInnerStyle={{
                            backgroundColor: "black",
                            borderRadius: "4px",
                            borderColor: "black",
                            color: "white",
                            fontWeight: "400",
                          }}
                        >
                          <a href="#">
                            {process.env.NEXT_PUBLIC_SBT_ADDR?.slice(0, 6) +
                              "..." +
                              process.env.NEXT_PUBLIC_SBT_ADDR?.slice(-6)}
                          </a>
                        </Tooltip>
                      </span>
                      <div className="text-neutral-600 text-md md:text-2xl">
                        SBT Contract
                      </div>
                    </div>
                  </MembershipSection>
                </div>
              </div>
            </div>
            <SocialsFooter addClasses="mt-4" />
          </div>
        </>
      )}
    </PageLayout>
  );
}
