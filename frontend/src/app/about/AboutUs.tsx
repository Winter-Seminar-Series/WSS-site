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
                Discover Our Story
              </p>
              <p className="text-[76px] font-bold not-italic leading-[76px] tracking-[-1.52px] text-[#1F2B3D]">
                About Us
              </p>
              <p className="flex items-center justify-center gap-[13px] pb-4 pt-10 text-lg leading-relaxed text-neutral-400">
                The Winter Seminar Series (WSS) has been established to bridge
                the gap between leading experts and the global academic
                community, fostering a professional environment focused on the
                latest advancements in computer science and engineering. Over
                the past decade, this event has evolved into one of the premier
                events at Sharif University of Technology. WSS is an inclusive
                platform open to students, researchers, and professionals
                worldwide who are interested in sharing their research and
                exploring the future of technology.
              </p>
              <p className="flex items-center justify-center gap-[13px] py-4 text-lg leading-relaxed text-neutral-400">
                WSS was initiated {new Date().getFullYear() - 2015} years ago by
                the Student's Scientific Chapter (SSC) within the Computer
                Engineering Department at Sharif University of Technology as a
                global effort to connect visionaries and researchers. Currently,
                WSS is held as a two-day event where distinguished speakers
                present their cutting-edge findings, while also conducting
                deep-dives into emerging technical topics and teaching
                fundamental concepts to a diverse audience.
              </p>
              <p className="flex items-center justify-center gap-[13px] py-4 text-lg leading-relaxed text-neutral-400">
                The event comprises high-level presentations and interactive
                roundtable discussions covering a broad spectrum of science and
                engineering fields. Beyond knowledge sharing, WSS is dedicated
                to empowering the next generation; we aim to guide participants
                in navigating their academic paths and choosing their
                specialized research fields. It provides a unique space for
                researchers to discover new horizons, exchange innovative ideas,
                and build lasting professional networks in the global computer
                science and engineering landscape.
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
          sort={true}
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
        The heartbeat of the event
      </div>
      <div className="text-[64px] font-bold text-slate-800">Staff Members</div>
    </div>
  );
}
