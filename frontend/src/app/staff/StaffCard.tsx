import React from 'react';
import { Staff } from './Staff';
import Image from 'next/image';

export default function StaffCard({
  key,
  person,
}: {
  key: number;
  person: Staff;
}) {
  return (
    <div
      key={key}
      className={'flex flex-col items-center justify-center px-5 font-manrope'}
    >
      <Image
        src={person.image}
        alt={person.name + ' ' + person.surname}
        width={200}
        height={200}
        className={'rounded-full'}
      />
      <div className={'pt-3 text-base font-semibold text-black'}>
        {person.name} {person.surname}
      </div>
      <div className={'text-xs font-normal text-[#8A8998]'}>{person.team}</div>
    </div>
  );
}
