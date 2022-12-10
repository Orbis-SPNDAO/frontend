import { FC } from "react";

export const SplashStep: FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="py-2 font-normal text-md md:text-xl text-left text-neutral-800">
      <span className="text-custom-purple text-lg md:text-4xl font-medium">{title}</span>
      {" "+ subtitle}
    </div>
  );
};
