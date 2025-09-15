'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ParcelModal from '../Modal/ParcelModal';

const TrackParcel = () => {
  const tParcel = useTranslations('homePage.trackParcelSection');
  const [query, setQuery] = useState('');
  const [parcel, setParcel] = useState({});
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // modal state

  const handleSearch = async () => {
    try {
      const stored = localStorage.getItem('token');
      const token = stored ? JSON.parse(stored).token : null;

      const res = await fetch(
        `https://admin.merchantfcservice.com/api/order-view?tracking_id=${encodeURIComponent(
          query
        )}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      setParcel(data);
      setError(null);
      setQuery('');
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch parcel. Please check your tracking ID.');
      setParcel(null);
      setIsModalOpen(false);
      setQuery('');
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="px-3 -mt-10 scroll-mt-24" id="track_parcel">
      <div className="p-6 rounded-md mb-4 flex flex-col md:flex-row items-center justify-center border border-gray md:w-[70%] container mx-auto bg-primary">
        <div className="md:mr-7 mb-4 md:mb-0 text-center md:text-left text-primary">
          {tParcel('title')}
        </div>

        <div className="w-full md:w-[60%] flex flex-col md:flex-row">
          <div className="w-full relative pb-3 md:pb-0">
            <Image
              src="/img/landing/tracker.png"
              alt="Tracking icon"
              width={20}
              height={20}
              className="absolute top-4 left-3 text-secondary"
            />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder={tParcel('inputLabel')}
              className="w-full text-[14px] border border-gray rounded-b-md md:rounded-r-none rounded-t-md md:rounded-tr-none md:rounded-l-md outline-none pl-10 pr-4 py-3 focus:border-primary transition-colors duration-300"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-full md:w-[40%] font-medium text-[14px] cursor-pointer hover:bg-[#e5f7f4] text-primary-active border border-[#1976d2] rounded-b-md md:rounded-bl-none md:rounded-r-md rounded-t-md md:rounded-l-none outline-none px-4 py-3 md:py-0 transition-colors duration-300"
          >
            {tParcel('button')}
          </button>
        </div>
      </div>

      {/* Show modal */}
      <ParcelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        parcel={parcel}
      />

      {/* Show error message */}
      {error && (
        <p className="text-red-500 text-center mt-2">Parcel Not Available</p>
      )}
    </div>
  );
};

export default TrackParcel;
