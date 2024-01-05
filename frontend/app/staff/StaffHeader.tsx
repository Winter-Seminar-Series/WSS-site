import React from 'react';
import ViewAllButton from './ViewAllButton';

export default function StaffHeader() {
  return (
    <div className={'flex items-center justify-between px-32 pt-20'}>
      <div>
        <div
          className={
            'font-manrope text-left text-lg font-medium uppercase text-lightslategray'
          }
        >
          Overline Goes Here
        </div>
        <div
          className={
            'font-manrope text-45xl -mt-2 font-bold text-darkslategray-100'
          }
        >
          Staff Members
        </div>
      </div>
      <ViewAllButton text={'View All'} />
    </div>
  );
}
