import { FC, ReactNode } from "react";

const Subtitle: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="mt-4 max-w-2xl m-auto font-normal text-zinc-600">{children}</div>;
};

export default Subtitle;
