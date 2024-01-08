import React from 'react';
import Image from 'next/image';
import type { Staff } from '../../lib/types';
import Sample from './assets/Sample.svg';


export default function StaffCard({ person }: { person: Staff }) {
  return (
    <div
      className={'flex flex-col items-center justify-center px-5'}
    >
      <Image
        src={person.image ?? Sample.src}
        alt={person.name}
        width={200}
        height={200}
        className={'rounded-full'}
      />
      <div className={'pt-3 text-base font-semibold text-black'}>
        {person.name}
      </div>
      <div className={'text-xs font-normal text-lightslategray'}>
        {person.team}
      </div>
    </div>
  );
}
