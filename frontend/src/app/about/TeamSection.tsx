import React from 'react';
import Sample from '../../ui/landing/staff/assets/Sample.svg';
import type { Staff } from '../../lib/types';

export default function TeamSection({
                                      teamName,
                                      staff,
                                      sort = true,
                                    }: {
  teamName: string;
  staff: Staff[];
  sort: Boolean
}) {
  const priorityKeywords = [
    'President',
    'Vice President',
    'Head',
    'Sub-Head',
    'Senior',
  ];
  return (
    <div className="pb-14">
      <div className="mb-10 flex items-center justify-center px-12">
        <hr className="mr-8 flex-grow border-neutral-200" />
        <span className="text-[40px] font-bold text-slate-800 ">
          {teamName}
        </span>
        <hr className="ml-8 flex-grow border-neutral-200 " />
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {staff
          .slice()
          .sort((a, b) => {
            if (!sort) {
              return 1;
            }
            const aPriority = priorityKeywords.findIndex((keyword) =>
              a.designation.startsWith(keyword),
            );
            const bPriority = priorityKeywords.findIndex((keyword) =>
              b.designation.startsWith(keyword),
            );
            if (aPriority !== -1 && bPriority !== -1) {
              return aPriority - bPriority;
            } else if (aPriority !== -1) {
              return -1;
            } else if (bPriority !== -1) {
              return 1;
            }
            return a.designation.localeCompare(b.designation);
          })
          .map((person, index) => (
            <StaffCard2 key={index} person={person} />
          ))}
      </div>
    </div>
  );
}

function StaffCard2({ person }: { person: Staff }) {
  return (
    <div
      className={'font-manrope flex flex-col items-center justify-center px-5'}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={person.image ?? Sample.src}
        alt={person.name}
        width={200}
        height={200}
        className={'rounded-full'}
        loading="lazy"
      />
      <div className={'pt-3 text-base font-semibold text-black'}>
        {person.name}
      </div>
      <div className={'text-base font-semibold text-black'}>
        {person.designation}
      </div>
    </div>
  );
}
