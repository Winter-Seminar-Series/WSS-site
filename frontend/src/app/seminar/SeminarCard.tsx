import React from 'react';
import linkedin from './assets/linkedin.svg';
import instagram from './assets/instagram.svg';
import facebook from './assets/facebook.svg';
import { Person } from './Seminar';
import Image from 'next/image';
import SeminarLogo from './SeminarLogo';

export default function SeminarCard({ key, person }: { key: number, person: Person }) {
  return (
    <div key={key} className={'flex-col justify-between items-center w-fit px-5 pt-20'}>
      <div className={'flex w-fit justify-end relative mx-auto z-10'}>
        <div className={'absolute flex-col z-10 mt-1 mr-2'}>
          <SeminarLogo logo={linkedin.src} alt={'linkedin'} />
          <SeminarLogo logo={instagram.src} alt={'instagram'} />
          <SeminarLogo logo={facebook.src} alt={'facebook'} />
        </div>
        <Image src={person.image} alt={person.name} width={200} height={200} className={'relative z-0'}/>
      </div>
      <div className={'bg-white rounded-lg font-manrope font-normal text-sm text-[#8A8998] w-[230px] pl-4 pt-[40%] pb-5 -translate-y-[50%] z-0'}>
        <div className={'font-semibold text-xl text-black pb-1 pt-3.5'}>
          {person.name} {person.surname}
        </div>
        <div>
          • {person.position}
        </div>
        <div>
          • {person.university}
        </div>
      </div>
    </div>
  );
}