'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';

const DetailsPage = () => {
  const params = useParams();
  const trackingId = params.trakingId;

  const [consignment, setConsignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(consignment);

  useEffect(() => {
    if (!trackingId) return;

    const fetchConsignment = async () => {
      try {
        const stored = localStorage.getItem('token');
        const token = stored ? JSON.parse(stored).token : null;
        const res = await fetch(
          `https://admin.merchantfcservice.com/api/order-view?tracking_id=${trackingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch consignment');
        }

        const data = await res.json();
        setConsignment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsignment();
  }, [trackingId]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  console.log(consignment.data.tracking_id);

  return (
    <div className="max-w-6xl mx-auto md:p-6">
      <div className=" md:flex justify-between items-center mb-4">
        <h2 className="text-lg "></h2>
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
            <p className="text-xl">
              Tracking ID: {consignment?.data?.tracking_id}
            </p>

            {/* Customer Info */}
            <div className="space-y-2 text-xl">
              <p>
                Name: <span>{consignment?.data?.customer_name}</span>
              </p>
              <p>
                Address: <span>{consignment?.data?.customer_address}</span>
              </p>
              <p>
                Area: <span>{consignment?.data?.area}</span>
              </p>
              <p>
                District: <span>{consignment?.data?.district}</span>
              </p>

              <p className="flex items-center gap-2">
                Phone Number: <span>{consignment?.data?.customer_phone}</span>
                <button className="button-primary cursor-pointer text-white px-2 py-1 rounded flex items-center">
                  <FaPhoneAlt className="mr-1" /> Call
                </button>
              </p>
            </div>
          </div>

          <div className="text-right text-xl">
            <p>
              Created at:{' '}
              {consignment?.data?.user?.created_at
                ? new Date(
                    consignment?.data?.user?.created_at.replace(' ', 'T')
                  ).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                  })
                : '-'}
            </p>

            <p>
              Weight: <span>{consignment?.data?.weight}</span>
            </p>
            <p>
              Cod: <span>{consignment?.data?.cod}</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Item Description Table */}
        <div className="mt-6 border border-gray-300 rounded">
          <div className="bg-gray-100 text-xl p-2">
            Note: <br /> {consignment?.data?.remarks}{' '}
          </div>

          {/* Tracking Updates */}
          <div className="mt-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg mb-6 px-4 text-center">
                Tracking Updates
              </h3>

              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>

                <div className="space-y-16 pb-8">
                  {[...consignment?.order_status]
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // DESC (latest first)
                    .map((update, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between relative"
                      >
                        {/* Date - Left Side */}
                        <div className="text-right w-2/5 ">
                          <p className="text-sm text-gray-700">
                            {new Date(update.date).toLocaleTimeString('en-GB')}
                            <span className="mr-3"></span>

                            {new Date(update.date).toLocaleDateString('en-GB')}
                          </p>
                        </div>

                        {/* Icon - Middle */}
                        <div className="relative flex-shrink-0">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index === 0
                                ? 'bg-green-500 ring-4 ring-green-100'
                                : 'bg-green-400'
                            }`}
                          >
                            <FaCheckCircle className="text-white text-sm" />
                          </div>
                        </div>

                        {/* Status - Right Side */}
                        <div className="text-left w-2/5 pl-6">
                          <p className="text-sm text-gray-800">
                            {update.status}
                          </p>
                          <p className="text-sm text-gray-800">{update.name}</p>
                          <p className="text-sm text-gray-800">
                            {update.mobile}
                          </p>
                          <p className="text-sm text-gray-800">
                            {update.delivery_note}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
