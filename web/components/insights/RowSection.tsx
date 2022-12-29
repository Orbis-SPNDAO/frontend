import { FC } from "react";

const RowSection: FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-start">
      <h4 className="text-neutral-400 text-sm">{title}</h4>
      <h5 className="text-xl">{value}</h5>
    </div>
  );
};

export default RowSection;
