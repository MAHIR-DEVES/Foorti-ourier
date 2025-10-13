'use client';
import {
  FaBox,
  FaUserCheck,
  FaDatabase,
  FaArrowRightFromBracket,
  FaCalculator,
} from 'react-icons/fa6';
import { FiSettings } from 'react-icons/fi';
import { MdAddBox, MdOutlineInventory2 } from 'react-icons/md';
import { BiSolidDashboard } from 'react-icons/bi';
import { TbLockPassword } from 'react-icons/tb';
import { IoLogOut } from 'react-icons/io5';
import { LuSend } from 'react-icons/lu';
import { TbTableImport } from 'react-icons/tb';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../api/UserProvider/UserProvider';

const mainItems = [
  { icon: BiSolidDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: MdAddBox, label: 'Add Parcel', href: '/dashboard/add-parcel' },
  { icon: FaBox, label: 'Consignment', href: '/dashboard/consignments' },
  { icon: FaUserCheck, label: 'Fraud Check', href: '/dashboard/fraud-check' },
  // { icon: MdOutlineInventory2, label: "Inventory", href: "/dashboard/inventory" },
  // {
  //   icon: TbTableImport,
  //   label: ' Bulk Import',
  //   href: '/dashboard/bulk-import',
  // },
  { icon: FaCalculator, label: 'Pricing', href: '/dashboard/pricing' },
  {
    icon: LuSend,
    label: 'Tracking Parcel',
    href: '/dashboard/tracking-parcel',
  },
];

const otherItems = [
  { icon: FaDatabase, label: 'Api', href: '/dashboard/user/apikey' },
  { icon: FiSettings, label: 'Setting', href: '/dashboard/user/profile' },
  {
    icon: TbLockPassword,
    label: 'Change Password',
    href: '/dashboard/user/change-password',
  },
  { icon: FaArrowRightFromBracket, label: 'Logout', href: '/dashboard/logout' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Use user context
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout successful!', {
      position: 'top-right',
      autoClose: 2000,
    });

    setTimeout(() => {
      router.push('/landing/login');
    }, 2000);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      <ToastContainer />
      <aside
        className={`fixed top-0 left-0 h-full bg-primary shadow transition-all duration-300 z-30 
        ${isOpen ? 'w-64' : 'hidden md:block md:w-16'} flex flex-col`}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        ref={menuRef}
      >
        <div
          className={`border-b border-gray mx-3 pb-3 ${
            isOpen
              ? 'flex gap-2 items-center md:flex-col mt-4'
              : 'flex flex-col items-center mt-4'
          }`}
        >
          <div className={`flex justify-center ${isOpen ? 'pb-2' : 'pt-2'}`}>
            <Image
              className={`transition-all duration-300 cursor-pointer ${
                isOpen ? 'w-14 h-14 md:w-24 md:h-20' : 'w-10 h-10'
              }`}
              src="/img/marchant_logo_lg.png"
              alt="logo"
              width={500}
              height={500}
            />
          </div>
          {isOpen && !loading && user && (
            <>
              <h2 className="text-center font-semibold text-primary text-[18px]">
                {user.name}
              </h2>
              <p className="text-[16px] text-center">ID: {user.id}</p>
            </>
          )}
        </div>

        <div
          className="flex-1 overflow-y-auto mt-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {isOpen && (
            <h1 className="px-4 text-[16px] text-secondary font-normal uppercase mt-4 pb-2">
              Main Menu
            </h1>
          )}

          {mainItems.map(({ icon: Icon, label, href }, idx) => {
            const isActive = pathname === href;
            return (
              <Link
                href={href}
                key={idx}
                className={`relative flex items-center gap-4 px-4 py-4 cursor-pointer ${
                  isActive
                    ? 'bg-[#e3f2fd] !text-[#1976d2] font-semibold border-l-4 border-[#1976d2]'
                    : 'text-primary hover:bg-[#e5f7f4] text-primary-hover'
                }`}
              >
                <Icon
                  className={`text-xl min-w-[20px] ${
                    isActive ? 'text-[#1976d2]' : ''
                  }`}
                />
                {isOpen && (
                  <span className="text-[16px] capitalize text-primary font-medium">
                    {label}
                  </span>
                )}
              </Link>
            );
          })}

          {isOpen && (
            <h1 className="px-4 text-[16px] text-secondary font-normal uppercase mt-4 pb-2">
              Others
            </h1>
          )}

          {otherItems.map(({ icon: Icon, label, href }, idx) => {
            const isActive = pathname === href;
            const isLogout = label.toLowerCase() === 'logout';
            const itemClass = `relative flex items-center gap-4 px-4 py-4 cursor-pointer ${
              isActive
                ? 'bg-[#e5f7f4] !text-[#00b795] font-semibold border-l-4 border-[#00b795]'
                : 'text-primary hover:bg-[#e5f7f4] text-primary-hover'
            }`;

            return isLogout ? (
              <div key={idx} className={itemClass} onClick={handleLogout}>
                <Icon className="text-xl min-w-[20px] text-[#00b795]" />
                {isOpen && (
                  <span className="text-[16px] capitalize text-primary font-medium">
                    {label}
                  </span>
                )}
              </div>
            ) : (
              <Link href={href} key={idx} className={itemClass}>
                <Icon
                  className={`text-xl min-w-[20px] ${
                    isActive ? 'text-[#00b795]' : ''
                  }`}
                />
                {isOpen && (
                  <span className="text-[16px] capitalize text-primary font-medium">
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
