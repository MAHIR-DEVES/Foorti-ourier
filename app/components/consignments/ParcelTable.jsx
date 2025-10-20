'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import Loading from '@/app/loading';
import { Calendar } from 'lucide-react';

const tabs = [
  { label: 'All', value: 'All' },
  { label: 'List by Date', value: 'List by Date' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Approval Pending', value: 'Approval Pending' },
  { label: 'Delivered', value: 'Delivered' },
  { label: 'Partially Delivered', value: 'Partially Delivered' },
  { label: 'Cancelled', value: 'Cancelled' },
  { label: 'Payment', value: 'Payment' },
];

const statusMapping = {
  Pending: [
    'Pending',
    'Reschedule Order',
    'Rescheduled',
    'Assigned To Delivery Rider',
  ],
  'Approval Pending': [
    'Assigned Pickup Rider',
    'Order Placed',
    'Pickup Done',
    'Received by Pickup Branch',
    'Transfer Assign for Fulfillment',
    'Transfer Reach To Fullfilment',
    'Received By Fullfilment',
    'Transfer Assign for Branch',
    'Transfer Reach To Branch',
    'Received By Destination Hub',
  ],
  Delivered: [
    'Successfully Delivered',
    'Delivered Amount Collected from Branch',
    'Delivered Amount Send to Fulfillment',
    'Payment Processing',
    'Payment Processing Complete',
    'Payment Completed',
  ],
  'Partially Delivered': ['Partially Delivered'],
  Cancelled: [
    'Return Confirm',
    'Cancel Order',
    'Return Reach To Merchant',
    'Assigned Rider For Return',
    'Return Received By Destination Hub',
    'Return To Merchant',
  ],
  All: [],
};

// helper function: group by date
const groupByDate = orders => {
  return orders.reduce((acc, order) => {
    if (!order?.order_create_date) return acc;
    const dateKey = order.order_create_date.split(' ')[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(order);
    return acc;
  }, {});
};

const ParcelTable = () => {
  const searchParams = useSearchParams();
  const queryStatus = searchParams.get('status') || 'All';

  const [activeTab, setActiveTab] = useState(queryStatus);
  const [orders, setOrders] = useState([]);
  const [payments, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [paginationGroup, setPaginationGroup] = useState(1);
  const [expandedDates, setExpandedDates] = useState({});

  // fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const stored = localStorage.getItem('token');
        if (!stored) return;
        const parsed = JSON.parse(stored);
        const token = parsed?.token;
        if (!token) return;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MERCHANT_API_KEY}/confirm-orders-list`,
          { method: 'GET', headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) throw new Error('Failed to fetch orders');

        const data = await response.json();
        setOrders(data.confirmed_order_list || []);
      } catch (err) {
        console.error('API Error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // fetch payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const stored = localStorage.getItem('token');
        if (!stored) return;
        const parsed = JSON.parse(stored);
        const token = parsed?.token;
        if (!token) return;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MERCHANT_API_KEY}/merchant-payment-history`,
          { method: 'GET', headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) throw new Error('Failed to fetch payments');

        const data = await response.json();
        setPayment(data.payments || []);
      } catch (err) {
        console.error('API Error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  useEffect(() => {
    setActiveTab(queryStatus);
    setCurrentPage(1);
    setPaginationGroup(1);
  }, [queryStatus]);

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'All' || activeTab === 'List by Date') return true;
    const allowedStatuses = statusMapping[activeTab] || [];
    return allowedStatuses.includes(order.status);
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePreviousPageGroup = () => {
    if (paginationGroup > 1) {
      setPaginationGroup(paginationGroup - 1);
      setCurrentPage((paginationGroup - 2) * 5 + 1);
    }
  };

  const handleNextPageGroup = () => {
    const maxGroup = Math.ceil(totalPages / 5);
    if (paginationGroup < maxGroup) {
      setPaginationGroup(paginationGroup + 1);
      setCurrentPage(paginationGroup * 5 + 1);
    }
  };

  const handlePageClick = page => setCurrentPage(page);

  const renderPageNumbers = () => {
    const pages = [];
    const start = (paginationGroup - 1) * 5 + 1;
    const end = Math.min(start + 4, totalPages);
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-2 px-2.5 py-1 rounded-full text-sm font-medium transition ${
            currentPage === i
              ? 'button-primary cursor-pointer text-white'
              : 'bg-white text-primary-active cursor-pointer hover:bg-blue-100'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const groupedOrders =
    activeTab === 'List by Date'
      ? groupByDate(filteredOrders)
      : activeTab === 'Delivered'
      ? groupByDate(
          filteredOrders.filter(order =>
            statusMapping['Delivered'].includes(order.status)
          )
        )
      : activeTab === 'Cancelled'
      ? groupByDate(
          filteredOrders.filter(order =>
            statusMapping['Cancelled'].includes(order.status)
          )
        )
      : {};

  useEffect(() => {
    if (
      activeTab === 'List by Date' ||
      activeTab === 'Delivered' ||
      activeTab === 'Cancelled' ||
      activeTab === 'Payment'
    ) {
      const today = new Date().toISOString().split('T')[0];
      setExpandedDates({ [today]: true });
    }
  }, [activeTab]);

  const toggleDateExpand = date => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <div className="p-4 md:p-6 mt-8">
      <h1 className="text-xl font-semibold mb-4">Consignments List</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveTab(tab.value);
              setCurrentPage(1);
              setPaginationGroup(1);
            }}
            className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? 'bg-blue-100 button-primary cursor-pointer'
                : 'bg-white text-gray-700 cursor-pointer border-gray'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        {loading ? (
          <Loading />
        ) : activeTab === 'List by Date' ||
          activeTab === 'Delivered' ||
          activeTab === 'Cancelled' ? (
          // grouped orders section
          Object.keys(groupedOrders).length === 0 ? (
            <p className="text-center py-6">No data found.</p>
          ) : (
            Object.keys(groupedOrders).map(date => (
              <div key={date} className="mb-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-t-lg border border-gray-200">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    {date}
                    <span className="ml-3 text-sm font-normal text-gray-600 bg-white px-2 py-1 rounded-full">
                      {groupedOrders[date].length} orders
                    </span>
                  </h2>
                  <button
                    onClick={() => toggleDateExpand(date)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    {expandedDates[date] ? 'Hide Data' : 'View Data'}
                  </button>
                </div>
                {expandedDates[date] && (
                  <div className="overflow-hidden rounded-b-lg shadow-sm border border-gray-200 border-t-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50">
                          <tr className="border-b border-gray-200">
                            <th className="px-6 py-4">SL#</th>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Charge</th>
                            <th className="px-6 py-4">Collection</th>
                            <th className="px-6 py-4">Remarks</th>
                            <th className="px-6 py-4">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {groupedOrders[date].map((order, idx) => (
                            <tr
                              key={`${order.id}-${idx}`}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-6 py-4">{idx + 1}</td>
                              <td className="px-6 py-4">
                                <Link
                                  href={`/dashboard/consignments/${order.tracking_id}`}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  #{order.tracking_id}
                                </Link>
                              </td>
                              <td className="px-6 py-4">
                                {order.customer_name}
                              </td>
                              <td className="px-6 py-4">
                                {order.customer_phone}
                              </td>
                              <td className="px-6 py-4">{order.delivery}</td>
                              <td className="px-6 py-4">{order.collection}</td>
                              <td className="px-6 py-4">
                                {order.remarks || '-'}
                              </td>
                              <td className="px-6 py-4">
                                <Link
                                  href={`/dashboard/consignments/${order.tracking_id}`}
                                  className="px-3 py-1 bg-blue-600 text-white rounded"
                                >
                                  View Details
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))
          )
        ) : activeTab === 'Payment' ? (
          // grouped payments section
          (() => {
            const groupedPayments = payments.reduce((acc, payment) => {
              const dateKey = new Date(payment.created_at)
                .toISOString()
                .split('T')[0];
              if (!acc[dateKey]) acc[dateKey] = [];
              acc[dateKey].push(payment);
              return acc;
            }, {});

            return Object.keys(groupedPayments).length === 0 ? (
              <p className="text-center py-6">No payment history found.</p>
            ) : (
              Object.keys(groupedPayments).map(date => (
                <div key={date} className="mb-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-t-lg border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      {date}
                      <span className="ml-3 text-sm font-normal text-gray-600 bg-white px-2 py-1 rounded-full">
                        {groupedPayments[date].length} payments
                      </span>
                    </h2>
                    <button
                      onClick={() => toggleDateExpand(date)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      {expandedDates[date] ? 'Hide Data' : 'View Data'}
                    </button>
                  </div>
                  {expandedDates[date] && (
                    <div className="overflow-hidden rounded-b-lg shadow-sm border border-gray-200 border-t-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-gray-700">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-primary">
                              <th className="px-6 py-4">SL#</th>
                              <th className="px-6 py-4">Date & Time</th>
                              <th className="px-6 py-4">Invoice No</th>
                              <th className="px-6 py-4">Amount</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-100">
                            {groupedPayments[date].map((payment, idx) => (
                              <tr
                                key={payment.id}
                                className="hover:bg-gray-50 transition duration-150"
                              >
                                <td className="px-6 py-4">{idx + 1}</td>
                                <td className="px-6 py-4">
                                  {new Date(payment.created_at).toLocaleString(
                                    'en-GB',
                                    {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      second: '2-digit',
                                      hour12: true,
                                    }
                                  )}
                                </td>
                                <td className="px-6 py-4 text-blue-600 font-medium">
                                  {payment.invoice_id}
                                </td>
                                <td className="px-6 py-4">
                                  {payment.t_payable}
                                </td>
                                <td
                                  className={`px-6 py-4 font-semibold ${
                                    payment.status ===
                                    'Payment Received By Merchant'
                                      ? 'text-green-600'
                                      : payment.status === 'Payment Processing'
                                      ? 'text-yellow-600'
                                      : 'text-red-600'
                                  }`}
                                >
                                  {payment.status ===
                                  'Payment Received By Merchant'
                                    ? 'Complete'
                                    : payment.status === 'Payment Processing'
                                    ? 'Processing'
                                    : payment.status}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <Link
                                    href={`/dashboard/consignments/payment-details?invoiceId=${payment.invoice_id}`}
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))
            );
          })()
        ) : (
          // normal table
          <table className="w-full table-auto text-[19px] text-left text-gray-700">
            <thead className="border-b border-gray bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr className="text-primary">
                <th className="px-4 py-3">SL#</th>
                <th className="px-4 py-3">Create Date</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Customer Phone</th>
                <th className="px-4 py-3">Charge</th>
                <th className="px-4 py-3">Collection</th>
                <th className="px-4 py-3">Remarks</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-3 text-center">
                    No data found.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order, idx) => (
                  <tr
                    className=" border-b-2 border-gray-200"
                    key={`${order.id}-${idx}`}
                  >
                    <td className="px-4 py-3">{startIndex + idx + 1}</td>
                    <td className="px-4 py-3">{order.order_create_date}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/consignments/${order.tracking_id}`}
                        className="text-blue-600"
                      >
                        #{order.tracking_id}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{order.customer_name}</td>
                    <td className="px-4 py-3">{order.customer_phone}</td>
                    <td className="px-4 py-3">{order.delivery}</td>
                    <td className="px-4 py-3">{order.collection}</td>
                    <td className="px-4 py-3">
                      {order.remarks ? order.remarks : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/consignments/${order.tracking_id}`}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {activeTab !== 'List by Date' &&
        activeTab !== 'Delivered' &&
        activeTab !== 'Cancelled' &&
        activeTab !== 'Payment' && (
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={handlePreviousPageGroup}
              disabled={paginationGroup === 1}
              className={`mx-2 px-2 py-1 text-sm rounded-full ${
                paginationGroup === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary hover:bg-blue-100'
              }`}
            >
              <FaChevronLeft />
            </button>
            {renderPageNumbers()}
            <button
              onClick={handleNextPageGroup}
              disabled={paginationGroup * 5 >= totalPages}
              className={`mx-2 px-2 py-1 text-sm rounded-full ${
                paginationGroup * 5 >= totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary hover:bg-blue-100'
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
    </div>
  );
};

export default ParcelTable;
