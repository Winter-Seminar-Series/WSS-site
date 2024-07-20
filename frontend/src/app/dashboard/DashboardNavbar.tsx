'use client';

import { Tab } from '@headlessui/react';
import LogoutButton from '../../ui/components/dashboard/LogoutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function DashboardNavbar() {
  const pathname = usePathname();
  const isProfile = pathname === '/dashboard/profile';
  const isRegister = pathname === '/dashboard/register';
  const isStream = pathname === '/dashboard/stream';
  const isVideos = pathname === '/dashboard/videos';
  const isCertificates = pathname === '/dashboard/certificates';

  return (
    <div className="flex items-center justify-between self-stretch border-b border-solid border-b-[rgba(138,137,152,0.30)] max-md:-mx-6">
      <div className="flex">
        <div
          className={`flex items-center justify-center gap-2 border-b-2 border-solid px-6 py-5 max-md:gap-1 max-md:px-3 max-md:py-2 ${
            isProfile ? 'border-b-primary' : undefined
          }`}
        >
          <Image
            width={24}
            height={24}
            className={`${
              isProfile ? 'filter-primary' : undefined
            } h-6 w-6 max-md:h-5 max-md:w-5`}
            src="/source/Profile.svg"
            alt=""
          />
          <Link
            href="/dashboard/profile"
            className={`text-xl font-semibold not-italic leading-normal tracking-[-0.2px] max-md:text-base ${
              isProfile ? 'text-primary' : 'text-darkslategray-100'
            }`}
          >
            Profile
          </Link>
        </div>
        <div
          className={`flex items-center justify-center gap-2 border-b-2 border-solid px-6 py-5 max-md:gap-1 max-md:px-3 max-md:py-2 ${
            isRegister ? 'border-b-primary' : undefined
          }`}
        >
          <Image
            width={24}
            height={24}
            className={`${
              isRegister ? 'filter-primary' : undefined
            } h-6 w-6 max-md:h-5 max-md:w-5`}
            src="/source/TicketStar.svg"
            alt=""
          />
          <Link
            href="/dashboard/register"
            className={`text-xl font-semibold not-italic leading-normal tracking-[-0.2px] max-md:text-base ${
              isRegister ? 'text-primary' : 'text-darkslategray-100'
            }`}
          >
            Registration
          </Link>
        </div>
        <div
          className={`flex items-center justify-center gap-2 border-b-2 border-solid px-6 py-5 max-md:gap-1 max-md:px-3 max-md:py-2 ${
            isStream ? 'border-b-primary' : undefined
          }`}
        >
          <Image
            width={24}
            height={24}
            className={`${
              isStream ? 'filter-primary' : undefined
            } h-6 w-6 max-md:h-5 max-md:w-5`}
            src="/source/stream.svg"
            alt=""
          />
          <Link
            href="/dashboard/stream"
            className={`text-xl font-semibold not-italic leading-normal tracking-[-0.2px] max-md:text-base ${
              isStream ? 'text-primary' : 'text-darkslategray-100'
            }`}
          >
            Stream
          </Link>
        </div>
        <div
          className={`flex items-center justify-center gap-2 border-b-2 border-solid px-6 py-5 max-md:gap-1 max-md:px-3 max-md:py-2 ${
            isVideos ? 'border-b-primary' : undefined
          }`}
        >
          <Image
            width={24}
            height={24}
            className={`${
              isVideos ? 'filter-primary' : undefined
            } h-6 w-6 max-md:h-5 max-md:w-5`}
            src="/source/download.svg"
            alt=""
          />
          <Link
            href="/dashboard/videos"
            className={`text-xl font-semibold not-italic leading-normal tracking-[-0.2px] max-md:text-base ${
              isVideos ? 'text-primary' : 'text-darkslategray-100'
            }`}
          >
            Videos
          </Link>
        </div>
        <div
          className={`flex items-center justify-center gap-2 border-b-2 border-solid px-6 py-5 max-md:gap-1 max-md:px-3 max-md:py-2 ${
            isVideos ? 'border-b-primary' : undefined
          }`}
        >
          <Image
            width={24}
            height={24}
            className={`${
              isCertificates ? 'filter-primary' : undefined
            } h-6 w-6 max-md:h-5 max-md:w-5`}
            src="/source/download.svg"
            alt=""
          />
          <Link
            href="/dashboard/certificates"
            className={`text-xl font-semibold not-italic leading-normal tracking-[-0.2px] max-md:text-base ${
              isCertificates ? 'text-primary' : 'text-darkslategray-100'
            }`}
          >
            Certificates
          </Link>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}
