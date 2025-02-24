'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Dropdown from './dashboard/DropDown';

const links = [
  { href: '/', label: 'Home' },
  { href: '/seminars', label: 'Seminars' },
  { href: '/round-tables', label: 'Round Tables' },
  { href: '/about', label: 'About Us' },
];

export default function Navbar({ fixed = true, isAuthenticated = false }) {
  const [transparent, setTransparent] = useState(fixed);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <>
      <nav
        className={`${!fixed ? 'static' : 'fixed left-0 right-0 top-0 z-50'} ${
          transparent
            ? 'bg-transparent text-white'
            : 'border-b border-neutral-200 bg-white text-darkslategray-100'
        } px-6 py-5 duration-200`}
      >
        <div className="mx-auto flex h-[38px] max-w-[1200px] items-center justify-between lg:h-[54px]">
          <div className="flex shrink-0 items-center gap-x-4">
            <button
              className="flex w-6 flex-col items-stretch gap-y-1 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="h-0.5 rounded-full bg-current"></div>
              <div className="h-0.5 rounded-full bg-current"></div>
              <div className="h-0.5 rounded-full bg-current"></div>
            </button>
            <Link href="/">
              <Logo className="max-lg:w-[40.8px] lg:w-[58px]" />
            </Link>
          </div>
          <div className="hidden items-center justify-center gap-8 max-lg:gap-4 md:flex">
            <Link href="/" className="block px-4 py-3">
              Home
            </Link>
            <Link href="/seminars" className="block px-4 py-3">
              Seminars
            </Link>
            <Link href="/round-tables" className="block px-4 py-3">
              Round Tables
            </Link>
            <Link href="/about" className="block px-4 py-3">
              About Us
            </Link>
            {/*<Link href="/poster-session" className="relative block px-4 py-3">*/}
            {/*  Poster Session*/}
            {/*  <span className="absolute -right-2 -top-1 animate-pulse rounded-full border-2 bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-white">*/}
            {/*    NEW*/}
            {/*  </span>*/}
            {/*</Link>*/}
          </div>
          {/*{isAuthenticated ? (*/}
          {/*  <div className="flex items-center gap-1.5">*/}
          {/*    <Link*/}
          {/*      href="/dashboard/profile"*/}
          {/*      className={`flex items-center rounded-md px-6 text-base font-semibold max-lg:h-9 max-lg:px-4 lg:h-12 ${*/}
          {/*        transparent*/}
          {/*          ? 'bg-white text-secondary-500 hover:bg-whitesmoke'*/}
          {/*          : 'bg-secondary-500 text-white hover:bg-secondary-400'*/}
          {/*      }`}*/}
          {/*    >*/}
          {/*      Dashboard*/}
          {/*    </Link>*/}
          {/*  </div>*/}
          {/*) : (*/}
          {/*  <div className="flex items-center gap-1.5">*/}
          {/*    <Link*/}
          {/*      href="/signup"*/}
          {/*      className={`flex items-center rounded-md px-6 text-base font-semibold max-lg:h-9 max-lg:px-4 lg:h-12 ${*/}
          {/*        transparent*/}
          {/*          ? 'bg-white text-secondary-500 hover:bg-whitesmoke'*/}
          {/*          : 'bg-secondary-500 text-white hover:bg-secondary-400'*/}
          {/*      }`}*/}
          {/*    >*/}
          {/*      Sign Up*/}
          {/*    </Link>*/}
          {/*    <Link*/}
          {/*      href="/login"*/}
          {/*      className={`flex items-center rounded-md border px-6 text-base font-semibold max-lg:h-9 max-lg:px-4 lg:h-12 ${*/}
          {/*        transparent*/}
          {/*          ? 'border-opacity-30 text-white hover:bg-secondary-400'*/}
          {/*          : 'border-transparent text-secondary-500 hover:bg-whitesmoke'*/}
          {/*      }`}*/}
          {/*    >*/}
          {/*      Login*/}
          {/*    </Link>*/}
          {/*  </div>*/}
          {/*)}*/}
          <Dropdown transparent={transparent} />
        </div>
      </nav>
      <div
        className={`fixed inset-0 z-50 flex bg-black duration-200 ${
          sidebarOpen ? 'bg-opacity-30' : 'pointer-events-none bg-opacity-0'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <aside
          className={`h-full w-2/3 max-w-xs divide-y divide-lightslategray divide-opacity-20 bg-white font-medium duration-200 ${
            sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
        >
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="block px-4 py-3">
              {label}
            </Link>
          ))}
          {/*<Link href="/poster-session" className="relative block px-4 py-3">*/}
          {/*  Poster Session*/}
          {/*  <span className="absolute right-2 animate-pulse rounded-full border-2 bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-white">*/}
          {/*    NEW*/}
          {/*  </span>*/}
          {/*</Link>*/}
        </aside>
      </div>
    </>
  );
}

export function NavbarPlaceholder() {
  return <div className="h-[78px] lg:h-[94px]"></div>;
}
