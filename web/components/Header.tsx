import { useRouter } from "next/router";
import { FC } from "react";

import useIsMounted from "../hooks/useIsMounted";

import { ConnectButton } from "@rainbow-me/rainbowkit";

type HeaderProps = {
  hideLogo?: boolean;
};

const Header: FC<HeaderProps> = ({ hideLogo }) => {
  const router = useRouter();

  return (
    <div className="min-h-full pt-4 w-stretch">
      <div className="mx-20 flex items-center h-20 text-gray-600">
        <div className="flex items-center justify-between w-full">
          {!hideLogo ? (
            <button
              className="font-medium text-4xl flex text-custom-purple items-center justify-center"
              onClick={() => router.push("/")}
            >
              <h2>SPN DAO</h2>
            </button>
          ) : null}

          <div className="flex items-center space-x-6 ml-auto">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
