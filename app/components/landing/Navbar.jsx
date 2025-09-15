'use client';

import { CiMenuFries } from 'react-icons/ci';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import setLanguageValue from '@/action/set-language-action';
import { useTranslations } from 'next-intl';

const Navbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      setSelectedLanguage(savedLang);
      setLanguageValue(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = selectedLanguage === 'en' ? 'bn' : 'en';
    setSelectedLanguage(newLang);
    localStorage.setItem('lang', newLang);
    setLanguageValue(newLang);
  };

  const tMenu = useTranslations('common.menu');
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-primary shadow-sm z-50 p-3">
        <div className="flex items-center justify-between container mx-auto">
          {/* Left: Logo & Hamburger */}
          <div className="flex items-center gap-4">
            <CiMenuFries
              className="text-[25px] text-black cursor-pointer md:hidden"
              onClick={() => setMobileSidebarOpen(true)}
            />
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  className="cursor-pointer w-28 md:w-52"
                  src="/img/logo.png"
                  width={200}
                  height={100}
                  alt="Logo"
                />
              </Link>
            </div>
          </div>

          {/* Center: Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-6 text-lg text-secondary">
              <Link
                href="/"
                className="cursor-pointer font-medium text-primary text-[16px] hover:text-success transition-all"
                prefetch
              >
                {tMenu('home')}
              </Link>
              <Link
                href="/#about"
                className="cursor-pointer font-medium text-primary text-[16px] hover:text-success transition-all"
                prefetch
              >
                {tMenu('about')}
              </Link>
              <Link
                href="#"
                className="cursor-pointer font-medium text-primary text-[16px] hover:text-success transition-all"
                prefetch
              >
                {tMenu('services')}
              </Link>
              <Link
                href="/landing/coverage-area"
                className="cursor-pointer font-medium text-primary text-[16px] hover:text-success transition-all"
                prefetch
              >
                {tMenu('coverage-area')}
              </Link>
              <Link
                href="/#contact"
                className="cursor-pointer font-medium text-primary text-[16px] hover:text-success transition-all"
                prefetch
              >
                {tMenu('contact')}
              </Link>
            </ul>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Track Parcel (Desktop only) */}
            <div className="md:flex gap-2 items-center hidden">
              <Image
                className="w-4 h-4"
                src="/img/parcel_tarck_icon.png"
                width={16}
                height={16}
                alt="Track Parcel"
              />
              <Link
                href="/#track_parcel"
                className="list-none font-semibold text-primary-active text-[16px] hover:text-success transition-all"
              >
                {tMenu('trackParcel')}
              </Link>
            </div>

            {/* Auth (Desktop only) */}
            <Link href="/landing/login" prefetch>
              <button className="px-4 py-2 cursor-pointer font-bold text-primary text-[16px] hover:text-success transition-all hidden md:block">
                {tMenu('login')}
              </button>
            </Link>
            <Link href="/landing/sign-up" prefetch>
              <button className="px-4 py-2 cursor-pointer font-bold button-primary rounded hover:brightness-105 transition-all hidden md:block">
                {tMenu('signup')}
              </button>
            </Link>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 cursor-pointer font-bold border border-[#1976d2] bg-[#e3f2fd] text-primary-active rounded transition-all hidden md:block"
            >
              {selectedLanguage === 'en' ? 'EN' : 'BN'}
            </button>

            {/* Auth (Mobile) */}
            <Link href="/landing/login">
              <button className="px-3 cursor-pointer py-1 font-semibold text-primary text-[18px] md:hidden">
                {tMenu('login')}
              </button>
            </Link>
            <Link href="/landing/sign-up">
              <button className="px-3 py-1 font-semibold text-[18px] rounded button-primary md:hidden">
                {tMenu('signup')}
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-full bg-white p-5 transition-transform duration-300 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-300">
            <Link href="/">
              <Image
                onClick={() => setMobileSidebarOpen(false)}
                src="/img/logo.png"
                width={150}
                height={70}
                alt="Logo"
                className="cursor-pointer"
              />
            </Link>
            <MdClose
              className="text-2xl cursor-pointer"
              onClick={() => setMobileSidebarOpen(false)}
            />
          </div>

          <ul className="flex flex-col gap-6 text-gray-700">
            <li onClick={() => setMobileSidebarOpen(false)}>
              <div className="flex items-center gap-2">
                <Image
                  className="w-4 h-4"
                  src="/img/parcel_tarck_icon.png"
                  width={16}
                  height={16}
                  alt="Parcel Icon"
                />
                <Link
                  href="/#track_parcel"
                  className="text-primary-active text-[16px]"
                >
                  {tMenu('trackParcel')}
                </Link>
              </div>
            </li>
            <Link
              href="/"
              className="text-primary text-[16px]"
              onClick={() => setMobileSidebarOpen(false)}
            >
              {tMenu('home')}
            </Link>
            <Link
              href="/#about"
              className="text-primary text-[16px]"
              onClick={() => setMobileSidebarOpen(false)}
            >
              {tMenu('about')}
            </Link>
            <Link href="#" className="text-primary text-[16px]">
              {' '}
              {tMenu('services')}
            </Link>
            <Link
              href="/#contact"
              className="text-primary text-[16px]"
              onClick={() => setMobileSidebarOpen(false)}
            >
              {tMenu('contact')}
            </Link>
          </ul>
        </aside>

        {/* Overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </nav>
    </div>
  );
};

export default Navbar;
