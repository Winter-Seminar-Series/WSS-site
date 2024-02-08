import React from 'react';
import PreArrow from './assets/pre arrow.svg';
import NextArrow from './assets/next arrow.svg';
import NextPreButton from './NextPreButton';

export default function SeminarHeader() {
  return (
    <div className={'flex items-center justify-between px-32 pt-20'}>
      <div>
        <div
          className={
            'font-manrope text-left text-lg font-medium uppercase text-white/60'
          }
        >
          Unveiling the Frontiers of Knowledge
        </div>
        <div className={'font-manrope mt-2 text-5xl font-bold text-white'}>
          Seminars
        </div>
      </div>
      <div className={'flex'}>
        <NextPreButton src={PreArrow} direction={'pre'} />
        <NextPreButton src={NextArrow} direction={'next'} className={'ml-4'} />
      </div>
    </div>
  );
}
