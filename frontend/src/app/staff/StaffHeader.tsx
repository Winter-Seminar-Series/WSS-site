import React from 'react';
import ViewAllButton from './ViewAllButton';

export default function StaffHeader() {
  return (
    <div className={'flex items-center justify-between px-32 pt-20'}>
      <div>
        <div className={'font-manrope font-medium text-left text-lg text-lightslategray uppercase'}>
          Overline Goes Here
        </div>
        <div
          className={'-mt-2 font-manrope text-[64px] font-bold text-darkslategray-100'}
        >
          Staff Members
        </div>
      </div>
      <ViewAllButton text={'View All'} width={20} />
    </div>
  );
}
