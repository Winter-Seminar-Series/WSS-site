import React from 'react';
import { Staff } from '../staff/Staff';
import Image from 'next/image';

interface TeamSectionProps {
  teamName: string;
  staff: Staff[];
}

const TeamSection = ({ teamName, staff }: TeamSectionProps) => {
  return (
    <div className="pb-14">
      <div className="mb-10 flex items-center justify-center px-12">
        <hr className="mr-8 flex-grow border-neutral-200" />
        <span className="text-[40px] font-bold text-slate-800 ">
          {teamName}
        </span>
        <hr className="ml-8 flex-grow border-neutral-200" />
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {staff.map((person, index) => (
          <StaffCard2 key={index} person={person} />
        ))}
      </div>
    </div>
  );
};

function StaffCard2({ person }: { person: Staff }) {
  return (
    <div
      className={'font-manrope flex flex-col items-center justify-center px-5'}
    >
      <Image
        src={person.image}
        alt={person.name + ' ' + person.surname}
        width={200}
        height={200}
        className={'rounded-full'}
      />
      <div className={'pt-3 text-base font-semibold text-black'}>
        {person.name}
      </div>
      <div className={'text-base font-semibold text-black'}>
        {person.surname}
      </div>
    </div>
  );
}

export default TeamSection;
