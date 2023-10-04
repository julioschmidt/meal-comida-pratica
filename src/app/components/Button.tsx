import React, { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  text: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  text,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button className={`${className}`} onClick={onClick} type={`${type}`}>
      {text}
    </button>
  );
}
