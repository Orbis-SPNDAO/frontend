import Image from "next/image";
import { FC } from "react";
import Button from "../Button";
import { DaoManagementData } from "../dashboard/dummydata";

const DaoMgmtRow: FC<{
  data: DaoManagementData;
  hideBorder?: boolean;
  setRowChecked: Function;
  decrypt: Function;
}> = ({
  data: { walletAddress, sessionPayment, isDecrypted, selected },
  hideBorder,
  setRowChecked,
  decrypt,
}) => {
  return (
    <div
      className={`w-stretch font-normal flex text-xs items-center sm:text-xl py-4 px-2 ${
        !hideBorder ? "border-b border-zinc-300" : "rounded-b-lg"
      } bg-white hover:bg-custom-blue`}
    >
      <div className="w-3/5 pl-2 flex">
        <input
          type="checkbox"
          className="mr-2"
          checked={selected}
          onChange={(e) => {
            setRowChecked(e.target.checked);
          }}
        ></input>
        <span className="overflow-hidden whitespace-nowrap truncate">
          {walletAddress}
        </span>
      </div>
      <div className="w-1/5 pl-2">{sessionPayment}</div>
      {isDecrypted ? (
        <div className="w-1/5 pl-3 flex gap-3 items-center">
          <Image
            src="/assets/unlock.svg"
            width={20}
            height={20}
            alt="decrypted"
          />
          <span className="overflow-hidden truncate py-2">Decrypted</span>
        </div>
      ) : (
        <div className="w-1/5 pl-3 flex gap-3 items-center hover-decrypt-container">
          <Image
            src="/assets/lock.svg"
            width={20}
            height={20}
            alt="encrypted"
            className="block"
          />
          <span className="overflow-hidden truncate block py-2">Encrypted</span>
          <Button
            addClassName="text-xs md:text-sm hidden"
            btnSize="w-11/12"
            padding="py-3"
            onClick={() => decrypt()}
          >
            Decrypt
          </Button>
        </div>
      )}
    </div>
  );
};

export default DaoMgmtRow;
