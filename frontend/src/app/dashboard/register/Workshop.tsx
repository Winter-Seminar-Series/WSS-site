'use client';

import React from 'react';
import { workshopType } from './RegisterForm';

export default function Workshop({ key, workshop }: { key: string, workshop: workshopType }) {
  const getOrderedDay = (day: number) => {
    if (day === 1 || day === 21 || day === 31)
      return `${day}st`;
    else if (day === 2 || day === 22)
      return `${day}nd`;
    else if (day === 3 || day === 23)
      return `${day}rd`;

    return `${day}th`;
  };

  return (
    <div key={key} className={'w-fit flex-col items-center justify-between pt-4'}>
      <div className={'flex-col justify-end items-end relative z-10 mx-auto w-fit'}>
          <img
            src={'/source/dashboard/register/checkMark.svg'}
            alt={'attended'}
            width={40}
            height={40}
            className={`translate-x-[-50%] translate-y-[50%] ${workshop.isAttended ? 'visible' : 'invisible'}`}
          />
        <img
          src={workshop.image}
          alt={workshop.name}
          width={298}
          height={199}
        />
      </div>


      <div
        className={
          `z-0 w-[330px] -translate-y-[25%] rounded-lg p-5 pt-24
          ${workshop.isAttended ? 'border-[0.7px] border-secondary' : 'border border-[#C9C9CF] border-opacity-40'}`
        }
      >
        <div className={'flex items-center font-medium text-xs text-lightslategray mb-2'}>
          <img src={'/source/dashboard/register/calendar.svg'} />
          <div className={'ml-1'}>
            {workshop.startMonth.toUpperCase()} {getOrderedDay(workshop.startDay)} - {workshop.endMonth.toUpperCase()} {getOrderedDay(workshop.endDay)}
          </div>
          <img src={'/source/dashboard/register/module.svg'} className={'ml-3'} />
          <div className={'ml-1'}>
            {workshop.moduleNumber} MODULES
          </div>
        </div>

        <div className={'font-semibold text-base text-black line-clamp-2 mb-3'}>
          {workshop.name}
        </div>

        <div className={'flex items-end text-black mb-5'}>
          <div className={'text-2xl font-semibold'}>
            {workshop.price}
          </div>
          <div className={'text-sm font-medium'}>
            &nbsp;Tomans
          </div>
        </div>

        <div className={'flex items-center justify-between'}>
          <button className={'bg-[#EBE8F2] rounded-md mr-2 py-4 font-bold text-xs text-secondary w-full'}>
            View Details
          </button>
          <button className={'bg-secondary rounded-md py-4 font-bold text-xs text-white w-full'}>
            {workshop.isAttended ? 'Remove' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}