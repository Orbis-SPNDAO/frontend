import { FC, ReactNode } from "react";

const Subtitle: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="mt-4 max-w-3xl m-auto">{children}</div>;
};

export default Subtitle;
