import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Calendar } from "phosphor-react";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  placeholderText?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  selectedDate,
  onDateChange,
  label,
  labelClassName,
  inputClassName,
  placeholderText,
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className={labelClassName + " text-sm pb-1.5"}>{label}</label>
      )}
      <div className={inputClassName + " flex justify-between leading-tight"}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => onDateChange(date)}
          placeholderText={placeholderText}
          dateFormat="dd/MM/yyyy"
          maxDate={new Date()}
          showYearDropdown
          scrollableYearDropdown
          className="focus:outline-none border-none"
        />
        <Calendar size={24} color="#9BA5B7" />
      </div>
    </div>
  );
};

export default DateInput;
