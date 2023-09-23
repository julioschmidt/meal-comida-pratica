import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  readOnly?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  labelClassName,
  inputClassName,
  readOnly,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={rest.id} className={labelClassName + " text-sm pb-1.5"}>
          {label}
        </label>
      )}
      <input
        {...rest}
        readOnly={readOnly}
        className={inputClassName + " leading-tight"}
      />
    </div>
  );
};

export default Input;
