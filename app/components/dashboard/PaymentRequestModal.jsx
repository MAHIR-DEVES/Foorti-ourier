"use client";
import React from "react";
import { RxCross1 } from "react-icons/rx";

const PaymentRequestModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 pt-10">
      <div className="bg-white w-[90%] sm:w-[80%] md:w-[35%] rounded-md shadow-lg relative">
        <div className="flex justify-between items-center border-b px-5 py-3">
          <h2 className="text-xl font-semibold">Payment Request</h2>
          <RxCross1
            className="cursor-pointer text-gray-600 hover:bg-gray-100 p-2 rounded-full w-8 h-8"
            onClick={onClose}
          />
        </div>

        <div className="p-5">
          <form className="flex flex-col gap-1.5">
            <label className="block mb-1 font-medium text-gray-700">
              Payment method <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                -- Select Payment Method --
              </option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="bank">Bank Transfer</option>
            </select>

            <label className="block mb-1 font-medium text-gray-700">
              Payment Processing <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value="0"
              readOnly
              className="w-full border border-gray outline-none rounded px-3 py-2 bg-gray-100"
            />

            <label className="block font-medium text-gray-700">
              Amount
              <span className="text-red-500">*</span>
              <input
                type="text"
                placeholder="Amount "
                className="w-full border border-gray outline-none rounded px-3 py-2 mt-1"
              />
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                className="bg-yellow-400 hover:bg-yellow-500 text-white cursor-pointer px-4 py-2 rounded"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="reset"
                className="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-4 py-2 rounded"
              >
                Clear
              </button>
              <button
                type="submit"
                className="button-primary text-white cursor-pointer px-4 py-2 rounded"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequestModal;
