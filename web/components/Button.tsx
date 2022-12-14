import React, { FC } from "react";

export enum ButtonTypes {
  Button = "button",
  Submit = "submit",
  React = "reset",
}

export enum ButtonStyle {
  Fill = "fill",
  Outline = "outline",
  HiddenError = "hidden-error",
  ErrorOutline= 'error-outline',
  Error='error'
}

type ButtonProps = {
  type?: ButtonTypes;
  btnSize?: string;
  padding?: string;
  buttonStyle?: ButtonStyle;
  addClassName?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<ButtonProps> = ({
  btnSize,
  addClassName = "",
  buttonStyle,
  padding,
  children,
  ...props
}) => {
  let buttonStyleClassName = "";
  switch (buttonStyle) {
    case ButtonStyle.Outline:
      buttonStyleClassName =
        "bg-white text-custom-purple border border-slate-300 hover:bg-gray-100 focus:ring-gray-300 disabled:bg-slate-100 disabled:text-slate-500";
      break;

    case ButtonStyle.HiddenError:
      buttonStyleClassName =
        "bg-white text-custom-purple border border-slate-300 hover:text-white hover:border-error-red hover:bg-error-red focus:ring-transparent disabled:bg-slate-100 disabled:text-slate-500";
      break;

    case ButtonStyle.ErrorOutline:
      buttonStyleClassName =
        "bg-white text-white border border-slate-300 border-error-red bg-error-red focus:ring-transparent disabled:bg-slate-100 disabled:text-slate-500";
      break;

    case ButtonStyle.Error:
      buttonStyleClassName =
        "bg-white text-error-red border border-slate-300 hover:text-white hover:border-error-red hover:bg-error-red focus:ring-transparent disabled:bg-slate-100 disabled:text-slate-500";
      break;

    default:
      buttonStyleClassName =
        "text-white bg-custom-purple hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-500";
      break;
  }

  return (
    <button
      {...props}
      className={`${btnSize ?? "w-full"} ${
        padding ?? "py-3 px-4"
      } flex justify-center items-center text-sm md:text-lg font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonStyleClassName} ${addClassName}`}
    >
      {children}
    </button>
  );
};

export default Button;
