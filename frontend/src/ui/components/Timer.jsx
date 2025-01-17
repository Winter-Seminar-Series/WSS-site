'use client';

import useTimer from '../hooks/timer';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Timer() {
  const timer = useTimer();
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-16 text-white"
      style={{
        backgroundImage: 'url(/source/footer_rectangle.png)',
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-y-8 px-6 max-md:flex-col">
        <div>
          <p className="font-manrope text-left text-lg font-medium uppercase text-white/60">
            Unlock the gateway to revelation
          </p>
          <h1 className="font-manrope text-4xl font-bold leading-normal text-white">
            Sign Up and Secure Your Spot!
          </h1>
        </div>
        <div className="flex gap-x-4">
          <div className="flex flex-col items-center">
            <span className="w-fit rounded-md border border-white border-opacity-25 p-2 text-center text-2xl font-normal">
              {timer.days.toString().padStart(2, '0')}
            </span>
            <span className="pt-3 text-xs font-light">DAYS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="py-2 text-3xl font-semibold">:</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-12 rounded-md border border-white border-opacity-25 p-2 text-center text-2xl font-normal">
              {timer.hours.toString().padStart(2, '0')}
            </span>
            <span className="pt-3 text-xs font-light">HOURS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="py-2 text-3xl font-semibold">:</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-12 rounded-md border border-white border-opacity-25 p-2 text-center text-2xl font-normal">
              {timer.minutes.toString().padStart(2, '0')}
            </span>
            <span className="pt-3 text-xs font-light">MINUTES</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="py-2 text-3xl font-semibold">:</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-12 rounded-md border border-white border-opacity-25 p-2 text-center text-2xl font-normal">
              {timer.seconds.toString().padStart(2, '0')}
            </span>
            <span className="pt-3 text-xs font-light">SECONDS</span>
          </div>
        </div>
        {/*<Link*/}
        {/*  href="/dashboard/register"*/}
        {/*  className="w-50 flex items-center justify-center rounded-md bg-white px-8 py-5 text-lg font-bold text-darkslategray-100 transition-colors hover:bg-whitesmoke"*/}
        {/*>*/}
        {/*  <div>Register Now</div>*/}
        {/*  <Image*/}
        {/*    src={'/source/arrow_right_black.svg'}*/}
        {/*    alt={'view all arrow'}*/}
        {/*    width={20}*/}
        {/*    height={20}*/}
        {/*    className={'ml-3'}*/}
        {/*  />*/}
        {/*</Link>*/}
      </div>
    </div>
  );
}
