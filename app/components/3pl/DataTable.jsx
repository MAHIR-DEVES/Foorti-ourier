"use client";

import { useState } from "react";
import { IoBag } from "react-icons/io5";
import { FaTruckPickup } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const courierStats = [
  {
    logo: "https://steadfast.com.bd/landing-page/asset/images/logo/logo.svg",
    name: "SteadFast",
    order: 22,
    cancel: 0,
    success: 22,
  },
  {
    logo: "https://pathao.com/bn/wp-content/uploads/sites/6/2019/02/Pathao_Logo-.svg",
    name: "Pathao",
    order: 21,
    cancel: 1,
    success: 20,
  },
  {
    logo: "https://redx.com.bd/images/new-redx-logo.svg",
    name: "REDX",
    order: 12,
    cancel: 2,
    success: 10,
  },
  {
    logo: "https://paperfly.com.bd/wp-content/uploads/2022/09/Paperfly-Logo.svg",
    name: "Paperfly",
    order: 0,
    cancel: 0,
    success: 0,
  },
];

export default function DataTable() {
  const [mobile, setMobile] = useState("01768760476");

  return (
    <div className="p-4 max-w-5xl mx-auto bg-white">
      <div className="flex items-center gap-2 mb-4">
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full outline-none"
          placeholder="মোবাইল নাম্বার লিখুন"
        />
        <button className="button-primary text-white px-4 py-2 w-52  sm:w-44 rounded  transition">
          রিপোর্ট দেখুন
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6  font-semibold text-center">
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center  gap-8">
            <div className="bg-teal-500 p-4 text-3xl rounded-md text-white hidden sm:block">
              {" "}
              <IoBag />
            </div>
            <div>
              <div>মোট অর্ডার</div>
              <div className="text-2xl">55</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center  gap-8">
            <div className="bg-yellow-500 p-4 text-3xl rounded-md text-white hidden sm:block">
              {" "}
              <FaTruckPickup />
            </div>
            <div>
              <div>মোট ডেলিভারি</div>
              <div className="text-2xl">52</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center  gap-8">
            <div className="bg-red-600 p-4 text-3xl rounded-md text-white hidden sm:block">
              {" "}
              <IoMdClose />
            </div>
            <div>
              <div>মোট বাতিল</div>
              <div className="text-2xl">5</div>
            </div>
          </div>
        </div>
      </div>

      <div className="button-primary text-white text-center p-3 rounded mb-4">
        <div className="text-lg font-bold">94.55% | Excellent</div>
        <div className="text-sm">নিচের ডেলিভারি দেখুন</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">কুরিয়ার</th>
              <th className="py-2 px-4 border">মোট অর্ডার</th>
              <th className="py-2 px-4 border">বাতিল</th>
              <th className="py-2 px-4 border">সফল</th>
            </tr>
          </thead>
          <tbody>
            {courierStats.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="h-8 mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border">{item.order}</td>
                <td className="py-2 px-4 border">{item.cancel}</td>
                <td className="py-2 px-4 border">{item.success}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
