'use client';

import React, { useState } from 'react';
import { Workshop } from '../../../lib/types';
import Image from 'next/image';
import { getOrderedDay } from '../../../lib/date';

export default function WorkshopCard({
  key,
  workshop,
  selectPlan,
  removePlan,
}: {
  key: number;
  workshop: Workshop;
  selectPlan: (planId: number) => Promise<void>;
  removePlan: (planId: number) => Promise<void>;
}) {
  const [isSelected, setSelected] = useState<boolean>(workshop.paid);

  const onButtonClick = async () => {
    if (workshop.paid) return;
    if (isSelected) {
      setSelected(false);
      removePlan(workshop.id);
    } else if (!isSelected) {
      setSelected(true);
      selectPlan(workshop.id);
    }
  };

  return (
    <div key={key} className={'flex-col items-center justify-between'}>
      <div
        className={'relative z-10 mx-auto w-fit flex-col items-end justify-end'}
      >
        <Image
          src={'/source/dashboard/register/checkMark.svg'}
          alt={'attended'}
          width={40}
          height={40}
          className={`translate-x-[-50%] translate-y-[50%] ${
            isSelected ? 'visible' : 'invisible'
          }`}
        />
        <img
          className="rounded-lg"
          src={workshop.thumbnail ?? '/source/dashboard/register/sample.svg'}
          alt={workshop.name}
          width={298}
          height={199}
        />
      </div>

      <div
        className={`z-0 w-full -translate-y-[25%] rounded-lg p-5 pt-24
          ${
            isSelected
              ? 'border-[0.7px] border-secondary'
              : 'border border-[#C9C9CF] border-opacity-40'
          }`}
      >
        <div
          className={
            'mb-2 flex items-center text-xs font-medium text-lightslategray'
          }
        >
          <Image
            src={'/source/dashboard/register/calendar.svg'}
            alt={'calendar logo'}
            width={12}
            height={12}
          />
          <div className={'ml-1'}>
            {workshop.startDate
              ?.toLocaleString('default', { month: 'short' })
              ?.toUpperCase()}{' '}
            {getOrderedDay(workshop.startDate?.getDate())} -{' '}
            {workshop.endDate
              ?.toLocaleString('default', { month: 'short' })
              ?.toUpperCase()}{' '}
            {getOrderedDay(workshop.endDate?.getDate())}
          </div>
          <Image
            src={'/source/dashboard/register/module.svg'}
            alt={'module logo'}
            className={'ml-3'}
            width={12}
            height={12}
          />
          <div className={'ml-1'}>{workshop.sessions.length} MODULES</div>
        </div>

        <div className={'mb-3 line-clamp-2 text-base font-semibold text-black'}>
          {workshop.name}
        </div>

        <div className={'mb-5 flex items-end text-black'}>
          <div className={'text-2xl font-semibold'}>{workshop.price}</div>
          <div className={'text-sm font-medium'}>&nbsp;Rial</div>
        </div>

        <div className={'flex items-center justify-between'}>
          <a
            target="_blank"
            className={
              'mr-2 w-full rounded-md bg-[#EBE8F2] py-4 text-center text-xs font-bold text-secondary'
            }
            href={`/workshop/${workshop.id}`}
          >
            View Details
          </a>
          <button
            onClick={onButtonClick}
            disabled={workshop.paid}
            className={`w-full rounded-md py-4 text-xs font-bold text-white ${
              workshop.paid ? 'bg-green-600' : 'bg-secondary'
            }`}
          >
            {workshop.paid ? 'Registered' : isSelected ? 'Remove' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
