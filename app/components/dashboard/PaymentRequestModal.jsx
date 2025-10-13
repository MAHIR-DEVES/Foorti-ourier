'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';

const PaymentRequestModal = ({ isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(null);
  console.log(amount);

  if (!isOpen) return null;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const stored = localStorage.getItem('token');
        const token = stored ? JSON.parse(stored).token : null;

        if (!token) {
          console.error('No token found');
          return;
        }

        const res = await fetch(
          'https://admin.merchantfcservice.com/api/merchantdashboard',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`Error ${res.status}`);

        const result = await res.json();
        // setData(result);
        setAmount(result?.data?.paymentProcessing); // set default amount here
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchDashboard();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = {
      payment_method: paymentMethod,
      amount,
    };

    try {
      setLoading(true);

      const stored = localStorage.getItem('token');
      const token = stored ? JSON.parse(stored).token : null;

      const response = await axios.post(
        'https://admin.merchantfcservice.com/api/payment-request',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(`${response.data.message}`);
      onClose();
    } catch (error) {
      console.error(
        '❌ Payment Request Error:',
        error.response?.data || error.message
      );
      toast.error('Failed to send payment request.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPaymentMethod('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 pt-10">
      <div className="bg-white w-[90%] sm:w-[80%] md:w-[35%] rounded-md shadow-lg relative">
        <div className="flex justify-between items-center border-b px-5 py-3">
          <h2 className="text-xl font-semibold">Payment Request</h2>
          <RxCross1
            className="cursor-pointer text-gray-600 hover:bg-gray-100 p-2 rounded-full w-8 h-8"
            onClick={onClose}
          />
        </div>

        <div className="p-5">
          <form className="flex flex-col gap-1.5" onSubmit={handleSubmit}>
            {/* Payment Method */}
            <label className="block mb-1 font-medium text-gray-700">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">-- Select Payment Method --</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="roket">Roket</option>
              <option value="bank">Bank Transfer</option>
            </select>

            {/* Amount */}
            <label className="block font-medium text-gray-700 mt-2">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={amount}
              readOnly // make non-editable
              className="w-full border border-gray-300 bg-gray-100 rounded px-3 py-2 mt-1 cursor-not-allowed text-gray-600"
            />
            <p className="text-xs text-gray-500 mt-1">
              This amount is fetched automatically from your dashboard.
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white px-4 py-2 rounded`}
              >
                {loading ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequestModal;
