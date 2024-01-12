import React from 'react';
import ViewAllButton from './ViewAllButton';

export default function StaffHeader() {
  return (
    <div className={'flex items-center justify-between px-32 pt-20 pb-10'}>
      <div>
        <div
          className="text-lg font-medium uppercase tracking-wide text-neutral-400"
        >
          Overline Goes Here
        </div>
        <div
          className={
            'font-manrope text-5xl mt-2 font-bold text-darkslategray-100'
          }
        >
          Staff Members
        </div>
      </div>
      <ViewAllButton text={'View All'} />
    </div>
  );
}
