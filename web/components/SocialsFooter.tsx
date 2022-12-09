import Image from "next/image";
import { FC } from "react";

export const SocialsFooter: FC = () => {
  return (
    <div className="w-36 m-auto text-zinc-600 text-lg">
      <h4>Follow SPN DAO</h4>
      <div className="flex flex-row gap-4 mt-2 justify-center">
      <Image src="/assets/discord.svg" alt="Discord" width="24" height='24' />
      <Image src="/assets/twitter.svg" alt="Twitter" width="24" height='24' />
      </div>
    </div>
  );
};
