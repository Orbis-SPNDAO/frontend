import { useRouter } from "next/router";
import { FC } from "react";

import useIsMounted from "../hooks/useIsMounted";

import { useMMContext } from "../context/MMProvider";
import { abbrevAccount } from "../utils";

type HeaderProps = {
  type?: string;
};

const Header: FC<HeaderProps> = ({}) => {
  const mm = useMMContext().mmContext;
  const router = useRouter();
  const isMounted = useIsMounted();

  return (
    <div className="min-h-full">
      <div className="container mx-auto px-6 flex items-center h-20 text-gray-600">
        <div className="flex items-center justify-between w-full">
          <button
            className="font-medium text-4xl flex text-custom-purple items-center justify-center"
            onClick={() => router.push("/")}
          >
            <h2>Pattern DAO</h2>
          </button>

          <div className="flex items-center space-x-6 z-50">
            {!isMounted ? null : mm.status == "connected" ? (
              <button
                className="font-medium text-md rounded-xl border-solid border-slate-300 border text-black py-2 px-6 max-w-xs"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                {abbrevAccount(mm.account!)}
              </button>
            ) : (
              <button
                className="text-bold text-md rounded-xl text-custom-purple border-2 border-gray-100 py-2 px-6"
                onClick={mm.connect}
              >
                Sign in with wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
