'use client';

import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { WorkshopSession } from '../../../../lib/types';
import calender from '../../../../app/workshops/assets/Calendar.svg';
import clock from '../../../../app/workshops/assets/Clock.svg';
import { getTimeSpanInMinutes } from '../../../../lib/date';

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

export default function WorkshopModules({
  sessions,
}: {
  sessions: WorkshopSession[];
}) {
  return (
    <div className="w-full space-y-2">
      <div className="text-[32px] font-semibold not-italic leading-[normal] tracking-[-0.32px] text-black">
        Modules
      </div>
      {sessions?.map((session, index) => (
        <Disclosure
          as="div"
          className="rounded-lg border border-solid border-[rgba(201,201,207,0.40)] p-4"
          key={session.id}
        >
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between gap-2 text-base font-medium not-italic leading-[normal] tracking-[-0.16px] text-black">
                <span>
                  Module {index + 1}: {session.name} ({session.speaker.name})
                </span>
                <div className="flex items-center space-x-4 text-sm font-medium uppercase not-italic leading-[normal] tracking-[0.72px] text-[#8A8998]">
                  <div className="flex justify-end">
                    <div className="flex items-center space-x-2 uppercase">
                      <Image src={calender} alt="" width={16} height={16} />
                      <span>
                        {formatDate(session.date)},{' '}
                        {formatTime(session.startingTime)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 pl-3">
                      <Image src={clock} alt="" width={16} height={16} />
                      <span>
                        {getTimeSpanInMinutes(
                          session.startingTime,
                          session.endingTime,
                        )}{' '}
                        MINUTES
                      </span>
                    </div>
                  </div>
                  <Image
                    src="/Arrow.svg"
                    alt=""
                    width={24}
                    height={24}
                    className={open ? 'rotate-180' : ''}
                  />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="p-4">
                <div
                  className="text-base font-normal not-italic leading-[25px] text-[#8A8998]"
                  dangerouslySetInnerHTML={{
                    __html: session.description,
                  }}
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
