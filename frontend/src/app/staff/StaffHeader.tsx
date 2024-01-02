import React from 'react';
import ViewAllButton from './ViewAllButton';

export default function StaffHeader() {
  return (
    <div className={'flex items-center justify-between px-32 pt-20'}>
      <div>
        <div className={'font-manrope text-lg font-medium text-[#8A8998]'}>
          Overline Goes Here
        </div>
        <div
          className={'-mt-2 font-manrope text-[64px] font-bold text-[#1F2B3D]'}
        >
          Staff Members
        </div>
      </div>
      <ViewAllButton text={'View All'} width={20} />
    </div>
  );
}
