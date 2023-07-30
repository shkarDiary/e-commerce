"use client";
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size: "md" | "sm" | "lg";
  color: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      className={`
        inline-flex
        justify-center
        align-items-center
        cursor-pointer
        rounded-md
        text-white
        font-semibold
        ${props.color === "primary" ? "bg-primary" : "bg-secondary"}
        ${
          props.size === "sm"
            ? "px-3 py-2"
            : props.size === "md"
            ? "px-4 py-3"
            : "px-10 py-4 text-xl"
        }
        ${props.disabled && "bg-gray-600"}
      `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
