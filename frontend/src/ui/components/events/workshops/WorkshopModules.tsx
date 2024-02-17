'use client';

import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { WorkshopSession } from '../../../../lib/types';
import calender from '../../../../app/workshops/assets/Calendar.svg';
import clock from '../../../../app/workshops/assets/Clock.svg';
import { getTimeSpanInMinutes } from '../../../../lib/date';

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short', // 'numeric', '2-digit', 'long', 'short', or 'narrow'
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
                <div className="flex-shrink text-left">
                  Module {index + 1}: {session.name} ({session.speaker.name})
                </div>
                <div className="my-auto flex w-80 flex-shrink flex-grow items-center space-x-4 text-sm font-medium uppercase not-italic leading-[normal] tracking-[0.72px] text-[#8A8998]">
                  <div className="my-auto flex w-fit flex-grow items-center justify-end space-x-2 uppercase">
                    {formatDate(session.date)},{' '}
                    {formatTime(session.startingTime)} -{' '}
                    {formatTime(session.endingTime)}
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
