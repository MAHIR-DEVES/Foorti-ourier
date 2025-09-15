"use client";
import  { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";

const DatePick = () => {
  const [startDate, setStartDate] = useState(() => new Date());
  const dateRef = useRef(null);

  return (
    <div className="text-center md:flex justify-between items-center md:p-4 rounded-md">
      <h1 className="text-2xl font-bold text-primary mb-5">
        Password & Security
      </h1>

      <div className="flex items-center justify-between md:justify-start gap-2">
        <div className="flex items-center border border-gray rounded px-3 py-1 bg-primary relative">
          <span className="text-secondary mr-2">📅</span>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd MMM yyyy"
            className="text-sm text-primary bg-transparent focus:outline-none w-[140px] cursor-pointer"
            ref={dateRef}
            popperPlacement="bottom-start"
          />

          <RiArrowDropDownLine
            className="text-2xl text-gray-600 cursor-pointer"
            onClick={() => dateRef.current.setFocus()}
          />
        </div>

       <Link href="/dashboard/products-list">
        <button className="button-primary font-medium cursor-pointer text-sm px-4 py-2 rounded">
          Add Product
        </button>
       </Link>
      </div>
    </div>
  );
};

export default DatePick;
