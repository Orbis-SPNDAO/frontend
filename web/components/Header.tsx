import { useRouter } from "next/router";
import { FC } from "react";

import useIsMounted from "../hooks/useIsMounted";

import { ConnectButton } from "@rainbow-me/rainbowkit";

type HeaderProps = {
  type?: string;
};

const Header: FC<HeaderProps> = ({}) => {
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
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
