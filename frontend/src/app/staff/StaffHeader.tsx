import React from 'react';
import ViewAllButton from './ViewAllButton';

export default function StaffHeader() {
  return (
    <div
      className={
        'flex items-center justify-between gap-y-6 px-32 pb-10 pt-20 max-md:flex-col'
      }
    >
      <div>
        <div className="text-lg font-medium uppercase tracking-wide text-neutral-400">
          The heartbeat of the event
        </div>
        <div
          className={
            'font-manrope mt-2 text-5xl font-bold text-darkslategray-100'
          }
        >
          Staff Members
        </div>
      </div>
      <ViewAllButton text={'View All'} />
    </div>
  );
}
