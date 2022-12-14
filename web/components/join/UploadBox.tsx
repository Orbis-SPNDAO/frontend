import classNames from "classnames";
import { FC, ReactNode } from "react";

export const UploadBox: FC<{ solid?: boolean; children: ReactNode }> = ({
  solid,
  children,
}) => {
  return (
    <div
      className={classNames(
        "mx-auto w-4/5 md:w-1/2 mt-8 md:mt-24 h-80 px-8 py-2 rounded-xl flex items-center bg-white hero",
        { "border-2 border-gray-400 border-dashed": !solid }
      )}
    >
      {children}
    </div>
  );
};
