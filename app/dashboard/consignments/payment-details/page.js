'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const PaymentDetailsPage = () => {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get('invoiceId');

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!invoiceId) {
      setError('No invoice ID provided');
      setLoading(false);
      return;
    }

    const fetchPaymentDetails = async () => {
      try {
        const stored = localStorage.getItem('token');
        const token = stored ? JSON.parse(stored).token : null;

        const res = await fetch(
          `https://admin.merchantfcservice.com/api/payment-history-details-merchant?invoice_id=${invoiceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch payment details');
        }

        const data = await res.json();
        setPayment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [invoiceId]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!payment) return <p className="p-4">No payment details found.</p>;

  // Safely handle merchantPayments whether it's an array or an object
  const merchantPaymentsArray = Array.isArray(payment?.merchantPayments)
    ? payment.merchantPayments
    : payment?.merchantPayments
    ? Object.values(payment.merchantPayments)
    : [];

  // Debugging: log both object and array
  // console.log('Original merchantPayments:', payment?.merchantPayments);
  // if (Array.isArray(payment?.merchantPayments)) {
  //   console.log('It is an array');
  //   payment.merchantPayments.forEach(item => console.log(item));
  // } else if (payment?.merchantPayments) {
  //   console.log('It is an object');
  //   Object.entries(payment.merchantPayments).forEach(([key, value]) =>
  //     console.log(key, value)
  //   );
  // } else {
  //   console.log('No merchantPayments found');
  // }

  return (
    <div className="md:p-6">
      <div className="md:flex justify-between items-center mb-4">
        <h2 className="text-lg">Payment Details</h2>
        <div className="flex flex-wrap justify-end gap-2 pt-1.5 md:pt-0">
          <button className="button-primary cursor-pointer text-white px-3 py-1 rounded">
            Print Invoice
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md">
        {/* Payment Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-xl">
              Invoice ID: {payment?.adjInfo?.invoice_id}
            </p>

            <div className="space-y-2 text-xl mt-4">
              <p>
                Payment Date:{' '}
                <span>
                  {new Date(payment?.adjInfo?.created_at).toLocaleString(
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
                </span>
              </p>
              <p>
                Status:{' '}
                <span
                  className={
                    payment?.merchantpay?.status ===
                    'Payment Received By Merchant'
                      ? 'text-green-600 font-semibold'
                      : payment?.merchantpay?.status === 'Payment Processing'
                      ? 'text-yellow-600 font-semibold'
                      : 'text-red-600 font-semibold'
                  }
                >
                  {payment?.merchantpay?.status || '-'}
                </span>
              </p>
            </div>
          </div>

          <div className="text-right text-xl">
            <p>
              Total Amount:{' '}
              <span className="font-bold">৳{payment?.tCollection || '0'}</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Payment Details Table */}
        <div className="mt-6 border border-gray-300 rounded">
          <div className="bg-gray-100 text-xl p-2 font-semibold">
            Payment Breakdown
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 uppercase tracking-wider">
                    Tracking
                  </th>
                  <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 uppercase tracking-wider">
                    Delivery
                  </th>
                  <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 uppercase tracking-wider">
                    COD
                  </th>
                  <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 uppercase tracking-wider">
                    Collect
                  </th>
                  <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 uppercase tracking-wider">
                    Return
                  </th>
                  <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {merchantPaymentsArray.map((detail, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-[16px]">
                      {new Date(detail.created_at).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[16px] text-blue-600">
                      {detail.tracking_id || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[16px]">
                      {detail.customer_name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[16px]">
                      {detail.customer_phone || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[16px]">
                      {detail.delivery || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[16px]">
                      {detail.cod || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[16px]">
                      {detail.collect || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[16px]">
                      {detail.return_charge || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[16px]">
                      {detail.reason_status || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;
