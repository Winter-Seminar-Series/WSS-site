'use client';

import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import clock from './assets/clock.svg';
import play from './assets/play.svg';
import { StreamEvent } from '../../../lib/types';
import { attendStream } from '../../../lib/api/dashboard/stream';

const formatTime = (time: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return time?.toLocaleString('en-US', options);
};

export default function StreamEvent({
  streamEvent,
}: {
  streamEvent: StreamEvent;
}) {
  // @ts-ignore
  const hasStarted = new Date() > streamEvent.startingTime;

  const onAttendClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    const response = await attendStream({ id: streamEvent.id });

    if (response.error) {
      return;
    }

    window.open(response.link, '_blank').focus();
  };

  return (
    <>
      <Disclosure
        as="div"
        className="my-2 rounded-lg border border-solid border-lightslategray/30 p-4"
      >
        {({ open }) => (
          <>
            <div className="flex w-full justify-between font-medium">
              <div className="flex-shrink-1 flex-grow-1 w-4xl flex w-[calc(100%-200px)]">
                <Image
                  src={clock}
                  className={`mx-2 flex-shrink-0 flex-grow-0 ${
                    hasStarted ? 'filter-red' : ''
                  }`}
                  width={22}
                  height={22}
                  alt=""
                />
                {hasStarted ? (
                  <div className="w-18 flex-shrink-0 flex-grow-0 p-3 text-red">
                    Now
                  </div>
                ) : (
                  <div className="w-18 flex-shrink-0 flex-grow-0 p-3 text-lightslategray">
                    {formatTime(streamEvent.startingTime)}
                  </div>
                )}
                <div className="min-w-0 flex-shrink flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap p-3">
                  {streamEvent.title.length > 70
                    ? streamEvent.title.slice(0, 70) + '...'
                    : streamEvent.title}
                </div>
              </div>
              <div className="flex w-fit flex-shrink-0 flex-grow-0 justify-between">
                <Disclosure.Button className="w-32 rounded-md bg-selago p-3 text-center text-secondary-200 transition-colors hover:bg-selago-300">
                  {open ? 'Hide' : 'Show'} Details
                </Disclosure.Button>
                <button
                  onClick={onAttendClick}
                  disabled={!hasStarted}
                  className={`ml-4 flex w-28 justify-around rounded-md bg-secondary p-3 text-center text-white transition-colors hover:bg-secondary-400 ${
                    !hasStarted ? 'opacity-50' : ''
                  }`}
                >
                  <Image src={play} height={22} width={22} alt="" />
                  Attend
                </button>
              </div>
            </div>
            <Disclosure.Panel className="p-4">
              <div
                className="text-base font-normal not-italic leading-[25px] text-lightslategray"
                dangerouslySetInnerHTML={{
                  __html: streamEvent.description,
                }}
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
