// src/app/Navbar.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
// import { serverHooks } from 'next/dist/server/app-render/entry-base';


export default function Navbar() {
  const [dropdown, setDropdown] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const firstTimeRef = useRef(null);
  const yourFamilyRef = useRef(null);
  const eventRef = useRef(null);
  const connectRef = useRef(null);
  const pathname = usePathname();

  // const navClasses = isDarkTheme
  //   ? "bg-zinc-900 border-zinc-700 text-gray-100"
  //   : "bg-white border-gray-200 text-gray-900";

  // const dropdownClasses = isDarkTheme
  //   ? "bg-zinc-800 divide-zinc-700 text-gray-300"
  //   : "bg-white divide-gray-100 text-gray-700";

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu)
  }

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  const handleClickOutside = (event) => {
    if (
      (firstTimeRef.current && !firstTimeRef.current.contains(event.target)) &&
      (yourFamilyRef.current && !yourFamilyRef.current.contains(event.target)) &&
      (eventRef.current && !eventRef.current.contains(event.target)) &&
      (connectRef.current && !connectRef.current.contains(event.target))
    ) {
      setDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path) => pathname === path;

  const handleLinkClick = () => {
    console.log("handleLinkClick")
    setDropdown(null); // Close the dropdown
    setMobileMenu(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-[82px] px-3 relative">
        <Link href="/">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* <img src={logoImage} className="h-8" alt="Refresh Logo" /> */}
            <Image
              src='/photos/logo.webp'
              alt="Refresh Logo"
              width={128} // Set the width according to your preference
              height={100} // Set the width according to your preference
              className="h-auto" // Keep this class if you want to maintain the styling
            />
          </div>
        </Link>

        <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg min-[1210px]:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>


        {/* <div className={`${mobileMenu ? 'block' : 'hidden'} w-full md:block md:w-auto z-50`}>
          <ul className="flex flex-col font-sm p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-11 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 mx-auto md:justify-center">
            <li>
              <Link href="/">
                <div className={`${isActive('/') ? 'primary' : 'gray'} text-gray-900 text-xl block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>home</div>
              </Link>
            </li>
            <li className="relative" ref={dropdownRef}>
              <button onClick={() => toggleDropdown('firstTime')} className="text-xl flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">first time here
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {dropdown === 'firstTime' && (
                <div className="absolute left-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-base text-gray-700 dark:text-gray-400">
                    <li>
                      <Link href="/first-time-here">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">first time here?</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/leadership">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">leadership</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/beliefs">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">beliefs</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative" ref={dropdownRef}>
              <button onClick={() => toggleDropdown('yourFamily')} className="text-xl flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">your family
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {dropdown === 'yourFamily' && (
                <div className="absolute left-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-base text-gray-700 dark:text-gray-400">
                    <li>
                      <Link href="/r-kids">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">refresh kids</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/refresh-youth">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">refresh youth</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/mens-ministry">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">men&apos;s ministry</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/womens-ministry">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">women&apos;s ministry</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative" ref={dropdownRef}>
              <button onClick={() => toggleDropdown('connect')} className="text-xl flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">connect
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {dropdown === 'connect' && (
                <div className="absolute left-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-base text-gray-700 dark:text-gray-400">
                    <li>
                      <Link href="/discovery">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">discovery</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/small-groups">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">small groups</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/serve-team">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">serve team</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sermons">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">sermons</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/events">
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">events</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link href="/contact">
                <div className={`${isActive('/contact') ? 'primary' : 'gray'} text-gray-900 text-xl block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>contact</div>
              </Link>
            </li>
            <li className='flex items-center'>
              <div href="https://www.merriam-webster.com/dictionary/give" className="text-xl block py-2 px-3 me-1 text-primary rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">give</div>
              <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
              </svg>
            </li>
          </ul>
        </div> */}

        <div className={`${mobileMenu ? 'block' : 'hidden'} w-full min-[1210px]:block min-[1210px]:w-auto z-50`}>
          <ul className="flex flex-col font-sm p-4 min-[1210px]:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 min-[1210px]:space-x-11 rtl:space-x-reverse min-[1210px]:flex-row min-[1210px]:mt-0 min-[1210px]:border-0 min-[1210px]:bg-white dark:bg-gray-800 min-[1210px]:dark:bg-gray-900 dark:border-gray-700 mx-auto min-[1210px]:justify-center">
            <li>
              <Link href="/">
                <div className={`${isActive('/') ? 'primary' : 'gray'} text-gray-900 text-xl block py-2 px-3 rounded hover:bg-gray-100 min-[1210px]:hover:bg-transparent min-[1210px]:border-0 min-[1210px]:hover:text-primary min-[1210px]:p-0 dark:text-white min-[1210px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[1210px]:dark:hover:bg-transparent`}>home</div>
              </Link>
            </li>
            <li className="relative" ref={firstTimeRef}>
              <button onClick={() => toggleDropdown('firstTime')} className="text-xl flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[1210px]:hover:bg-transparent min-[1210px]:border-0 min-[1210px]:hover:text-primary min-[1210px]:p-0 min-[1210px]:w-auto dark:text-white min-[1210px]:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 min-[1210px]:dark:hover:bg-transparent">first time here
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {dropdown === 'firstTime' && (
                <div className="absolute left-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-base text-gray-700 dark:text-gray-400">
                    <li>
                      <Link href="/first-time-here" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">first time here?</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/leadership" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">leadership</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/beliefs" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">beliefs</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative" ref={yourFamilyRef}>
              <button onClick={() => toggleDropdown('yourFamily')} className="text-xl flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[1210px]:hover:bg-transparent min-[1210px]:border-0 min-[1210px]:hover:text-primary min-[1210px]:p-0 min-[1210px]:w-auto dark:text-white min-[1210px]:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 min-[1210px]:dark:hover:bg-transparent">your family
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {dropdown === 'yourFamily' && (
                <div className="absolute left-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-base text-gray-700 dark:text-gray-400">
                    <li>
                      <Link href="/r-kids" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">refresh kids</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/refresh-youth" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">refresh youth</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/mens-ministry" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">men&apos;s ministry</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/womens-ministry" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">women&apos;s ministry</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative" ref={eventRef}>
              <button onClick={() => toggleDropdown('events')} className="text-xl flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[1210px]:hover:bg-transparent min-[1210px]:border-0 min-[1210px]:hover:text-primary min-[1210px]:p-0 min-[1210px]:w-auto dark:text-white min-[1210px]:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 min-[1210px]:dark:hover:bg-transparent">events
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {dropdown === 'events' && (
                <div className="absolute left-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-base text-gray-700 dark:text-gray-400">
                    <li>
                      <Link href="https://refresh.churchcenter.com/registrations/events/category/55742" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">kids events</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://refresh.churchcenter.com/registrations/events/category/49575" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">youth events</div>
                      </Link>
                    </li>
                    <li>
                      {/* NOTE: Event link */}
                      <Link href="https://refresh.churchcenter.com/registrations/events" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                        {/* <Link href="/events" onClick={handleLinkClick}> */}
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">all events</div>
                      </Link>
                    </li>
                    <li>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="relative" ref={connectRef}>
              <button onClick={() => toggleDropdown('connect')} className="text-xl flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 min-[1210px]:hover:bg-transparent min-[1210px]:border-0 min-[1210px]:hover:text-primary min-[1210px]:p-0 min-[1210px]:w-auto dark:text-white min-[1210px]:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 min-[1210px]:dark:hover:bg-transparent">connect
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {dropdown === 'connect' && (
                <div className="absolute left-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-base text-gray-700 dark:text-gray-400">
                  <li>
                      <Link href="/stories" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">stories</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">contact</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://church.us2.list-manage.com/subscribe?u=e85bd2e4f47f460bfd312fbc4&id=b8536e5be0" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">newsletter sign-up</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/discovery" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">discovery</div>
                      </Link>
                    </li>
                    <li>
                      {/* NOTE: Small Groups link */}
                      <Link href="/small-groups/info" onClick={handleLinkClick}>
                      {/* <Link href="https://refresh.churchcenter.com/groups/all-groups?enrollment=open_signup%2Crequest_to_join&filter=enrollment" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}> */}
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">small groups</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://refresh.churchcenter.com/people/forms/301611?_ga=2.212286996.1630180229.1675698110-905807684.1675698110" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">serve team</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sermons" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">sermons</div>
                      </Link>
                    </li>
                    <li>
                      {/* NOTE: Event link */}
                      <Link href="https://refresh.churchcenter.com/registrations/events" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                        {/* <Link href="/events" onClick={handleLinkClick}> */}
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">events</div>
                      </Link>
                    </li>
                    {/* <li>
                        <Link href="/missions-and-outreach" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">missions</div>
                      </Link>
                    </li> */}
                    <li>
                      <Link href="/refresh-grants" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">refresh grants</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/connect" onClick={handleLinkClick}>
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">ministries</div>
                      </Link>
                    </li>
                    <li>
                      {/* NOTE: Baptism link */}
                      <Link href="https://refresh.churchcenter.com/people/forms/303582" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                        {/* <Link href="/events" onClick={handleLinkClick}> */}
                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">baptisms</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link href="/land">
                <div className={`${isActive('/land') ? 'primary' : 'gray'} text-gray-900 text-xl block py-2 px-3 rounded hover:bg-gray-100 min-[1210px]:hover:bg-transparent min-[1210px]:border-0 min-[1210px]:hover:text-primary min-[1210px]:p-0 dark:text-white min-[1210px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[1210px]:dark:hover:bg-transparent`}>land</div>
              </Link>
            </li>
            <li className='flex items-center'>

              {/* NOTE: Give link */}
              {/* <Link href="https://refresh.churchcenter.com/giving?open-in-church-center-modal=true" target="_blank" rel="noopener noreferrer" className="text-xl block py-2 px-3 me-1 text-primary rounded hover:bg-gray-100 min-[1210px]:hover:bg-transparent min-[1210px]:border-0 min-[1210px]:hover:text-primary min-[1210px]:p-0 dark:text-white min-[1210px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[1210px]:dark:hover:bg-transparent">give</Link>
              <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
              </svg> */}

              <Link href="/give">
                <div className={`${isActive('/give') ? 'primary' : 'gray'} text-gray-900 text-xl block py-2 px-3 rounded hover:bg-gray-100 min-[1210px]:hover:bg-transparent min-[1210px]:border-0 min-[1210px]:hover:text-primary min-[1210px]:p-0 dark:text-white min-[1210px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[1210px]:dark:hover:bg-transparent`}>give</div>
              </Link>

            </li>

            <li className='text-primary'>
              <Link className='flex items-center' href="https://refreshchurchmerch.myshopify.com/" target="_blank" rel="noopener noreferrer">
                <div className={` text-xl block py-2 px-3 rounded hover:bg-gray-100 min-[1210px]:hover:bg-transparent min-[1210px]:border-0 min-[1210px]:hover:text-primary min-[1210px]:p-0 dark:text-white min-[1210px]:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white min-[1210px]:dark:hover:bg-transparent`}>merch</div>
              <ArrowUpRight className="w-4 h-4"/>
              </Link>
                {/* <svg className="w-4 h-4  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
                </svg> */}
            </li>
          </ul>
        </div>

        {/* SOCIALS */}
        {/* <div className='items-bottom space-x-1.5 min-[1215px]:flex hidden '>
          <a href='https://www.instagram.com/refreshchurchtv/' target="_blank" rel="noopener noreferrer">
            <svg className=" w-8 h-8 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd" />
            </svg>
          </a>

          <a href="https://www.facebook.com/myrefreshchurch" target="_blank" rel="noopener noreferrer">
            <svg className="pb-0.5 w-8 h-8 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
            </svg>
          </a>

          <a href="https://www.youtube.com/@refreshchurchtv" target="_blank" rel="noopener noreferrer">
            <svg className="w-8 h-8 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clipRule="evenodd" />
            </svg>
          </a>
        </div> */}
      </div>
    </nav>
  );
}
