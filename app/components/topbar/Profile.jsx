"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaKey, FaCog } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [user, setUser] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 2000,
    });

    setTimeout(() => {
      router.push("/landing/login");
    }, 2000);
  };

  return (
    <div className="relative z-[1000] " ref={menuRef}>
      <ToastContainer />
      <div
        className="cursor-pointer relative p-3 rounded-full transition-all duration-300 bg-[#F5F5F5] flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <FaUserCircle className="text-xl text-secondary transition-colors duration-200 cursor-pointer" />
        {showTooltip && (
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap z-[1000]">
            {user?.name}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-primary shadow-sm z-20 overflow-hidden rounded-md">
          <ul className="py-2">
            <li>
              <Link
                href="/dashboard/my-account"
                className="group flex items-center px-4 py-2 text-secondary hover:text-[#00b795]"
              >
                <FiUser className="mr-3 text-2xl text-secondary" />
                My account
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center px-4 py-2 text-secondary hover:text-[#00b795]"
              >
                <FaKey className="mr-3 text-secondary" />
                Change Password
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center px-4 py-2 text-secondary hover:text-[#00b795]"
              >
                <FaCog className="mr-3 text-secondary" />
                Settings
              </a>
            </li>
            <li className="mt-10 flex justify-center pb-5">
              <button
                onClick={handleLogout}
                className="flex items-center cursor-pointer px-10 rounded-md py-2 border border-[#00b795] text-[#00b795] bg-[#e5f7f4] hover:bg-[#d0f0eb] transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
