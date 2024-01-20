import React from 'react';
import Footer from '../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../ui/components/Navbar';
import Timer from '../../ui/components/Timer';
import Programs from '../../ui/components/Programs';
import TeamSection from './TeamSection';
import { fetchStaffTeams } from '../../lib/api/about/staff';
import { isAuthenticated } from '../../lib/auth';

export default async function AboutUs() {
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
              <p className="text-[20px] font-medium uppercase not-italic leading-[normal] tracking-[0.8px] text-[#8A8998]">
                Overline goes here
              </p>
              <p className="text-[76px] font-bold not-italic leading-[76px] tracking-[-1.52px] text-[#1F2B3D]">
                About Us
              </p>
              <p className="flex items-center justify-center gap-[13px] pb-4 pt-10 text-lg leading-relaxed text-neutral-400">
                The Winter Seminar Series (WSS) has been established to bring
                together successful Iranians from around the world and build a
                professional community focused on computer science and
                engineering topics. Over the years, this seminar has grown to
                become one of the premier events at the Sharif University of
                Technology. WSS is open to anyone who works in or is interested
                in computer science topics and seeks to share and express their
                ideas and research.
              </p>
              <p className="flex items-center justify-center gap-[13px] py-4 text-lg leading-relaxed text-neutral-400">
                WSS was initiated 8 years ago by the Student Scientific Chapter
                at Sharif University of Technology as a global effort to connect
                expert researchers. Currently, WSS is held as a four-day event
                where speakers present their research and ideas each day, while
                also sharing their findings and teaching related topics.
              </p>
              <p className="flex items-center justify-center gap-[13px] py-4 text-lg leading-relaxed text-neutral-400">
                This event comprises presentations and roundtable discussions
                covering various science and engineering topics. It provides a
                platform for networking and exchange of knowledge among
                participants with a shared interest in computer science and
                engineering.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-12">
        <Programs showButton={false} />
      </div>

      <StaffArea />
      {staffTeams.map((staffTeam) => (
        <TeamSection
          key={staffTeam.id}
          teamName={staffTeam.name}
          staff={staffTeam.members.map((members) => members.staff)}
        />
      ))}
      <Timer />
      <Footer />
    </>
  );
}

function StaffArea() {
  return (
    <div id="staff-area" className="mx-auto pb-14 pt-28 text-center">
      <div className="text-lg font-medium uppercase tracking-wide text-neutral-400">
        Overline Goes Here
      </div>
      <div className="text-[64px] font-bold text-slate-800">Staff Members</div>
    </div>
  );
}
