import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  labelClassName,
  inputClassName,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={rest.id} className={labelClassName + " text-sm pb-1.5"}>
          {label}
        </label>
      )}
      <input {...rest} className={inputClassName + " leading-tight"} />
    </div>
  );
};

export default Input;
