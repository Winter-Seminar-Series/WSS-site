'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/source/WSS-LOGO.png';

export default function Navbar({ fixed = true }) {
  const [transparent, setTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setTransparent(window.scrollY <= 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`${!fixed ? 'static' : 'fixed left-0 right-0 top-0 z-50'} ${
        transparent ? 'bg-transparent text-white' : 'bg-white'
      } px-6 py-5 duration-200`}
    >
      <div className="mx-auto flex h-[38px] max-w-[1200px] items-center justify-between lg:h-[54px]">
        <Link href="/" className="shrink-0">
          <Image
            className="max-lg:w-[40.8px] lg:w-[58px]"
            src={Logo}
            alt="WSS Logo"
          />
        </Link>
        <div className="hidden items-center justify-center gap-8 lg:flex">
          <div className="text-base font-medium not-italic leading-[normal] no-underline">
            <div className="relative inline-block">
              <button className="border-[none] bg-[#04aa6d00] p-2.5 text-base">
                9th WSS
                {/* <img
                    src={Frame.src}
                    className="inline-block shrink-0 lg:h-6 lg:w-6"
                  /> */}
              </button>
              <div className="absolute z-[1] hidden bg-[#f1f1f1] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] lg:min-w-[160px]">
                <a href="#">9th Series</a>
                <a href="#">8th Series</a>
                <a href="#">7th Series</a>
                <a href="#">6th Series</a>
                <a href="#">5th Series</a>
                <a href="#">4th Series</a>
                <a href="#">3rd Series</a>
                <a href="#">2nd Series</a>
                <a href="#">1st Series</a>
              </div>
            </div>
          </div>
          <Link href="/" className="block px-4 py-3">
            Home
          </Link>
          <a href="" className="block px-4 py-3">
            Seminars
          </a>
          <a href="" className="block px-4 py-3">
            Lab Talks
          </a>
          <a href="" className="block px-4 py-3">
            Round Tables
          </a>
          <Link href="/about" className="block px-4 py-3">
            About Us
          </Link>
        </div>
        <div className="flex items-center gap-1.5">
          <Link
            href="/signup"
            className="max-lg:w-19 flex items-center justify-center rounded-md bg-white no-underline max-lg:h-9 max-lg:px-4 lg:h-12 lg:gap-2 lg:px-6 lg:py-0"
          >
            <p className="text-base font-semibold not-italic leading-[normal] text-[#0B3678] no-underline">
              Sign Up
            </p>
          </Link>
          <Link
            href="/login"
            className="max-lg:w-19 flex items-center justify-center rounded-md border  border-solid border-[rgba(255,255,255,0.30)] px-6 py-0 max-lg:h-9 max-lg:px-4 lg:h-12 lg:gap-2"
          >
            <p className="text-base font-semibold not-italic leading-[normal] text-white">
              Login
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function NavbarPlaceholder() {
  return <div className="h-[78px] lg:h-[94px]"></div>;
}
