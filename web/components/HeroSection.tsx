import { FC } from "react";

export const HeroSection: FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="w-1/3 py-12">
      <h3 className="text-3xl text-neutral-800">{title}</h3>
      <h5 className="text-xl text-zinc-500">{subtitle}</h5>
    </div>
  );
};
