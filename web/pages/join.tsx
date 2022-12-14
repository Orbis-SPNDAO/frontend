import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { FaDatabase } from "react-icons/fa";
import { useAccount, useContractWrite } from "wagmi";
import { SBT_ABI } from "../abis/currentABI";
import Button from "../components/Button";
import { JoinSubText } from "../components/join/JoinSubText";
import PageLayout from "../components/layouts/PageLayout";
import { ProgressStepsDot } from "../components/join/ProgressStepsDot";
import { SocialsFooter } from "../components/SocialsFooter";
import Spinner from "../components/Spinner";
import { SplashStep } from "../components/join/SplashStep";
import { UploadBox } from "../components/join/UploadBox";
var crypto = require("crypto");

enum JoinState {
  Start = "start",
  PromptUpload = "prompt-upload",
  UploadingCsv = "uploading-csv",
  UploadFailure = "upload-failure",
  MintToken = "mint-token",
  MintSuccess = "mint-success",
  MintFailure = "mint-failure",
}

let cid = "";

export default function Join() {
  // const { data: signer } = useSigner();
  // const contract = useContract({
  //   address: process.env.NEXT_PUBLIC_SBT_ADDR,
  //   abi: SBT_ABI,
  //   signerOrProvider: signer,
  // });
  const { write } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    abi: SBT_ABI,
    functionName: "safeMint",
    // overrides: {
    //     maxFeePerGas: ethers.utils.parseEther('1'),
    //     maxPriorityFeePerGas: ethers.utils.parseEther('1')
    // }
  });
  const { address } = useAccount();
  const router = useRouter();
  const [consentChecked, setConsentChecked] = useState(false);

  const [joinState, setJoinState] = useState<JoinState>(JoinState.Start);

  const fileRef = useRef<HTMLInputElement | null>();

  // loads file client side so server can see it
  const uploadToClient = async (event: any) => {
    const file = event.target.files[0];

    uploadToServer(file);
  };

  function clickFileInput() {
    fileRef?.current?.click();
  }

  const uploadToServer = async (file: File) => {
    setJoinState(JoinState.UploadingCsv);

    try {
      const file_id = crypto.randomBytes(20).toString("hex");

      const path = JSON.stringify({ path: `./public/uploads/${file_id}.csv` });

      const body = new FormData();
      body.append("file", file);
      body.append("id", file_id);

      fetch("/api/saveFile", { method: "POST", body }).then(() => {
        fetch("/api/ipfs", { method: "POST", body: path })
          .then((res) => res.json())
          .then((new_cid) => {
            cid = new_cid;
          })
          .then(() => {
            fetch("/api/cleanup", { method: "POST", body: path });
          });
      });

      setJoinState(JoinState.MintToken);
    } catch (e: any) {
      console.error(
        `An error occurred during uploading the file: ${e.message}`
      );
      setJoinState(JoinState.UploadFailure);
    }
  };

  async function onMintToken() {
    // FOR TESTING
    if (!write || !address) {
      console.log("no contract, address, or signer");
      return;
    } else if (cid == undefined || cid == "") {
      console.log("invalid cid");
      return;
    }

    try {
      write({ recklesslySetUnpreparedArgs: [address, cid] });
      setJoinState(JoinState.MintSuccess);
    } catch (e) {
      console.log(e);
      setJoinState(JoinState.MintFailure);
    }
  }

  function onViewDashboard() {
    router.push("/dashboard");
  }

  function showTitle() {
    let title = null;
    switch (joinState) {
      case JoinState.PromptUpload:
        title = "Upload a CSV file";
        break;
      case JoinState.UploadingCsv:
        title = "Uploading to IPFS...";
        break;
      case JoinState.UploadFailure:
      case JoinState.MintFailure:
        title = (
          <>
            <p>We&apos;re really sorry.</p>
            <p>An error occurred, please refresh the page and try again.</p>
          </>
        );
        break;
      case JoinState.MintToken:
        title = "Upload successful! Mint your token now";
        break;
      case JoinState.MintSuccess:
        title = "Token mint successful";
        break;
      default:
        break;
    }

    return title;
  }

  function showContent() {
    let content = null;

    switch (joinState) {
      case JoinState.PromptUpload:
        content = (
          <>
            <JoinSubText amber>
              Please remove all sensitive personal identifiable information. See
              the list{" "}
              <a
                href="https://www.investopedia.com/terms/p/personally-identifiable-information-pii.asp#:~:text=Key%20Takeaways%201%20Personally%20identifiable%20information%20%28PII%29%20uses,license%2C%20financial%20information%2C%20and%20medical%20records.%20More%20items"
                target="blank"
                className="underline text-blue-500"
              >
                here
              </a>
              .
            </JoinSubText>

            <UploadBox>
              <button
                className="mx-auto flex flex-col items-center rounded-xl"
                onClick={() => {
                  clickFileInput();
                }}
              >
                <div className="text-blue-500 text-bold text-5xl ">
                  <BiUpload />
                </div>

                <p>
                  <span className="text-blue-500 text-bold">Browse</span> your
                  files
                </p>
              </button>

              <input
                ref={(ref) => (fileRef.current = ref)}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={uploadToClient}
              />
            </UploadBox>
          </>
        );
        break;
      case JoinState.UploadingCsv:
        content = (
          <>
            <JoinSubText>
              Your file will be encrypted immediately, and will be uploaded to
              and stored on decentralized storage provided by IPFS.
            </JoinSubText>
            <div className="mx-auto w-1/2 mt-24 py-24 px-8 py-2 border-2 border-dashed border-gray-500 rounded-xl bg-white">
              <div className="mx-auto flex flex-col items-center rounded-xl">
                <Spinner />

                <p className="mt-4">This may take a while...</p>
                <p>Please do not close your browser</p>
              </div>
            </div>
          </>
        );
        break;
      case JoinState.UploadFailure:
      case JoinState.MintFailure:
        break;
      case JoinState.MintToken:
        content = (
          <>
            <JoinSubText>
              Only authorized parties such as DAO admins can decrypt and access
              your data. You will be rewarded with Matic whenever your data is
              decrypted and processed.
            </JoinSubText>
            <UploadBox solid>
              <div className="flex flex-col items-center mx-auto w-full">
                <div className="text-gray-500 bg-black rounded-full p-6 w-fit text-bold text-5xl border-2 border-white mb-5 icon-shadow">
                  <FaDatabase size="45" />
                </div>
                <p className="mb-9 font-normal text-zinc-600 text-sm md:text-lg">
                  The token is free to mint but you will pay a small gas fee in
                  Matic
                </p>
                <Button
                  btnSize="w-3/4 md:w-80 h-12"
                  className="bg-custom-purple text-white flex items-center text-xl rounded-xl mt-2 px-16"
                  onClick={() => onMintToken()}
                >
                  Mint token
                </Button>
              </div>
            </UploadBox>
          </>
        );
        break;
      case JoinState.MintSuccess:
        content = (
          <>
            <JoinSubText>
              You can always burn the token in the personal dashboard if you
              wish to exit from the DAO and stop sharing your encrypted data.
            </JoinSubText>
            <div className="flex flex-col items-center mx-auto mt-18 py-8 md:py-24 px-8">
              <span className="text-md mr-40 mb-4">
                <Image
                  src="/assets/success-star.svg"
                  alt="success"
                  height="18"
                  width="18"
                />
              </span>

              <div className="flex ml-6">
                <span className="text-lg mt-40">
                  <Image
                    src="/assets/success-star.svg"
                    alt="success"
                    height="29"
                    width="29"
                  />
                </span>
                <div className="text-white border-8 border-blue-600 mint-success-gradient rounded-full p-10 text-bold text-8xl">
                  <BsCheckLg />
                </div>
                <span className="text-lg">
                  <Image
                    src="/assets/success-star.svg"
                    alt="success"
                    height="37"
                    width="37"
                  />
                </span>
                <span className="text-sm mt-16">
                  <Image
                    src="/assets/success-star.svg"
                    alt="success"
                    height="18"
                    width="18"
                  />
                </span>
              </div>

              <button
                className="bg-custom-purple text-white text-bold text-xl rounded-xl mt-12 md:mt-24 px-16 py-2"
                onClick={() => onViewDashboard()}
              >
                View in dashboard
              </button>
            </div>
            <SocialsFooter />
          </>
        );
        break;

      default:
        break;
    }

    return content;
  }

  return (
    <PageLayout containerClassName="bg-custom-blue bg-cover min-h-screen">
      <div className="text-center my-5 md:my-10 w-full">
        {joinState == JoinState.Start ? (
          <>
            <h4 className="text-slate-600 font-normal">
              Not a SPN DAO member yet?
            </h4>
            <div className="w-stretch m-5 md:mx-28 md:my-12 h-fit py-6 px-4 md:p-10 hero">
              <h1 className="text-xl md:text-3xl">
                <span className="text-2xl md:text-4xl">Join the party 🥳</span>{" "}
                <br></br>for true ownership and monetization of your data
              </h1>
              <div className="mt-3 md:mt-6 m-auto w-fit flex flex-col items-start justify-start">
                <SplashStep
                  title="1. Upload & Encrypt"
                  subtitle="credit card transactions"
                />
                <SplashStep
                  title="2. Mint"
                  subtitle="a non-transferrable DAO membership token"
                />
                <SplashStep
                  title="3. Get rewards"
                  subtitle="for decrypted data"
                />
              </div>
              <div className="my-4 flex flex-row font-normal items-center w-fit m-auto">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  value="consent"
                  className="w-3 h-3 md:w-4 md:h-4"
                  onChange={(event) => {
                    setConsentChecked(event.target.checked);
                  }}
                />
                <label
                  htmlFor="consent"
                  className="ml-2 text-neutral-900 text-sm md:text-md"
                >
                  By checking the box, I agree to SPN DAO&apos;s <a>Terms of Use</a> and <a>Privacy Policy</a>. 
                </label>
              </div>
              <Button
                btnSize="w-3/4 md:w-96 m-auto"
                disabled={!consentChecked}
                onClick={() => {
                  if (consentChecked) {
                    setJoinState(JoinState.PromptUpload);
                  }
                }}
              >
                Join SPN DAO
              </Button>
              <h3 className="mt-6 font-normal text-zinc-500 max-w-3xl m-auto text-xs md:text-lg">
                Your data will be temporarily stored on a cloud server and then
                encrypted and uploaded to IPFS. The resulting IPFS link will be
                encrypted and immutable, and the data on the cloud server will
                be deleted.
              </h3>
            </div>
            <SocialsFooter />
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-4xl leading-tight mx-4">
              {showTitle()}
            </h1>
            {showContent()}
            {joinState != JoinState.MintFailure &&
            joinState != JoinState.MintSuccess ? (
              <>
                <div className="w-4/5 md:w-3/5 mt-8 md:mt-24 m-auto flex flex-row justify-between font-normal text-neutral-800">
                  <h5 className="w-24 text-xs md:text-xl indent-2 text-start">
                    Upload
                  </h5>
                  <h5 className="w-40 text-xs md:text-xl">Encrypt & Store</h5>
                  <h5 className="w-40 text-xs md:text-xl">Mint SBT</h5>
                  <h5 className="w-24 text-xs md:text-xl text-end">Complete</h5>
                </div>
                <div className="mx-6 md:mx-12 w-stretch">
                  <div className="w-4/5 md:w-3/5 h-3 bg-zinc-300 rounded-full m-auto mt-4 flex flex-row justify-between items-center relative">
                    <div
                      className={classNames(
                        "absolute bg-blue-500 h-full object-left rounded-full z-10 transition-width duration-300",
                        {
                          "w-0": joinState == JoinState.PromptUpload,
                          "w-1/3": joinState == JoinState.UploadingCsv,
                          "w-2/3": joinState == JoinState.MintToken,
                        }
                      )}
                    ></div>
                    <ProgressStepsDot
                      status={
                        joinState == JoinState.PromptUpload
                          ? "empty"
                          : joinState == JoinState.UploadingCsv
                          ? "blue"
                          : "checked"
                      }
                    />
                    <ProgressStepsDot
                      status={
                        joinState == JoinState.PromptUpload
                          ? "empty"
                          : joinState == JoinState.UploadingCsv
                          ? "blue"
                          : "checked"
                      }
                    />
                    <ProgressStepsDot
                      status={
                        joinState == JoinState.MintToken ? "blue" : "empty"
                      }
                    />
                    <ProgressStepsDot status="empty" />
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </PageLayout>
  );
}
