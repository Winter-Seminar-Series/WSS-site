import React from 'react';
import ViewAllButton from './ViewAllButton';

export default function StaffHeader() {
  return (
    <div className={'flex items-center justify-between px-32 pb-10 pt-20'}>
      <div>
        <div className="text-lg font-medium uppercase tracking-wide text-neutral-400">
          Overline Goes Here
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
