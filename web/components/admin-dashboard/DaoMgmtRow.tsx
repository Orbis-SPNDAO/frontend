import { FC } from "react";
import { DaoManagementData } from "../dashboard/dummydata";

const DaoMgmtRow: FC<{ data: DaoManagementData; hideBorder?: boolean }> = ({
  data: { walletAddress, sessionPayment, isDecrypted },
  hideBorder,
}) => {
  return (
    <div
      className={`w-stretch font-normal flex py-6 px-2 ${
        !hideBorder ? "border-b border-zinc-300" : "rounded-b-lg"
      } bg-white`}
    >
      <div className="w-3/5 pl-2 text-xl whitespace-nowrap">
        <input type="checkbox" className="mr-2"></input>
        {walletAddress}
      </div>
      <div className="w-1/5 pl-2 text-xl">{sessionPayment}</div>
      <div className="w-1/5 pl-2 text-xl">{isDecrypted ? "true" : "false"}</div>
    </div>
  );
};

export default DaoMgmtRow;
