"use client";
import { useState, useRef, useEffect } from "react";
import { FaBell, FaTimes, FaCheck } from "react-icons/fa";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative " ref={notificationRef}>
      <div
        className={`cursor-pointer p-3 rounded-full transition-all duration-300 ${
          isOpen ? "bg-[#F5F5F5]" : "bg-[#F5F5F5]"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBell className="text-xl text-secondary  transition-colors duration-200" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          0
        </span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 h-96 bg-white border border-[#a3a3a3] rounded-lg shadow-lg p-2 z-20">
          <h2 className="font-semibold py-2 text-primary">Notifications</h2>
          <div className="flex gap-5">
            <button
              className="flex items-center gap-1 px-3 py-1 button-primary text-white rounded cursor-pointer transition-colors"
              onClick={() => setIsOpen(false)}
            >
              All
            </button>
            <button
              className="flex items-center cursor-pointer gap-1 px-3 py-1  text-primary rounded hover:bg-[#00b795] hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Unread
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
