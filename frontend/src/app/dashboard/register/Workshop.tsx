'use client';

import React from 'react';
import { workshopType } from './RegisterForm';

export default function Workshop({
  key,
  workshop,
}: {
  key: string;
  workshop: workshopType;
}) {
  const getOrderedDay = (day: number) => {
    if (day === 1 || day === 21 || day === 31) return `${day}st`;
    else if (day === 2 || day === 22) return `${day}nd`;
    else if (day === 3 || day === 23) return `${day}rd`;

    return `${day}th`;
  };

  return (
    <div
      key={key}
      className={'w-fit flex-col items-center justify-between pt-4'}
    >
      <div
        className={'relative z-10 mx-auto w-fit flex-col items-end justify-end'}
      >
        <img
          src={'/source/dashboard/register/checkMark.svg'}
          alt={'attended'}
          width={40}
          height={40}
          className={`translate-x-[-50%] translate-y-[50%] ${
            workshop.isAttended ? 'visible' : 'invisible'
          }`}
        />
        <img
          src={workshop.image}
          alt={workshop.name}
          width={298}
          height={199}
        />
      </div>

      <div
        className={`z-0 w-[330px] -translate-y-[25%] rounded-lg p-5 pt-24
          ${
          workshop.isAttended
            ? 'border-[0.7px] border-secondary'
            : 'border border-[#C9C9CF] border-opacity-40'
        }`}
      >
        <div
          className={
            'mb-2 flex items-center text-xs font-medium text-lightslategray'
          }
        >
          <img src={'/source/dashboard/register/calendar.svg'} alt={'calendar logo'} />
          <div className={'ml-1'}>
            {workshop.startMonth.toUpperCase()}{' '}
            {getOrderedDay(workshop.startDay)} -{' '}
            {workshop.endMonth.toUpperCase()} {getOrderedDay(workshop.endDay)}
          </div>
          <img
            src={'/source/dashboard/register/module.svg'}
            alt={'module logo'}
            className={'ml-3'}
          />
          <div className={'ml-1'}>{workshop.moduleNumber} MODULES</div>
        </div>

        <div className={'mb-3 line-clamp-2 text-base font-semibold text-black'}>
          {workshop.name}
        </div>

        <div className={'mb-5 flex items-end text-black'}>
          <div className={'text-2xl font-semibold'}>{workshop.price}</div>
          <div className={'text-sm font-medium'}>&nbsp;Tomans</div>
        </div>

        <div className={'flex items-center justify-between'}>
          <button
            className={
              'mr-2 w-full rounded-md bg-[#EBE8F2] py-4 text-xs font-bold text-secondary'
            }
          >
            View Details
          </button>
          <button
            className={
              'w-full rounded-md bg-secondary py-4 text-xs font-bold text-white'
            }
          >
            {workshop.isAttended ? 'Remove' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
