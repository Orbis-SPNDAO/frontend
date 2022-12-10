import { FC, ReactNode } from "react";

const Subtitle: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="mt-4 w-3/4 md:max-w-2xl m-auto text-xl font-normal text-zinc-600">{children}</div>;
};

export default Subtitle;
