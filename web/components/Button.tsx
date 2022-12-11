import React, { FC } from "react"

export enum ButtonTypes {
  Button = "button",
  Submit = "submit",
  React = "reset",
}

export enum ButtonStyle {
  Fill = "fill",
  Outline = "outline",
}

type ButtonProps = {
  type?: ButtonTypes
  btnSize?: string
  buttonStyle?: ButtonStyle
  addClassName?: string
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Button: FC<ButtonProps> = ({
  btnSize,
  addClassName = "",
  buttonStyle,
  children,
  ...props
}) => {
  let buttonStyleClassName = ""
  switch (buttonStyle) {
    case ButtonStyle.Outline:
      buttonStyleClassName =
        "bg-white text-custom-purple hover:bg-gray-100 focus:ring-gray-300 disabled:bg-slate-100 disabled:text-slate-500"
      break

    default:
      buttonStyleClassName =
        "text-white bg-custom-purple hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-500"
      break
  }

  return (
    <button
      {...props}
      className={`group relative ${
        btnSize ?? "w-full"
      } flex justify-center items-center py-3 px-4 border border-transparent text-sm md:text-lg font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonStyleClassName} ${addClassName}`}
    >
      {children}
    </button>
  )
}

export default Button
