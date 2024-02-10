import React from 'react';
import calender from './assets/Calendar.svg';
import category from './assets/Category.svg';
import Image from 'next/image';
import { Workshop } from '../../lib/types';
import Link from 'next/link';

export default function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long', // 'numeric', '2-digit', 'long', 'short', or 'narrow'
      day: 'numeric', // 'numeric' or '2-digit'
    };
    return date?.toLocaleDateString('en-US', options);
  };

  return (
    <Link href={`/workshops/${workshop.id}`}>
      <div
        className={
          'flex w-fit flex-col items-center justify-between overflow-hidden px-1'
        }
      >
        <div className="relative z-10 mx-auto h-[231px] w-[347px] overflow-hidden rounded-lg bg-cover">
          <img
            src={workshop?.thumbnail ?? '/source/dashboard/register/sample.svg'}
            alt={workshop?.name}
            className="z-0 w-full"
          />
        </div>

        <div
          style={{ borderColor: 'rgba(201, 201, 207, 0.4)' }}
          className={
            'z-0 -mt-[110px] flex h-[360px] w-[380px] flex-col justify-between rounded-lg border bg-white px-4 pb-5 pt-[130px] text-sm font-normal text-[#8A8998]'
          }
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Image src={calender} alt="Calendar" width={20} height={20} />
              <span>
                {formatDate(workshop?.startDate)?.toUpperCase()} -{' '}
                {formatDate(workshop?.endDate)?.toUpperCase()}{' '}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Image src={category} alt="Category" width={20} height={20} />
              <span>{workshop?.sessions?.length ?? 0} MODULES</span>
            </div>
          </div>
          <div className="verflow-hidden line-clamp-2 w-full overflow-ellipsis pb-1 pt-3.5 text-xl font-semibold text-black">
            {workshop?.name}
          </div>
          <div className="flex items-center space-x-1">
            <div className="pb-1 pt-3.5 text-xl font-semibold text-black">
              {(workshop?.price ?? 0).toLocaleString()}
            </div>
            <div className="pt-4 text-base font-medium text-black">Tooman</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
