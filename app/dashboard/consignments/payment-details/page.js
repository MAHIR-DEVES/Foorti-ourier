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

        // Using the invoice-wise-payment-detail endpoint found in Postman collection
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

  console.log('Payment Details:', payment);

  return (
    <div className="max-w-6xl mx-auto md:p-6">
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
              {/* <p>
                Payment Method: <span>{payment?.payment_method || '-'}</span>
              </p> */}
              <p>
                Status:{' '}
                <span
                  className={
                    payment?.merchantpay?.status ===
                    'Payment Received By Merchant'
                      ? 'text-green-600 font-semibold'
                      : payment?.status === 'Payment Processing'
                      ? 'text-yellow-600 font-semibold'
                      : 'text-red-600 font-semibold'
                  }
                >
                  {payment?.merchantpay?.status ===
                  'Payment Received By Merchant'
                    ? 'Completed'
                    : payment?.status === 'Payment Processing'
                    ? 'Processing'
                    : payment?.status || '-'}
                </span>
              </p>
            </div>
          </div>

          <div className="text-right text-xl">
            <p>
              Total Amount:{' '}
              <span className="font-bold">৳{payment?.tCollection || '0'}</span>
            </p>
            {/* <p>
              Paid Amount:{' '}
              <span className="font-bold">৳{payment?.paid_amount || '0'}</span>
            </p>
            <p>
              Due Amount:{' '}
              <span className="font-bold">৳{payment?.due_amount || '0'}</span>
            </p> */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    COD Charge
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payment?.merchantPayments?.map((detail, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      {detail.tracking_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {detail.invoice_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {detail.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ৳{detail.cod}
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
