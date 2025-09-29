'use client';
import React, { useState } from 'react';
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
            Authorization: `Bearer ${token}`, // Token সংযুক্ত
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

        <div className="p-6">
          {/* Method Selection */}
          <div className="mb-8">
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
            <div className="space-y-6 animate-fade-in">
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
                      // Only allow numbers
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
                  <h3 className="font-semibold text-gray-800">Bank Transfer</h3>
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
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Save Payment Method
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add custom animation */}
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
