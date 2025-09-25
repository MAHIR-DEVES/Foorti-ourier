'use client';
import { useState } from 'react';
import { FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';

const TrackingParcel = () => {
  const [query, setQuery] = useState('');
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  console.log(parcel);

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
                  Tracking ID: {parcel?.data?.tracking_id}
                </p>

                {/* Customer Info */}
                <div className="space-y-2 text-xl">
                  <p>
                    Name: <span>{parcel?.data?.customer_name}</span>
                  </p>
                  <p>
                    Address: <span>{parcel?.data?.customer_address}</span>
                  </p>
                  <p>
                    Area: <span>{parcel?.data?.area}</span>
                  </p>
                  <p>
                    District: <span>{parcel?.data?.district}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    Phone Number: <span>{parcel?.data?.customer_phone}</span>
                    <button className="button-primary cursor-pointer text-white px-2 py-1 rounded flex items-center">
                      <FaPhoneAlt className="mr-1" /> Call
                    </button>
                  </p>
                </div>
              </div>

              <div className="text-right text-xl">
                <p>
                  Created at:{' '}
                  {parcel?.data?.user?.created_at
                    ? new Date(
                        parcel?.data?.user?.created_at.replace(' ', 'T')
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
                  Weight: <span>{parcel?.data?.weight}</span>
                </p>
                <p>
                  Cod: <span>{parcel?.data?.cod}</span>
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4" />

            {/* Item Description Table */}
            <div className="mt-6 border border-gray-300 rounded">
              <div className="bg-gray-100 text-xl p-2">
                Note: <br /> {parcel?.data?.remarks}{' '}
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
                      {[...parcel?.order_status]
                        .sort((a, b) => new Date(b.date) - new Date(a.date)) // DESC (latest first)
                        .map((update, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between relative"
                          >
                            {/* Date - Left Side */}
                            <div className="text-right w-2/5 ">
                              <p className="text-sm text-gray-700">
                                {new Date(update.date).toLocaleTimeString(
                                  'en-GB'
                                )}
                                <span className="mr-3"></span>

                                {new Date(update.date).toLocaleDateString(
                                  'en-GB'
                                )}
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
                              <p className="text-sm text-gray-800">
                                {update.name}
                              </p>
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
      )}
    </div>
  );
};

export default TrackingParcel;
