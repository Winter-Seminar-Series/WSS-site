import React from 'react';
import linkedin from './assets/linkedin.svg';
import instagram from './assets/instagram.svg';
import facebook from './assets/facebook.svg';
import SeminarLogo from './SeminarLogo';
import { Speaker } from '../../../lib/types';

export default function SeminarCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className={'w-fit flex-col items-center justify-between px-5 pt-20'}>
      <div className={'relative z-10 mx-auto flex w-fit justify-end'}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={speaker.image}
          alt={speaker.name}
          width={200}
          height={200}
          className={'relative z-0'}
        />
      </div>
      <div
        className={
          'font-manrope z-0 w-[230px] -translate-y-[50%] rounded-lg bg-white pb-5 pl-4 pt-[40%] text-sm font-normal text-[#8A8998]'
        }
      >
        <div className={'pb-1 pt-3.5 text-xl font-semibold text-black'}>
          {speaker.name}
        </div>
        <div>• {speaker.designation}</div>
      </div>
    </div>
  );
}
