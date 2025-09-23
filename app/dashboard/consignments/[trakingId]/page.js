'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const ConsignmentPage = () => {
  const params = useParams();
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusColor = status => {
    switch (status) {
      case 'Order Placed':
        return 'bg-blue-100 text-blue-800';
      case 'In Transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const stored = localStorage.getItem('token');
        const token = stored ? JSON.parse(stored).token : null;
        const res = await fetch(
          `https://admin.merchantfcservice.com/api/order-view?tracking_id=${params.trakingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) throw new Error('Failed to fetch order');
        const data = await res.json();
        setParcel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.trakingId]);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error)
    return <p className="p-4 text-center text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="bg-white w-full h-full overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 flex justify-between items-center">
          <span>
            <h2 className="text-2xl font-bold">Parcel Details</h2>
            <p className="text-blue-100 mt-1">
              Tracking ID:{' '}
              <span className="font-mono">{parcel?.data?.tracking_id}</span>
            </p>
          </span>
          <span className="font-medium ">
            <h1 className="text-2xl">Merchant Name </h1>
            <h1 className="text-xl"> {parcel?.data?.customer_name || 'N/A'}</h1>
          </span>
        </div>

        <div className="p-6 space-y-6 w-full">
          {/* Customer & Shipment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {/* Customer Card */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                Customer Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-gray-800">
                    {parcel?.data?.customer_name || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-800">
                    {parcel?.data?.customer_phone || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-gray-800">
                    {parcel?.data?.customer_email || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipment Card */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                Shipment Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      parcel?.data?.status
                    )}`}
                  >
                    {parcel?.data?.status || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">COD Amount:</span>
                  <span className="font-medium text-gray-800">
                    {parcel?.data?.collection || '0'} ৳
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium text-gray-800">
                    {parcel?.data?.weight || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-800">
                    {parcel?.data?.category || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Delivery Address
            </h3>
            <p className="text-gray-700 bg-white p-3 rounded-md border border-gray-200">
              {parcel?.data?.customer_address || 'N/A'}
            </p>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="flex justify-between">
                <span className="text-gray-600">Merchant:</span>
                <span className="font-medium text-gray-800">
                  {parcel?.data?.merchant || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium text-gray-800">
                  {parcel?.data?.type || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Area:</span>
                <span className="font-medium text-gray-800">
                  {parcel?.data?.area || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">District:</span>
                <span className="font-medium text-gray-800">
                  {parcel?.data?.district || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Remarks */}
          {parcel?.data?.remarks && (
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Remarks
              </h3>
              <p className="text-gray-700 bg-white p-3 rounded-md border border-gray-200">
                {parcel.data.remarks}
              </p>
            </div>
          )}

          {/* Order History */}
          {parcel?.order_history?.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order History
              </h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Mobile
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parcel.order_history.map((h, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3">
                          {h?.date
                            ? new Date(h.date.replace(' ', 'T')).toLocaleString(
                                'en-GB',
                                {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                  hour12: true,
                                }
                              )
                            : '-'}
                        </td>

                        <td className="px-4 py-3">{h.name || 'N/A'}</td>
                        <td className="px-4 py-3">{h.mobile || 'N/A'}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              h.status
                            )}`}
                          >
                            {h.status || 'N/A'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsignmentPage;
