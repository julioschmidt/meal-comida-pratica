import React, { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  text: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ text, onClick, className }: ButtonProps) {
  return (
    <button className={`${className}`} onClick={onClick}>
      {text}
    </button>
  );
}
