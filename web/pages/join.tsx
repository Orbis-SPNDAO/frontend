import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { AiFillDatabase, AiFillStar } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { IoIosCheckmark } from "react-icons/io";
import useIsMounted from "../hooks/useIsMounted";
import PageLayout from "../components/layouts/PageLayout";
import Spinner from "../components/Spinner";
import { useEthersContext } from "../context/EthersProvider";
import { useMMContext } from "../context/MMProvider";
import { SBT_ABI } from "../abis/currentABI";
import Subtitle from "../components/Subtitle";
var crypto = require("crypto");

enum JoinState {
  Start = "start",
  UploadingCsv = "uploading-csv",
  UploadFailure = "upload-failure",
  MintToken = "mint-token",
  MintSuccess = "mint-success",
  MintFailure = "mint-failure",
}

let cid = "";

export default function Join() {
  const mm = useMMContext().mmContext;
  const provider = useEthersContext()
    .ethersContext as ethers.providers.Web3Provider;
  const router = useRouter();
  const isMounted = useIsMounted();

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
          // .then( () => {
          //   console.log(cid);
          // })
          .then(() => {
            fetch("/api/cleanup", { method: "POST", body: path });
          });
      });

      setJoinState(JoinState.MintToken);
    } catch (e: any) {
      console.error(`An error occured during uploading the file: ${e.message}`);
      setJoinState(JoinState.UploadFailure);
    }
  };

  async function onMintToken() {
    // FOR TESTING
    if (provider == undefined) {
      console.log("no provider");
      return;
    } else if (cid == undefined || cid == "") {
      console.log("invalid cid");
      return;
    }

    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const PatternDAO = new ethers.Contract(
        process.env.NEXT_PUBLIC_SBT_ADDR!,
        SBT_ABI as ethers.ContractInterface,
        signer
      );

      await PatternDAO.safeMint(mm.account!, cid);
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
      case JoinState.Start:
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
      case JoinState.Start:
        content = (
          <>
            <Subtitle>
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
            </Subtitle>

            <div className="mx-auto w-1/2 mt-24 py-24 px-8 py-2 border-2 border-dashed border-gray-500 rounded-xl bg-white">
              <button
                className="mx-auto flex flex-col items-center rounded-xl"
                onClick={() => {
                  clickFileInput();
                }}
              >
                <div className="text-violet-600 text-bold text-5xl ">
                  <BiUpload />
                </div>

                <p>
                  <span className="text-violet-600 text-bold">Browse</span> your
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
            </div>
          </>
        );
        break;
      case JoinState.UploadingCsv:
        content = (
          <>
            <Subtitle>
              Your file will be encrypted immediately, and will be uploaded to
              and stored on decentralized storage provided by IPFS.
            </Subtitle>
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
          <div className="flex flex-col items-center mx-auto mt-24 py-24 px-8">
            <div className="text-gray-500 bg-black rounded-full py-4 px-4 text-bold text-5xl ">
              <AiFillDatabase />
            </div>

            <button
              className="bg-violet-600 text-white text-bold text-xl rounded-xl mt-24 px-16 py-2"
              onClick={() => onMintToken()}
            >
              Mint token
            </button>
          </div>
        );
        break;
      case JoinState.MintSuccess:
        content = (
          <div className="flex flex-col items-center mx-auto mt-18 py-24 px-8">
            <span className="text-md mr-10 text-red-500">
              <AiFillStar />
            </span>

            <div className="flex">
              <span className="text-lg mt-20 text-red-500">
                <AiFillStar />
              </span>
              <div className="text-white border-4 border-blue-600 bg-gradient-to-br from-violet-700 via-red-500 to-red-200 rounded-full py-1 px-1 text-bold text-8xl">
                <IoIosCheckmark />
              </div>
              <span className="text-lg mt-2 text-red-500">
                <AiFillStar />
              </span>
              <span className="text-sm mt-10 text-red-500">
                <AiFillStar />
              </span>
            </div>

            <button
              className="bg-violet-600 text-white text-bold text-xl rounded-xl mt-24 px-16 py-2"
              onClick={() => onViewDashboard()}
            >
              View in dashboard
            </button>
          </div>
        );
        break;

      default:
        break;
    }

    return content;
  }

  return (
    <PageLayout containerClassName="bg-custom-blue bg-cover min-h-screen">
      <div className="text-center mt-32 w-full">
        {!isMounted ? null : mm.status != "connected" ? (
          <h1 className="font-bold text-4xl leading-tight">Please sign in</h1>
        ) : (
          <>
            <h1 className="font-bold text-4xl leading-tight">{showTitle()}</h1>
            {showContent()}
          </>
        )}
      </div>
    </PageLayout>
  );
}
