import React from 'react';
import PreArrow from './assets/pre arrow.svg';
import NextArrow from './assets/next arrow.svg';
import NextPreButton from './NextPreButton';

export default function SeminarHeader() {
  return (
    <div className={'flex items-center justify-between px-32 pt-20'}>
      <div>
        <div
          className={'font-manrope text-lg font-medium text-white opacity-60'}
        >
          Overline Goes Here
        </div>
        <div className={'-mt-2 font-manrope text-[64px] font-bold text-white'}>
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
