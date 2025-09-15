'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobileSearch = () => setShowMobileSearch(!showMobileSearch);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 relative ${
          isOpen ? 'ml-64' : 'ml-0 md:ml-16'
        }`}
      >
        <Topbar
          toggleSidebar={toggleSidebar}
          toggleMobileSearch={toggleMobileSearch}
          showMobileSearch={showMobileSearch}
          className="relative"
        />

        <div className="flex flex-col min-h-screen bg-gray-100">
          <main className="flex-grow p-5">{children}</main>
          <footer className="text-center text-secondary text-[14px] border-t py-3 px-5 font-normal">
            © 2025 Foorti Courier. All rights reserved. | Develop by Courier
            Lab.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
