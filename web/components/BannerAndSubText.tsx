import { FC } from "react";

const BannerAndSubText: FC<{ subtext: string }> = ({ subtext }) => {
  return (
    <div>
      <h1 className="text-6xl text-custom-purple sm:text-9xl leading-tight">
        SPN DAO
      </h1>
      <h4 className="text-md sm:text-3xl mb-16">{subtext}</h4>
    </div>
  );
};

export default BannerAndSubText;
