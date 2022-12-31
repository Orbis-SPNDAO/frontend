import LitJsSdk from "@lit-protocol/sdk-browser";
import { ethers } from "ethers";
import { FC, useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useAccount, useContract, useSigner } from "wagmi";
import { ADMIN_ABI, SBT_ABI } from "../../abis/currentABI";
import DaoMgmtRow from "../../components/admin-dashboard/DaoMgmtRow";
import Button, { ButtonStyle } from "../../components/Button";
import { DaoManagementData } from "../../components/dashboard/dummydata";
import BackButton from "../../components/dashboards-shared/BackButton";
import PageLayout from "../../components/layouts/PageLayout";
import downloadBlob from "../../utils/downloadBlob";

enum DataSelectType {
  All = "all",
  Undecrypted = "undecrypted",
  Decrypted = "decrypted",
}

const DataManagement: FC = () => {
  const [activeTab, setActiveTab] = useState<DataSelectType>(
    DataSelectType.All
  );
  const [daoMgmtData, setDaoMgmtData] = useState<DaoManagementData[]>([]);
  const [filteredDaoMgmtData, setFilteredDaoMgmtData] = useState<
    DaoManagementData[]
  >([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [numSelected, setNumSelected] = useState(0);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState<{
    numDecrypted: number;
    totalPayment: number;
  } | null>(null);

  const { data: signer } = useSigner();
  const endUserContract = useContract({
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    abi: SBT_ABI,
    signerOrProvider: signer,
  });
  const adminContract = useContract({
    address: process.env.NEXT_PUBLIC_ADMIN_ADDR,
    abi: ADMIN_ABI,
    signerOrProvider: signer,
  });
  const { address } = useAccount();

  useEffect(() => {
    (async () => {
      if (signer && endUserContract && adminContract && address) {
        const endUserNftData = await endUserContract.fetchNfts();
        const endUserHolderData = await endUserContract.fetchHolders();
        const newDaoMgmtData: DaoManagementData[] = [];
        for (let i = 0; i < endUserNftData.length; i++) {
          if (endUserNftData[i].encryptedCid && endUserHolderData[i]) {
            newDaoMgmtData.push({
              ...endUserNftData[i],
              walletAddress: endUserHolderData[i],
              selected: false,
              tokenId: i + 1,
              sessionPayment: 0.01,
            });
          }
        }
        setDaoMgmtData(newDaoMgmtData);
      }
    })();
  }, [signer, endUserContract, adminContract, address]);

  useEffect(() => {
    const newFilteredDaoMgmtData = daoMgmtData.filter((datum) => {
      return (
        activeTab === DataSelectType.All ||
        (activeTab === DataSelectType.Decrypted && datum.isDecrypted) ||
        (activeTab === DataSelectType.Undecrypted && !datum.isDecrypted)
      );
    });
    setFilteredDaoMgmtData(newFilteredDaoMgmtData);
  }, [daoMgmtData, activeTab]);

  const submit = async () => {
    if (adminContract) {
      setIsLoading(true);
      const tokenIds = filteredDaoMgmtData.reduce((a, c) => {
        if (c.selected) return [...a, c.tokenId];
        else return a;
      }, [] as number[]);
      const submitReceipt = await adminContract.decrypt(tokenIds, {
        value: ethers.utils.parseEther(
          (0.01 * tokenIds.length + 0.001).toString()
        ),
      });
      setIsSuccess(true);
      setIsLoading(false);
      const txn = await submitReceipt.wait();
      const decryptData: string[] = [];
      txn.events
        .filter((event: any) => event.event === "SendingKey")
        .forEach((event: any) => {
          const tokenId = parseInt(event.args.tokenId);
          decryptData[tokenId] = event.args.key;
        });
      for (let i = 0; i < filteredDaoMgmtData.length; i++) {
        if (filteredDaoMgmtData[i].selected) {
          const decryptKey = decryptData[filteredDaoMgmtData[i].tokenId];
          try {
            const symmetricKey = LitJsSdk.uint8arrayFromString(
              decryptKey,
              "base64"
            );
            const importedSymmKey = await LitJsSdk.importSymmetricKey(
              symmetricKey
            );
            const encryptedCidBlob = await LitJsSdk.base64StringToBlob(
              filteredDaoMgmtData[i].encryptedCid
            );
            const decryptedCidBlob = await LitJsSdk.decryptFile({
              file: encryptedCidBlob,
              symmetricKey,
            });
            const decryptedCid = new TextDecoder("utf-8").decode(
              decryptedCidBlob
            );

            const res = await fetch("/api/generateToken", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ cids: [decryptedCid] }),
            });
            const { accessToken } = await res.json();
            const fileRes = await fetch(
              `https://patterndao.mypinata.cloud/ipfs/${decryptedCid}?accessToken=${accessToken}`
            );

            const encryptedFileString = await fileRes.text();

            const encryptedFile = await LitJsSdk.base64StringToBlob(
              encryptedFileString
            );
            const decryptedFile = await LitJsSdk.decryptWithSymmetricKey(
              encryptedFile,
              importedSymmKey
            );
            downloadBlob(new Blob([decryptedFile], { type: "text/csv" }));
          } catch (err) {
            console.log({ err });
            throw err;
          }
        }
      }

      setSuccessMsg({ numDecrypted: numSelected, totalPayment });
      setIsSuccess(false);
      setAllChecked(false);
      setIsDecrypting(false);
    }
  };

  const setRowChecked = (i: number, isChecked: boolean) => {
    if (isChecked) {
      setTotalPayment(totalPayment + daoMgmtData[i].sessionPayment);
      setNumSelected(numSelected + 1);
    } else {
      setTotalPayment(totalPayment - daoMgmtData[i].sessionPayment);
      setNumSelected(numSelected - 1);
    }
    const newDaoMgmtData = JSON.parse(JSON.stringify(daoMgmtData));
    newDaoMgmtData[i].selected = isChecked;
    setDaoMgmtData(newDaoMgmtData);
  };

  const decryptSingleRow = (i: number) => {
    const newDaoMgmtData = daoMgmtData.map((datum) => {
      datum.selected = false;
      return datum;
    });
    newDaoMgmtData[i].selected = true;
    setDaoMgmtData(newDaoMgmtData);
    setNumSelected(1);
    setTotalPayment(newDaoMgmtData[i].sessionPayment);
    setIsDecrypting(true);
  };

  const setAllChecked = (isChecked: boolean) => {
    setNumSelected(isChecked ? daoMgmtData.length : 0);
    let newTotalPayment = 0;
    const newDaoMgmtData = daoMgmtData.map((datum) => {
      if (isChecked) newTotalPayment += datum.sessionPayment;
      return {
        ...datum,
        selected: isChecked,
      };
    });
    setTotalPayment(newTotalPayment);
    setDaoMgmtData(newDaoMgmtData);
  };

  return (
    <PageLayout
      isAdmin
      hideHeaderMargin
      containerClassName="bg-custom-blue min-h-screen overflow-hidden px-2 sm:px-4 sm:px-8 md:px-20 relative"
    >
      {isDecrypting ? (
        <div
          onClick={() => setIsDecrypting(false)}
          onScroll={(e) => e.preventDefault()}
          className="bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0 fixed z-1 backdrop-blur-md flex items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-4/5 h-fit sm:w-1/2 md:w-1/3 bg-white m-auto rounded-2xl shadow-lg flex flex-col items-center p-8"
          >
            <div className="flex w-full justify-center relative mb-4">
              <span className="text-2xl font-semibold">Decrypt data</span>
              <button
                className="absolute right-0 top-1"
                onClick={() => setIsDecrypting(false)}
              >
                <RxCross2 size={24} className="text-slate-500" />
              </button>
            </div>
            <div className="flex justify-between w-full my-2 font-normal">
              <span>Data sets #</span>
              <span className="text-neutral-400">{numSelected}</span>
            </div>
            <div className="flex justify-between w-full mt-2 mb-7 font-normal">
              <span>Total payment</span>
              <span className="text-neutral-400">{`${totalPayment.toPrecision(
                4
              )} Matic`}</span>
            </div>
            {isLoading || isSuccess ? (
              <Button disabled>
                {isLoading
                  ? "Waiting for approval..."
                  : "Posting to blockchain..."}
              </Button>
            ) : (
              <div className="flex justify-between w-full gap-5">
                <Button
                  buttonStyle={ButtonStyle.Outline}
                  btnSize="w-1/2"
                  onClick={() => setIsDecrypting(false)}
                >
                  Cancel
                </Button>
                <Button
                  buttonStyle={ButtonStyle.Fill}
                  btnSize="w-1/2"
                  onClick={submit}
                >
                  Confirm
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
      <div className="hero w-full mt-8 bg-white p-2 sm:p-6">
        <BackButton backRoute="/admin-dashboard" />
        {successMsg ? (
          <div className="mx-auto w-fit bg-custom-green border border-custom-green-2 p-3 rounded-xl text-custom-green-2 flex mb-7">
            <BsFillCheckCircleFill className="mt-1 mr-3" />
            <div>
              <h4>{`Successfully decrypted ${successMsg.numDecrypted} data set${
                successMsg.numDecrypted > 1 ? "s" : ""
              }`}</h4>
              <span className="font-normal text-sm">{`Total ${successMsg.totalPayment.toPrecision(
                4
              )} paid to token holder${
                successMsg.numDecrypted > 1 ? "s" : ""
              }`}</span>
            </div>
          </div>
        ) : (
          <h1 className="mx-auto text-lg sm:text-3xl w-fit mt-1 mb-8 font-normal">
            Manage SPN DAO data
          </h1>
        )}
        <div className="flex items-center flex-wrap">
          <button
            className={`mr-6 text-xs sm:text-base ${
              activeTab === DataSelectType.All
                ? "text-custom-purple underline underline-offset-8"
                : "text-neutral-400"
            }`}
            onClick={() => setActiveTab(DataSelectType.All)}
          >
            All data
          </button>
          <button
            className={`mr-6 text-xs sm:text-base ${
              activeTab === DataSelectType.Undecrypted
                ? "text-custom-purple underline underline-offset-8"
                : "text-neutral-400"
            }`}
            onClick={() => setActiveTab(DataSelectType.Undecrypted)}
          >
            Encrypted data
          </button>
          <button
            className={`mr-6 text-xs sm:text-base ${
              activeTab === DataSelectType.Decrypted
                ? "text-custom-purple underline underline-offset-8"
                : "text-neutral-400"
            }`}
            onClick={() => setActiveTab(DataSelectType.Decrypted)}
          >
            Decrypted data
          </button>
          {totalPayment ? (
            <>
              <h4 className="ml-auto my-3 text-xs md:text-base text-neutral-400 font-normal mr-5">
                {`${totalPayment.toPrecision(4)} Matic total session payment`}
              </h4>
              <Button
                onClick={() => setIsDecrypting(true)}
                btnSize="w-fit"
                addClassName="text-xs md:text-sm"
              >{`Decrypt selected ${numSelected} data set${
                numSelected > 1 ? "s" : ""
              }`}</Button>
            </>
          ) : null}
        </div>
        <div className="w-stretch rounded-lg mt-4">
          <div className="w-stretch bg-table-header-blue text-xs sm:text-xl rounded-t-lg flex p-2 border-b border-zinc-300">
            <div className="w-3/5 px-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={!daoMgmtData.some((datum) => !datum.selected)}
                onChange={(e) => {
                  setAllChecked(e.target.checked);
                }}
              ></input>
              Holder wallet address
            </div>
            <div className="w-1/5 table-header-border px-2">
              Session payment
            </div>
            <div className="w-1/5 table-header-border px-2">Status</div>
          </div>
          {filteredDaoMgmtData.length ? (
            filteredDaoMgmtData.map((datum, i) => (
              <DaoMgmtRow
                data={datum}
                key={i}
                hideBorder={i === daoMgmtData.length - 1}
                setRowChecked={(isChecked: boolean) =>
                  setRowChecked(i, isChecked)
                }
                decrypt={() => decryptSingleRow(i)}
              />
            ))
          ) : (
            <div className="w-full flex items-center">
              <div className="my-10 mx-auto text-xl">No Data</div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default DataManagement;
