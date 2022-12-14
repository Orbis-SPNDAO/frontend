import classNames from "classnames";
import { FC } from "react";
import { BsCheckLg } from "react-icons/bs";

export const ProgressStepsDot: FC<{
  status?: "empty" | "blue" | "checked";
}> = ({ status }) => {
  return (
    <div
      className={classNames("rounded-full flex items-center justify-center border-2 h-5 w-5 z-20", {
        "bg-white border-blue-500": status === "blue",
        "bg-white border-neutral-400": status === "empty",
        "bg-blue-500 border-white": status === "checked",
      })}
    >
      {status === 'checked' ? (<BsCheckLg size='10' className="mt-0.5 text-white"/>) : null}
    </div>
  );
};
