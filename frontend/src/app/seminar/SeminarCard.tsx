import React from 'react';
import linkedin from './assets/linkedin.svg';
import instagram from './assets/instagram.svg';
import facebook from './assets/facebook.svg';
import { Person } from './Seminar';
import Image from 'next/image';
import SeminarLogo from './SeminarLogo';

export default function SeminarCard({
  key,
  person,
}: {
  key: number;
  person: Person;
}) {
  return (
    <div className={'w-fit flex-col items-center justify-between px-5 pt-20'}>
      <div className={'relative z-10 mx-auto flex w-fit justify-end'}>
        <div className={'absolute z-10 mr-2 mt-1 flex-col'}>
          <SeminarLogo logo={linkedin.src} alt={'linkedin'} />
          <SeminarLogo logo={instagram.src} alt={'instagram'} />
          <SeminarLogo logo={facebook.src} alt={'facebook'} />
        </div>
        <Image
          src={person.image}
          alt={person.name + ' ' + person.surname}
          width={200}
          height={200}
          className={'relative z-0'}
        />
      </div>
      <div
        className={
          'z-0 w-[230px] -translate-y-[50%] rounded-lg bg-white pb-5 pl-4 pt-[40%] font-manrope text-sm font-normal text-[#8A8998]'
        }
      >
        <div className={'pb-1 pt-3.5 text-xl font-semibold text-black'}>
          {person.name} {person.surname}
        </div>
        <div>• {person.position}</div>
        <div>• {person.university}</div>
      </div>
    </div>
  );
}
