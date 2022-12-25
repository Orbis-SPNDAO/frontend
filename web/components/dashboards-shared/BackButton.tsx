import { useRouter } from "next/router";
import { FC } from "react";
import { BsChevronLeft } from "react-icons/bs";

const BackButton: FC<{
  backRoute?: string;
  onBackRoute?: Function;
  text?: string;
}> = ({ backRoute, onBackRoute, text }) => {
  const router = useRouter();
  return (
    <button
      className="flex items-center font-normal text-sm md:text-base hover:text-custom-purple"
      onClick={() => {
        if (onBackRoute && typeof onBackRoute === "function") {
          return onBackRoute();
        }

        router.push(backRoute ?? "/dashboard");
      }}
    >
      <BsChevronLeft className="w-5 h-5 mr-1" />
      {text ? text : "Back to dashboard"}
    </button>
  );
};

export default BackButton;
