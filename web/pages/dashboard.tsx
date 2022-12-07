import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import PageLayout from "../components/layouts/PageLayout";
import UserDashData from "../components/UserDashData";

export default function Home() {
  const router = useRouter();
  const { isConnecting, address } = useAccount();

  return (
    <>
      {!address || isConnecting ? (
        <PageLayout containerClassName="w-full bg-cover min-h-screen">
          <div className="text-center mt-20 min-w-full">
            <h1 className="font-bold text-custom-purple text-3xl leading-tight">
              Please Sign In To View Dashboard
            </h1>
          </div>
        </PageLayout>
      ) : (
        <PageLayout containerClassName="w-full min-h-screen bg-cover">
          <div className="text-center w-full mt-20">
            <h1 className="font-bold text-custom-purple text-6xl leading-tight">
              Dashboard
            </h1>
            <button
              className="block mx-auto bg-custom-purple text-white text-bold text-xl rounded-xl mt-5 px-16 py-2"
              onClick={() => router.push("/join")}
            >
              Mint
            </button>
            <div className="text-center mt-20">
              <UserDashData />
            </div>
          </div>
        </PageLayout>
      )}
    </>
  );
}
