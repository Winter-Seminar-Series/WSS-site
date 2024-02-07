'use client';

import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { WorkshopSession } from '../../../../lib/types';

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
                <Image
                  src="/Arrow.svg"
                  alt=""
                  width={24}
                  height={24}
                  className={open ? 'rotate-180' : ''}
                />
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
