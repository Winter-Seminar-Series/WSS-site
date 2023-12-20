import React from 'react';
import { Staff } from './Staff';
import Image from 'next/image';

export default function StaffCard({ key, person }: { key: number, person: Staff }) {
  return (
    <div key={key} className={'flex flex-col justify-center items-center px-5 font-manrope'}>
      <Image src={person.image} alt={person.name + ' ' + person.surname} width={200} height={200}
             className={'rounded-full'} />
      <div className={'font-semibold text-base text-black pt-3'}>
        {person.name} {person.surname}
      </div>
      <div className={'font-normal text-xs text-[#8A8998]'}>
        {person.team}
      </div>
    </div>
  );
}