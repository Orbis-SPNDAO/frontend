import classNames from "classnames";
import { FC, ReactNode } from "react";

export const JoinSubText: FC<{ children: ReactNode; amber?: boolean }> = ({
  children,
  amber,
}) => {
  return (
    <div
      className={classNames(
        "w-3/4 md:w-1/2 m-auto text-xs md:text-lg rounded-xl p-2 mt-4",
        {
          "border border-amber-600 bg-red-50 text-amber-600": amber,
          "text-zinc-600": !amber
        }
      )}
    >
      {children}
    </div>
  );
};
