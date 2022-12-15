import { useRouter } from "next/router";
import { FC } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

type HeaderProps = {
  hideLogo?: boolean;
  hideButton?: boolean;
};

const Header: FC<HeaderProps> = ({ hideLogo, hideButton }) => {
  const router = useRouter();

  return (
    <div className="min-h-full pt-4 w-stretch">
      <div className="mx-6 md:mx-20 flex items-center h-20 text-gray-600">
        <div className="flex items-center justify-between w-full">
          {!hideLogo ? (
            <button
              className="font-medium text-2xl md:text-4xl flex text-custom-purple items-center justify-center"
              onClick={() => router.push("/")}
            >
              <h2>SPN DAO</h2>
            </button>
          ) : null}

          {!hideButton ? <div className="flex items-center space-x-6 ml-auto">
            <ConnectButton />
          </div> : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
