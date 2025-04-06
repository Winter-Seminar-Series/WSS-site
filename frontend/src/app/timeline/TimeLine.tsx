import React from 'react';
import Footer from '../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../ui/components/Navbar';
import Timer from '../../ui/components/Timer';
import { isAuthenticated } from '../../lib/auth';
import path from 'path';
import fs from 'fs';

export default async function TimeLine() {
  const authenticated = await isAuthenticated();

  const markdownContent = fs.readFileSync(
    path.join(process.cwd(), 'public', 'posterSessionDescription.md'),
    'utf-8',
  );

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <div
        style={{ backgroundImage: 'url(/source/Rectangle.png)' }}
        className="absolute left-0 right-0 top-0 -z-10 h-[400px] w-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)]">
        <div className="flex max-w-[1199px] flex-col items-start justify-center gap-0 px-[72px] py-[60px] shadow-2xl">
          <div className="ml-18 flex h-fit flex-col items-start justify-between self-stretch lg:max-w-[1055px]">
            <p className="text-[20px] font-medium uppercase not-italic leading-[normal] tracking-[0.8px] text-[#8A8998]">
              April 10th, 2025 - April 11th, 2025
            </p>
            <p className="text-[64px] font-bold not-italic leading-[76px] tracking-[-1.52px] text-[#1F2B3D]">
              TimeLine
            </p>
          </div>

          <div className="flex w-full items-center justify-center ">
            <hr className="mr-6 flex-grow border-neutral-300" />
            <span className="text-[40px] font-bold text-slate-600 ">
              First Day
            </span>
            <hr className="ml-6 flex-grow border-neutral-300 " />
          </div>
          <img src={'https://s3.ir-thr-at1.arvanstorage.ir/wss/10th-WSS-timeline1'} className={' mt-4'} />

          <div className="mt-8 flex w-full items-center justify-center">
            <hr className="mr-6 flex-grow border-neutral-300" />
            <span className="text-[40px] font-bold text-slate-600 ">
              Second Day
            </span>
            <hr className="ml-6 flex-grow border-neutral-300 " />
          </div>
          <img src={'https://s3.ir-thr-at1.arvanstorage.ir/wss/10th-WSS-timeline2'} className={' mt-4'} />
        </div>
      </div>
      <Timer />
      <Footer />
    </>
  );
}
