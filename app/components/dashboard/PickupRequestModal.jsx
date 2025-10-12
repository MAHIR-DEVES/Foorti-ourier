'use client';
import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PickupRequestModal = ({ isOpen, onClose }) => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [note, setNote] = useState('');
  const [estimatedParcel, setEstimatedParcel] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // 🧠 Handle Form Submit
  const handleSubmit = async e => {
    e.preventDefault();

    const formData = {
      pick_up_address: pickupAddress,
      Note: note,
      estimated_parcel: estimatedParcel,
    };

    try {
      setLoading(true);

      // 🪪 Get token from localStorage
      const stored = localStorage.getItem('token');
      const token = stored ? JSON.parse(stored).token : null;

      if (!token) {
        toast.error('No token found. Please log in again.');
        setLoading(false);
        return;
      }

      // Send request
      const response = await axios.post(
        'https://admin.merchantfcservice.com/api/pick-up-request',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(`${response?.data?.message}`);
      setLoading(false);

      // Optionally close modal
      onClose();
    } catch (error) {
      console.error('❌ Error sending request:', error.response || error);
      toast.error('Failed to send pickup request!');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 pt-10">
      <div className="bg-white w-[90%] sm:w-[80%] md:w-[35%] rounded-md shadow-lg relative">
        <div className="flex justify-between items-center border-b px-5 py-3">
          <h2 className="text-xl font-semibold">Pickup Request</h2>
          <RxCross1
            className="cursor-pointer text-gray-600 hover:bg-gray-100 p-2 rounded-full w-8 h-8"
            onClick={onClose}
          />
        </div>

        <div className="p-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="block font-medium text-gray-700">
              Pickup Address <span className="text-red-500">*</span>
              <input
                type="text"
                value={pickupAddress}
                onChange={e => setPickupAddress(e.target.value)}
                placeholder="Enter pickup address"
                className="w-full border border-gray outline-none rounded px-3 py-2 mt-1"
                required
              />
            </label>

            <label className="block font-medium text-gray-700">
              Note <span className="text-red-500">*</span>
              <input
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Note"
                className="w-full border border-gray outline-none rounded px-3 py-2 mt-1"
                required
              />
            </label>

            <label className="block font-medium text-gray-700">
              Estimated Parcel (Optional)
              <input
                type="text"
                value={estimatedParcel}
                onChange={e => setEstimatedParcel(e.target.value)}
                placeholder="Estimated Parcel (Optional)"
                className="w-full border border-gray outline-none rounded px-3 py-2 mt-1"
              />
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`button-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
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

export default PickupRequestModal;
