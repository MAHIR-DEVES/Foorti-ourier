"use client";
import { useState } from "react";

const Tab = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleNext = () => {
    if (activeTab < 3) {
      setActiveTab(activeTab + 1);
    }
  };

  const handleBack = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div className="p-2 md:p-8">
      <div className="mb-4 flex items-center gap-5 justify-center">
        <ul className="flex items-center">
          {["Address", "Pickup Point", "Support"].map((tab, index) => (
            <li
              key={tab}
              className={`${
                activeTab === index + 1 &&
                "border-gray text-primary-active capitalize font-medium !bg-transparent"
              } px-6 py-2 border-t bg-[#d1d1d1] text-primary transition duration-300 border-transparent cursor-pointer`}
              onClick={() => setActiveTab(index + 1)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="bg-primary p-6 border border-gray rounded">
        {activeTab === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-primary">Name *</label>
              <input
                className="w-full border px-3 py-2 rounded outline-none border-gray"
                placeholder="Type recipient name"
              />
            </div>
            <div>
              <label className="block font-medium">Phone Number *</label>
              <input
                className="w-full border px-3 py-2 rounded  outline-none border-gray"
                placeholder="Type Phone Number"
              />
            </div>
            <div>
              <label className="block font-medium">
                Alternative Phone Number (Optional)
              </label>
              <input
                className="w-full border px-3 py-2 rounded  outline-none border-gray"
                placeholder="Type Phone Number"
              />
            </div>
            <div>
              <label className="block font-medium">District</label>
              <input
                className="w-full border px-3 py-2 rounded  outline-none border-gray"
                value="Dhaka City"
                readOnly
              />
            </div>
            <div>
              <label className="block font-medium">Thana</label>
              <input className="w-full border px-3 py-2 rounded  outline-none border-gray" />
            </div>
            <div>
              <label className="block font-medium">Address</label>
              <textarea
                className="w-full border px-3 py-2 rounded  outline-none border-gray"
                placeholder="Type Address"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button className="text-red-500 cursor-pointer">Cancel</button>
              <button
                onClick={handleNext}
                className="button-primary cursor-pointer px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <p className="mb-4 font-medium">Pickup Point Form</p>

            <div className="flex justify-between">
              <button onClick={handleBack} className="text-red-500">
                Back
              </button>
              <button
                onClick={handleNext}
                className="button-primary cursor-pointer px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div>
            <p className="mb-4 font-medium">Support Content</p>

            <div className="flex justify-between">
              <button onClick={handleBack} className="text-red-500">
                Back
              </button>
              <button className="button-primary cursor-pointer px-4 py-2 rounded">
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
