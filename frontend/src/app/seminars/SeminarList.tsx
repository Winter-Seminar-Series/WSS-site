import React from 'react';
import Footer from '../../ui/components/Footer';
import ServerNavbar from '../../ui/components/ServerNavbar';
import { NavbarPlaceholder } from '../../ui/components/Navbar';
import Timer from '../../ui/components/Timer';
import SeminarCard from './SeminarCard';
import { fetchSeminars } from '../../lib/api/events/seminar';

export default async function SeminarList() {
  const seminars = await fetchSeminars();

  return (
    <>
      <ServerNavbar />
      <NavbarPlaceholder />
      <div
        style={{ backgroundImage: 'url(/source/SmallRectangle.png)' }}
        className="absolute left-0 right-0 top-0 -z-10 h-[220px] w-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)]">
        <div className="flex max-w-[1199px] flex-col items-start justify-center gap-8 px-[72px] py-[60px]">
          <div className="ml-18 flex flex-row items-start justify-between self-stretch lg:max-w-[1055px]">
            <div className="flex-col gap-2">
              <p className="max-md:text-md text-xl font-medium uppercase not-italic leading-[normal] tracking-[0.8px] text-[#8A8998]">
                Exploring Boundaries
              </p>
              <p className="text-[76px] font-bold not-italic leading-none tracking-[-1.52px] text-[#1F2B3D] max-md:text-5xl">
                Seminars
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-14 pt-14">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-12">
          {seminars.map((seminar, index) => (
            <SeminarCard key={index} seminar={seminar} />
          ))}
        </div>
      </div>
      <Timer />
      <Footer />
    </>
  );
}
