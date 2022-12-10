import React, { FC } from "react";

export enum ButtonTypes {
  Button = "button",
  Submit = "submit",
  React = "reset",
}
type ButtonProps = {
  type?: ButtonTypes;
  btnSize?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<ButtonProps> = ({ btnSize, children, ...props }) => {
  return (
    <button
      {...props}
      className={`group relative ${
        btnSize ?? "w-full"
      }  flex justify-center items-center py-3 px-4 border border-transparent text-sm md:text-lg font-medium rounded-xl text-white bg-custom-purple hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-500`}
    >
      {children}
    </button>
  );
};

export default Button;
