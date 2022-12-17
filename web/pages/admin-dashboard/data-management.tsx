import { FC, useState } from "react";
import DaoMgmtRow from "../../components/admin-dashboard/DaoMgmtRow";
import { dummyDaoMgmtData } from "../../components/dashboard/dummydata";
import BackButton from "../../components/dashboards-shared/BackButton";
import PageLayout from "../../components/layouts/PageLayout";

enum DataSelectType {
  All = "all",
  Undecrypted = "undecrypted",
  Decrypted = "decrypted",
}

const DataManagement: FC = () => {
  const [activeTab, setActiveTab] = useState<DataSelectType>(
    DataSelectType.All
  );

  const [daoMgmtData, setDaoMgmtData] = useState(dummyDaoMgmtData);

  const setRowChecked = (i: number, isChecked: boolean) => {
    const newDaoMgmtData = daoMgmtData;
    newDaoMgmtData[i].selected = isChecked;
    setDaoMgmtData(newDaoMgmtData);
  };

  return (
    <PageLayout isAdmin containerClassName="bg-custom-blue min-h-screen">
      <div className="hero min-h-fit w-full mt-8 bg-white mx-4 sm:mx-8 md:mx-20 p-6">
        <BackButton backRoute="/admin-dashboard" />
        <h1 className="mx-auto text-3xl w-fit mt-1 mb-8 font-normal">
          Manage SPN DAO data
        </h1>
        <div>
          <button
            className={`mr-6 ${
              activeTab === DataSelectType.All
                ? "text-custom-purple underline underline-offset-8"
                : "text-neutral-400"
            }`}
            onClick={() => setActiveTab(DataSelectType.All)}
          >
            All data
          </button>
          <button
            className={`mr-6 ${
              activeTab === DataSelectType.Undecrypted
                ? "text-custom-purple underline underline-offset-8"
                : "text-neutral-400"
            }`}
            onClick={() => setActiveTab(DataSelectType.Undecrypted)}
          >
            Undecrypted data
          </button>
          <button
            className={`mr-6 ${
              activeTab === DataSelectType.Decrypted
                ? "text-custom-purple underline underline-offset-8"
                : "text-neutral-400"
            }`}
            onClick={() => setActiveTab(DataSelectType.Decrypted)}
          >
            Decrypted data
          </button>
        </div>
        <div className="w-stretch rounded-lg mt-4">
          <div className="w-stretch bg-table-header-blue rounded-t-lg flex p-2 border-b border-zinc-300">
            <div className="w-3/5 pl-2 text-xl">
              <input type="checkbox" className="mr-2"></input>Holder wallet
              address
            </div>
            <div className="w-1/5 table-header-border pl-2 text-xl">
              Session payment
            </div>
            <div className="w-1/5 table-header-border pl-2 text-xl">Status</div>
          </div>
          {daoMgmtData.map((datum, i) => (
            <DaoMgmtRow
              data={datum}
              key={i}
              hideBorder={i === daoMgmtData.length - 1}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default DataManagement;
