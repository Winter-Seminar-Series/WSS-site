import React from 'react';
import calender from './assets/Calendar.svg';
import clock from './assets/Clock.svg';
import Image from 'next/image';
import { Seminar } from '../../lib/types';
import Link from 'next/link';
import { getTimeSpanInMinutes } from '../../lib/date';

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'long', // 'numeric', '2-digit', 'long', 'short', or 'narrow'
    day: 'numeric', // 'numeric' or '2-digit'
  };
  return date?.toLocaleDateString('en-US', options);
};

const formatTime = (time: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return time?.toLocaleString('en-US', options);
};

export default function SeminarCard({ seminar }: { seminar: Seminar }) {
  return (
    <Link href={`/seminars/${seminar.id}`}>
      <div
        className={
          'flex w-fit flex-col items-center justify-between overflow-hidden px-1'
        }
      >
        <div className="relative z-10 mx-auto h-[231px] w-[347px] overflow-hidden rounded-lg bg-cover">
          <img
            src={seminar?.thumbnail ?? '/source/dashboard/register/sample.svg'}
            alt={seminar?.name}
            className="z-0 w-full"
          />
        </div>

        <div
          style={{ borderColor: 'rgba(201, 201, 207, 0.4)' }}
          className={
            'z-0 -mt-[110px] flex h-[300px] w-[380px] flex-col justify-between rounded-lg border bg-white px-4 pb-5 pt-[130px] text-sm font-normal text-[#8A8998]'
          }
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 uppercase">
              <Image src={calender} alt="" width={20} height={20} />
              <span>
                {formatDate(seminar.date)}, {formatTime(seminar.startingTime)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Image src={clock} alt="" width={20} height={20} />
              <span>
                {getTimeSpanInMinutes(seminar.startingTime, seminar.endingTime)}{' '}
                MINUTES
              </span>
            </div>
          </div>
          <div className="line-clamp-2 w-full overflow-hidden overflow-ellipsis pb-1 text-2xl font-semibold text-black">
            {seminar?.name}
          </div>
          <div className="flex flex-col space-x-1">
            <div className="pb-1 pt-3.5 text-xl font-semibold text-black">
              {seminar.speaker.name}
            </div>
            <div className="text-sm font-normal text-[#8A8998]">
              {seminar.speaker.designation}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
