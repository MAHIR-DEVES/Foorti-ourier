'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const PaymentPage = () => {
  const [method, setMethod] = useState('');

  // common fields
  const [type, setType] = useState('personal');
  const [number, setNumber] = useState('');

  // bank fields
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');

  // restriction-payment
  const [isPaymentMethod, setIsPaymentMethod] = useState(null);
  const [error, setError] = useState(null);
  // show payment Method
  const [showPaymentMethod, setShowPaymentMethod] = useState(null);

  // Bank list
  const bankList = [
    'Sonali Bank',
    'Janata Bank',
    'Agrani Bank',
    'Rupali Bank',
    'Islami Bank',
    'Dutch-Bangla Bank',
    'BRAC Bank',
    'Eastern Bank',
    'Prime Bank',
    'United Commercial Bank',
  ];

  // save handler
  const handleSave = async () => {
    if (!method) {
      alert('Please select a payment method!');
      return;
    }

    let data = {};

    if (method === 'bkash' || method === 'nagad' || method === 'rocket') {
      if (number.length < 11 || number.length > 12) {
        toast.warning('Mobile number must be between 11 and 12 digits!');
        return;
      }
      data = { method, type, number };
    } else if (method === 'bank') {
      if (
        !bankName ||
        !branch ||
        !accountHolder ||
        !accountNumber ||
        !routingNumber
      ) {
        toast.warning('Please fill all bank details!');
        return;
      }
      data = {
        method,
        bankName,
        branch,
        accountHolder,
        accountNumber,
        routingNumber,
      };
    }

    try {
      const stored = localStorage.getItem('token');
      const token = stored ? JSON.parse(stored).token : null;
      const response = await axios.post(
        'https://admin.merchantfcservice.com/api/payment-info-add',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Server Response:', response.data);
      toast('Payment method saved successfully!');
    } catch (error) {
      console.error('Error saving payment info:', error);
      toast.error('Failed to save payment method!');
    }
  };

  // image getter
  const getMethodImage = methodName => {
    switch (methodName) {
      case 'bkash':
        return '/img/payment-mathod/bkash.png';
      case 'nagad':
        return '/img/payment-mathod/nagod.png';
      case 'rocket':
        return '/img/payment-mathod/Rocket.png';
      case 'bank':
        return '/img/payment-mathod/bank.png';
      default:
        return '/images/default.png';
    }
  };

  // show payment method
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stored = localStorage.getItem('token');
        const token = stored ? JSON.parse(stored).token : null;

        const response = await fetch(
          'https://admin.merchantfcservice.com/api/payment-info-show',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setShowPaymentMethod(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // get restriction-payment
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stored = localStorage.getItem('token');
        const token = stored ? JSON.parse(stored).token : null;

        const response = await fetch(
          'https://admin.merchantfcservice.com/api/restriction-payment',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setIsPaymentMethod(result?.status);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>💳</span>
            Payment Method
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Choose your preferred payment method
          </p>
        </div>

        <div className="">
          {/* If already added, show the data */}
          {isPaymentMethod && showPaymentMethod ? (
            <div className="  bg-gradient-to-br from-white to-blue-50 shadow-xl p-8 border border-blue-100">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Payment Method
                  </h2>
                  <p className="text-green-600 text-sm font-medium">
                    Verified & Secure
                  </p>
                </div>
              </div>

              {/* Payment Type Badge */}
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-blue-700 font-semibold text-sm">
                    {showPaymentMethod.p_type === 'Bank'
                      ? '🏦 Bank Transfer'
                      : '📱 Mobile Banking'}
                  </span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4">
                {showPaymentMethod.p_type === 'Bank' ? (
                  <>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Bank Name
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {showPaymentMethod.bank_name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Branch</span>
                      <span className="text-gray-800 font-semibold">
                        {showPaymentMethod.branch_name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Account Holder
                      </span>
                      <span className="text-gray-800 font-semibold">
                        {showPaymentMethod.account_holder_name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Account Number
                      </span>
                      <span className="text-gray-800 font-semibold font-mono">
                        {showPaymentMethod.account_number}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600 font-medium">
                        Routing Number
                      </span>
                      <span className="text-gray-800 font-semibold font-mono">
                        {showPaymentMethod.routing_number}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Service Provider
                      </span>
                      <span className="text-gray-800 font-semibold capitalize">
                        {showPaymentMethod.mb_type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600 font-medium">
                        Mobile Number
                      </span>
                      <span className="text-gray-800 font-semibold text-lg font-mono">
                        {showPaymentMethod.mb_number}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Security Footer */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">
                    Secured & Encrypted Payment Method
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Method Selection */}
              <div className="mb-8 px-2 mt-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Payment Method
                </label>
                <select
                  value={method}
                  onChange={e => setMethod(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">-- Choose a method --</option>
                  <option value="bkash">Bkash</option>
                  <option value="nagad">Nagad</option>
                  <option value="rocket">Rocket</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {/* Mobile Payment Methods */}
              {(method === 'bkash' ||
                method === 'nagad' ||
                method === 'rocket') && (
                <div className="space-y-6 animate-fade-in px-2">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <img
                      src={getMethodImage(method)}
                      alt={method}
                      className="w-10 h-10 object-contain"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 capitalize">
                        {method}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Mobile financial service
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Type
                      </label>
                      <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      >
                        <option value="personal">Personal</option>
                        <option value="agent">Agent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        value={number}
                        onChange={e => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setNumber(value);
                          }
                        }}
                        placeholder="01XXXXXXXXX"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer */}
              {method === 'bank' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                    <img
                      src={getMethodImage('bank')}
                      alt="bank"
                      className="w-10 h-10 object-contain"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Bank Transfer
                      </h3>
                      <p className="text-sm text-gray-600">
                        Direct bank account transfer
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bank Name
                        </label>
                        <select
                          value={bankName}
                          onChange={e => setBankName(e.target.value)}
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        >
                          <option value="">-- Select Bank --</option>
                          {bankList.map((bank, idx) => (
                            <option key={idx} value={bank}>
                              {bank}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Branch
                        </label>
                        <input
                          type="text"
                          value={branch}
                          onChange={e => setBranch(e.target.value)}
                          placeholder="Branch name"
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        value={accountHolder}
                        onChange={e => setAccountHolder(e.target.value)}
                        placeholder="Full name as in bank"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Number
                        </label>
                        <input
                          type="number"
                          value={accountNumber}
                          onChange={e => setAccountNumber(e.target.value)}
                          placeholder="Account number"
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Routing Number
                        </label>
                        <input
                          type="number"
                          value={routingNumber}
                          onChange={e => setRoutingNumber(e.target.value)}
                          placeholder="Routing number"
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              {method && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4  font-semibold hover:from-blue-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Save Payment Method
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;
