'use client';

import { useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import Logo from './Logo';
import LogoutButton from './dashboard/LogoutButton';

export default function Navbar({ fixed = true, isAuthenticated = false }) {
  const [transparent, setTransparent] = useState(fixed);

  useEffect(() => {
    if (!fixed) return;
    const handleScroll = () => {
      setTransparent(window.scrollY <= 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fixed]);

  return (
    <nav
      className={`${!fixed ? 'static' : 'fixed left-0 right-0 top-0 z-50'} ${
        transparent
          ? 'bg-transparent text-white'
          : 'border-b border-neutral-200 bg-white text-darkslategray-100'
      } px-6 py-5 duration-200`}
    >
      <div className="mx-auto flex h-[38px] max-w-[1200px] items-center justify-between lg:h-[54px]">
        <Link href="/" className="shrink-0">
          <Logo className="max-lg:w-[40.8px] lg:w-[58px]" />
        </Link>
        <div className="hidden items-center justify-center gap-8 lg:flex">
          <div className="text-base font-medium not-italic leading-[normal] no-underline">
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-x-1 p-2.5 text-base">
                9th WSS
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15.3748L6 9.3748L7.075 8.2998L12 13.2498L16.925 8.3248L18 9.3998L12 15.3748Z"
                    fill="currentColor"
                  />
                </svg>
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute left-0 w-40 rounded-lg border border-black border-opacity-10 bg-white bg-opacity-80 shadow-md backdrop-blur-lg">
                  <Menu.Item>
                    {({ active, close }) => (
                      <button
                        className={`block w-full whitespace-nowrap p-3 text-left font-semibold ${
                          active ? 'text-secondary-700' : 'text-black'
                        }`}
                        onClick={close}
                      >
                        9th Series
                      </button>
                    )}
                  </Menu.Item>
                  {Array(8)
                    .fill()
                    .map((_, i) => 8 - i)
                    .map((i) => (
                      <Menu.Item key={i}>
                        {({ active }) => (
                          <a
                            href="https://wss.ce.sharif.edu"
                            target="_blank"
                            className={`block whitespace-nowrap p-3 ${
                              active ? 'text-secondary-700' : 'text-black'
                            }`}
                          >
                            {i}
                            {i === 1
                              ? 'st'
                              : i === 2
                                ? 'nd'
                                : i === 3
                                  ? 'rd'
                                  : 'th'}{' '}
                            Series
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <Link href="/" className="block px-4 py-3">
            Home
          </Link>
          {/* <a href="" className="block px-4 py-3">
            Seminars
          </a>
          <a href="" className="block px-4 py-3">
            Lab Talks
          </a>
          <a href="" className="block px-4 py-3">
            Round Tables
          </a> */}
          <Link href="/workshop" className="block px-4 py-3">
            Workshops
          </Link>
          <Link href="/about" className="block px-4 py-3">
            About Us
          </Link>
        </div>
        {/* TODO: sign out and dashboard button */}
        {isAuthenticated ? (
          <div className="flex items-center gap-1.5">
            <Link
              href="/dashboard/profile"
              className={`flex items-center rounded-md px-6 text-base font-semibold max-lg:h-9 max-lg:px-4 lg:h-12 ${
                transparent
                  ? 'bg-white text-secondary-500 hover:bg-whitesmoke'
                  : 'bg-secondary-500 text-white hover:bg-secondary-400'
              }`}
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <Link
              href="/signup"
              className={`flex items-center rounded-md px-6 text-base font-semibold max-lg:h-9 max-lg:px-4 lg:h-12 ${
                transparent
                  ? 'bg-white text-secondary-500 hover:bg-whitesmoke'
                  : 'bg-secondary-500 text-white hover:bg-secondary-400'
              }`}
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className={`flex items-center rounded-md border px-6 text-base font-semibold max-lg:h-9 max-lg:px-4 lg:h-12 ${
                transparent
                  ? 'border-opacity-30 text-white hover:bg-secondary-400'
                  : 'border-transparent text-secondary-500 hover:bg-whitesmoke'
              }`}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export function NavbarPlaceholder() {
  return <div className="h-[78px] lg:h-[94px]"></div>;
}
