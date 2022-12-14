import { FC, ReactNode } from "react";

export const MembershipSection: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <div className="bg-white border border-slate-300 flex-1 shrink-0 rounded-md m-1.5 md:m-5 p-1.5 md:p-3 md:rounded-xl flex items-center justify-center">{children}</div>;
};
