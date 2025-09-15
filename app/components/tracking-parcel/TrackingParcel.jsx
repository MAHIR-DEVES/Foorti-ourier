'use client';
import { useState } from 'react';

const TrackingParcel = () => {
  const [query, setQuery] = useState('');
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setParcel(null);
    setError('');

    try {
      const stored = localStorage.getItem('token');
      const token = stored ? JSON.parse(stored).token : null;

      const res = await fetch(
        `https://admin.merchantfcservice.com/api/order-view?tracking_id=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log('PARCEL DATA:', data);

      setParcel(data);
    } catch (err) {
      console.error('Error fetching parcel:', err);
      setError(
        '❌ Failed to fetch parcel. Please check your tracking ID and try again.'
      );
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // Get status color based on status value
  const getStatusColor = status => {
    if (!status) return 'bg-gray-100 text-gray-800';

    const statusLower = status.toLowerCase();
    if (statusLower.includes('deliver')) return 'bg-green-100 text-green-800';
    if (statusLower.includes('transit') || statusLower.includes('process'))
      return 'bg-blue-100 text-blue-800';
    if (statusLower.includes('fail') || statusLower.includes('cancel'))
      return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  // Format date for display
  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
        Track Your Consignment
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Enter your tracking ID to get real-time updates on your shipment
      </p>

      {/* Search Bar */}
      <div className="flex mb-10">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Enter your tracking ID here..."
          className="flex-grow px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#00b795] focus:border-transparent"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="button-primary text-white px-6 py-3 rounded-r-md transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {parcel && (
        <div className="space-y-6">
          {/* Company Information */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              style={{ backgroundColor: 'var(--active-color)' }}
              className="p-4 text-white"
            >
              <h3 className="text-xl font-semibold">Company Information</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex">
                <span className="text-gray-600 w-40 font-medium">
                  Company Name:
                </span>
                <span>{parcel.company?.name || 'N/A'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-40 font-medium">
                  Company Initial:
                </span>
                <span>{parcel.company?.company_initial || 'N/A'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-40 font-medium">Email:</span>
                <span>{parcel.company?.email || 'N/A'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-40 font-medium">Mobile:</span>
                <span>{parcel.company?.mobile || 'N/A'}</span>
              </div>
              <div className="flex md:col-span-2">
                <span className="text-gray-600 w-40 font-medium">Address:</span>
                <span>{parcel.company?.address || 'N/A'}</span>
              </div>
              <div className="flex md:col-span-2">
                <span className="text-gray-600 w-40 font-medium">Website:</span>
                <span className="text-blue-600 hover:underline">
                  <a
                    href={parcel.company?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {parcel.company?.website || 'N/A'}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Parcel Information */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              style={{ backgroundColor: 'var(--active-color)' }}
              className=" p-4 text-white"
            >
              <h3 className="text-xl font-semibold">Parcel Information</h3>
              <p className="text-blue-100">
                Tracking ID: {parcel.data?.tracking_id || 'N/A'}
              </p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3 border-b pb-2">
                  Customer Information
                </h4>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-600 w-32">Name:</span>
                    <span className="font-medium">
                      {parcel.data?.customer_name || 'N/A'}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Phone:</span>
                    <span className="font-medium">
                      {parcel.data?.customer_phone || 'N/A'}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Email:</span>
                    <span className="font-medium">
                      {parcel.data?.customer_email || 'N/A'}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Address:</span>
                    <span className="font-medium">
                      {parcel.data?.customer_address || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-3 border-b pb-2">
                  Shipment Details
                </h4>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-600 w-32">Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        parcel.data?.status
                      )}`}
                    >
                      {parcel.data?.status || 'N/A'}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">COD Amount:</span>
                    <span className="font-medium">
                      {parcel.data?.collection || 'N/A'} ৳
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Weight:</span>
                    <span className="font-medium">
                      {parcel.data?.weight || 'N/A'}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Category:</span>
                    <span className="font-medium">
                      {parcel.data?.category || 'N/A'}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Type:</span>
                    <span className="font-medium">
                      {parcel.data?.type || 'N/A'}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Merchant:</span>
                    <span className="font-medium">
                      {parcel.data?.merchant || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-700 mb-3 border-b pb-2">
                  Additional Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex">
                    <span className="text-gray-600 w-40">Area:</span>
                    <span>{parcel.data?.area || 'N/A'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">District:</span>
                    <span>{parcel.data?.district || 'N/A'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">Created At:</span>
                    <span>{formatDate(parcel.data?.created_at)}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-40">Updated At:</span>
                    <span>{formatDate(parcel.data?.updated_at)}</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-700 mb-2">Remarks</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800">
                    {parcel.data?.remarks || 'No remarks available'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          {parcel.order_history && parcel.order_history.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                style={{ backgroundColor: 'var(--active-color)' }}
                className=" p-4 text-white"
              >
                <h3 className="text-xl font-semibold">Order History</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mobile
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {parcel.order_history.map((history, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatDate(history.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {history.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {history.mobile}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                history.status
                              )}`}
                            >
                              {history.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Order Status */}
          {parcel.order_status && parcel.order_status.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                style={{ backgroundColor: 'var(--active-color)' }}
                className="p-4 text-white"
              >
                <h3 className="text-xl font-semibold">Current Status</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Delivery Note
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {parcel.order_status.map((status, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatDate(status.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {status.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                status.status
                              )}`}
                            >
                              {status.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {status.delivery_note || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackingParcel;
