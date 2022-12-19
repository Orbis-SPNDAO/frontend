import { useRouter } from "next/router";
import { FC } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

type HeaderProps = {
  hideLogo?: boolean;
  hideButton?: boolean;
  isAdmin?: boolean;
  hideMargin?: boolean;
};

const Header: FC<HeaderProps> = ({
  hideLogo,
  hideButton,
  isAdmin,
  hideMargin,
}) => {
  const router = useRouter();

  return (
    <div className="min-h-full pt-4 w-stretch">
      <div
        className={`${
          hideMargin ? "" : "mx-6 md:mx-20"
        } flex items-center h-20 text-gray-600`}
      >
        <div className="flex items-center justify-between w-full">
          {!hideLogo ? (
            <button
              className="font-medium text-2xl md:text-4xl flex text-custom-purple items-center justify-center"
              onClick={() => router.push("/")}
            >
              <h2>SPN DAO</h2>
              {isAdmin ? (
                <h4 className="text-sm sm:text-xl font-normal mx-2">Admin</h4>
              ) : null}
            </button>
          ) : null}

          {!hideButton ? (
            <div className="flex items-center space-x-6 ml-auto">
              <ConnectButton />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
