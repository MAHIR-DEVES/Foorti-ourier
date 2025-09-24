'use client';
import { FaBars, FaSearch, FaTimes, FaHandPointer } from 'react-icons/fa';
import { GoNote } from 'react-icons/go';
import { useState, useRef, useEffect } from 'react';
import NotificationBell from './topbar/NotificationBell';
import ProfileMenu from './topbar/Profile';
import LanguageToggle from './topbar/LanguageToggle';
import { useRouter } from 'next/navigation';

const Topbar = ({ toggleSidebar, toggleMobileSearch, showMobileSearch }) => {
  const [query, setQuery] = useState('');
  const [parcel, setParcel] = useState(null);
  const [balanceClicked, setBalanceClicked] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Get token from localStorage
        const stored = localStorage.getItem('token');
        const token = stored ? JSON.parse(stored).token : null;

        if (!token) {
          setError('No token found');
          return;
        }

        // Call API
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

        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchDashboard();
  }, []);

  const handleResultClick = () => {
    if (parcel) {
      handleOpenModal();
      setIsDropdownOpen(false);
    }
  };

  const handleSearch = async () => {
    try {
      const stored = localStorage.getItem('token');
      const token = stored ? JSON.parse(stored).token : null;

      const res = await fetch(
        `https://admin.merchantfcservice.com/api/order-view?tracking_id=${encodeURIComponent(
          query
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      setParcel(data);
      setError(null);
      setIsDropdownOpen(true);
      setQuery('');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch parcel. Please check your tracking ID.');
      setParcel(null);
      setIsDropdownOpen(true);
      setQuery('');
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // handel navigation to details page

  const navigateToDetails = () => {
    router.push(`/dashboard/consignments/${parcel?.data?.tracking_id}`);
  };

  const CheckBalanceButton = () => (
    <button
      className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#1976d2] text-primary-active shadow-sm hover:shadow-md transition-all duration-300 bg-[#FAFAFA]"
      onClick={() => setBalanceClicked(!balanceClicked)}
    >
      {balanceClicked ? (
        <div className="flex justify-between items-center gap-16 md:gap-20 py-0.5">
          <span className="font-semibold text-primary-active">
            {data?.data?.paymentProcessing} Tk
          </span>
          <span className="text-[15px] bg-[#1976d2] text-white rounded-full px-2.5 py-0.5">
            Balance
          </span>
        </div>
      ) : (
        <>
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary shadow-inner border border-blue-100">
            <FaHandPointer className="text-primary-active text-lg" />
          </div>
          <span className="font-medium">Check Balance</span>
        </>
      )}
    </button>
  );

  return (
    <div className="bg-primary px-5 py-8 shadow sticky top-0 z-10">
      <header className="flex justify-between items-center">
        <FaBars
          onClick={toggleSidebar}
          className="text-xl cursor-pointer md:mr-4 hover:text-gray-600 transition-colors duration-200"
        />

        <div className="flex-1 flex items-center justify-center md:justify-between relative">
          <img
            src="/img/logo.png"
            alt="logo"
            className="h-20 mx-auto md:mx-0 md:ml-4 transition-opacity duration-200"
          />

          {/* Desktop Search */}
          <div className="hidden md:flex items-center justify-center gap-4 absolute left-1/2 transform -translate-x-1/2">
            <div ref={dropdownRef} className="relative w-60">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Search Consignment"
                className="px-4 py-2.5 border border-[#a3a3a3] rounded-full w-full focus:outline-none transition-all duration-300 hover:border-gray-400 focus:border-[#a3a3a3]"
              />
              <FaSearch
                onClick={handleSearch}
                className="absolute right-3 top-3 text-gray-400 transition-colors duration-200 cursor-pointer"
              />

              {isDropdownOpen && (parcel || error) && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-3 cursor-pointer">
                  {error ? (
                    <p className="text-red-500 text-sm">{error}</p>
                  ) : (
                    <div onClick={navigateToDetails} className="flex gap-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">T</span>{' '}
                        {parcel?.data?.tracking_id}
                      </p>
                      <p className="text-sm text-gray-700">
                        {parcel?.data?.customer_name}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <CheckBalanceButton />
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <FaSearch
            onClick={toggleMobileSearch}
            className="text-lg text-gray-600 cursor-pointer md:hidden hover:text-gray-800 transition-colors duration-200"
          />

          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <div className="cursor-pointer p-3 rounded-full transition-all duration-300 bg-[#F5F5F5]">
              <GoNote className="text-xl text-gray-600 transition-colors duration-200" />
            </div>
            <NotificationBell />
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Mobile search */}
      {showMobileSearch && (
        <div className="mt-3 md:hidden relative" ref={dropdownRef}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-[#a3a3a3] rounded-full focus:outline-none transition-all duration-300"
            autoFocus
          />
          <FaTimes
            onClick={toggleMobileSearch}
            className="absolute right-3 top-2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200"
          />

          {isDropdownOpen && (parcel || error) && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-3 cursor-pointer">
              {error ? (
                <p className="text-red-500 text-sm">{error}</p>
              ) : (
                <div onClick={handleResultClick} className="flex gap-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">T</span>{' '}
                    {parcel?.data?.tracking_id}
                  </p>
                  <p className="text-sm text-gray-700">
                    {parcel?.data?.customer_name}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="md:hidden mt-3 flex justify-center">
        <CheckBalanceButton />
      </div>
    </div>
  );
};

export default Topbar;
