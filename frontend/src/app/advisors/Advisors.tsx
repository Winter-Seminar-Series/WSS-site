import React from 'react';
import Footer from '../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../ui/components/Navbar';
import Timer from '../../ui/components/Timer';
import Programs from '../../ui/components/Programs';
import TeamSection from '../about/TeamSection';
import { fetchStaffTeams } from '../../lib/api/about/staff';
import { isAuthenticated } from '../../lib/auth';
import { shuffle } from '../../lib/collections';
import { advisorsData } from '../../ui/landing/advisors/Advisors';

export default async function Advisors() {
  const staffTeams = await fetchStaffTeams();
  const authenticated = await isAuthenticated();

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <div
        style={{ backgroundImage: 'url(/source/Rectangle.png)' }}
        className="absolute left-0 right-0 top-0 -z-10 h-[400px] w-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)]">
        <div className="flex max-w-[1199px] flex-col items-start justify-center gap-8 px-[72px] py-[60px]">
          <div className="ml-18 flex flex-row items-start justify-between self-stretch lg:max-w-[1055px]">
            <div className="flex-col gap-2">
              <TeamSection
                sort={false}
                key={1}
                teamName={'Scientific Advisors'}
                staff={advisorsData}
              />
            </div>
          </div>
        </div>
      </div>

      <Timer />
      <Footer />
    </>
  );
}
