import React from 'react';
import ViewAllButton from './ViewAllButton';

export default function StaffHeader() {
  return (
    <div className={'flex items-center justify-between px-32 pt-20'}>
      <div>
        <div
          className={
            'text-left font-manrope text-lg font-medium uppercase text-lightslategray'
          }
        >
          Overline Goes Here
        </div>
        <div
          className={
            '-mt-2 font-manrope text-45xl font-bold text-darkslategray-100'
          }
        >
          Staff Members
        </div>
      </div>
      <ViewAllButton text={'View All'} width={20} />
    </div>
  );
}
