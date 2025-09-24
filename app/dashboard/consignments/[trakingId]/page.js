import React from 'react';
import { FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';

const page = () => {
  const trackingUpdates = [
    {
      date: 'Apr 24, 2025',
      time: '11:45 am',
      message: 'Consignment has been listed for reversed back.',
    },
    {
      date: 'Apr 21, 2025',
      time: '3:41 pm',
      message: 'Consignment has been received at BURICHANG (CUMILLA).',
    },
    {
      date: 'Apr 20, 2025',
      time: '01:27 am',
      message: 'Consignment sent to BURICHANG (CUMILLA). Dispatch ID: 523488',
    },
    {
      date: 'Apr 17, 2025',
      time: '10:12 am',
      message: 'Consignment has been received at CUMILLA WAREHOUSE.',
    },
    {
      date: 'Apr 16, 2025',
      time: '11:45 pm',
      message: 'Consignment sent to CUMILLA WAREHOUSE. Dispatch ID: 5228488',
    },
  ];
  return (
    <div className="max-w-6xl mx-auto md:p-6">
      <div className=" md:flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold"></h2>
        <div className="flex flex-wrap justify-end gap-2 pt-1.5 md:pt-0">
          <button className="button-primary cursor-pointer text-white px-3 py-1 rounded">
            Open Support Ticket
          </button>
          <button className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded">
            Invoice
          </button>
          <button className="bg-indigo-500 cursor-pointer text-white px-3 py-1 rounded">
            Label
          </button>
          {/* <button className="bg-gray-700 cursor-pointer text-white px-3 py-1 rounded">
            Edit
          </button> */}
        </div>
      </div>
      <div className=" bg-white p-6 rounded-md">
        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-bold">Tracking ID: 31816966</p>{' '}
            {/* Customer Info */}
            <p>Invoice: N/A</p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong>
              </p>
              <p>
                <strong>Address:</strong>
              </p>
              <p>
                <strong>Area:</strong>
              </p>
              <p>
                <strong>District:</strong>
              </p>
              <p className="flex items-center gap-2">
                <strong>Phone Number:</strong>
                <button className="button-primary cursor-pointer text-white px-2 py-1 rounded flex items-center text-xs">
                  <FaPhoneAlt className="mr-1" /> Call
                </button>
              </p>
            </div>
          </div>

          <div className="text-right">
            <p>
              <strong>Created at:</strong> April 13, 2025 03:59 PM
            </p>

            <p>
              <strong>Weight:</strong>
            </p>

            <p className="text-red-600 text-lg font-bold">COD: ৳1150</p>
            {/* <div className="mt-2 flex flex-wrap justify-end gap-2">
              <span className="bg-red-600 cursor-pointer text-white text-xs px-2 py-1 rounded">
                Cancelled
              </span>
              <span className="bg-yellow-500 cursor-pointer text-white text-xs px-2 py-1 rounded">
                Cancel Request
              </span>
              <span className="bg-blue-600 cursor-pointer text-white text-xs px-2 py-1 rounded">
                Acknowledged
              </span>
            </div> */}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Item Description Table */}
        <div className="mt-6 border border-gray-300 rounded">
          <div className="text-center">
            <div className="bg-gray-100 text-sm font-semibold p-2">Note</div>
            <div className="bg-gray-100 text-sm font-semibold p-2 mt-3"></div>
          </div>

          {/* Tracking Updates */}
          <div className="mt-8">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-4 px-4 text-center">
                Tracking Updates
              </h3>
              <div className="space-y-4 pb-8">
                {trackingUpdates.map((update, index) => (
                  <div key={index} className="flex items-start gap-4 text-sm">
                    <div className="text-primary-active text-right min-w-[110px]">
                      <p></p>
                      <p className="text-xs">{update.time}</p>
                    </div>
                    <div className="pt-1">
                      <FaCheckCircle className="text-blue-500 mt-0.5" />
                    </div>
                    <div className="text-gray-700"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
