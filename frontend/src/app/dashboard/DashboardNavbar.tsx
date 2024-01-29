'use client';

import { Tab } from '@headlessui/react';
import LogoutButton from '../../ui/components/dashboard/LogoutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardNavbar() {
  const pathname = usePathname();
  const isProfile = pathname === '/dashboard/profile';
  const isRegister = pathname === '/dashboard/register';

  return (
    <div className="flex items-center justify-between self-stretch border-b border-solid border-b-[rgba(138,137,152,0.30)]">
      <div className="flex flex-row gap-0">
        <div
          className={`flex items-center justify-center gap-2 border-b-2 border-solid px-6 py-5 ${
            isProfile ? 'border-b-primary' : undefined
          }`}
        >
          <div className={isProfile ? 'filtered' : undefined}>
            <img src="/source/Profile.svg" />
          </div>
          <Link
            href="/dashboard/profile"
            className={`text-xl font-semibold not-italic leading-[normal] tracking-[-0.2px] ${
              isProfile ? 'text-primary' : 'text-darkslategray-100'
            }`}
          >
            Profile
          </Link>
        </div>
        <div
          className={`flex items-center justify-center gap-2 border-b-2 border-solid px-6 py-5 ${
            isRegister ? 'border-b-primary' : undefined
          }`}
        >
          <div className={isRegister && 'border-b-primary'}>
            {/* <div className={isRegister ? 'filtered' : undefined}> */}
            <img className="fill-primary" src="/source/TicketStar.svg" />
            {/* </div> */}
            <Link
              href="/dashboard/register"
              className={`text-xl font-semibold not-italic leading-[normal] tracking-[-0.2px] ${
                isRegister ? 'text-primary' : 'text-darkslategray-100'
              }`}
            >
              Registration
            </Link>
          </div>
        </div>
        {/* <div className="flex items-center justify-center gap-2 px-6 py-5">
        <img src="/source/Play.svg" />
        <a className="text-xl font-semibold not-italic leading-[normal] tracking-[-0.2px] text-[#1F2B3D]">
          Stream
        </a>
      </div> */}
      </div>
      <LogoutButton />
    </div>
  );
}