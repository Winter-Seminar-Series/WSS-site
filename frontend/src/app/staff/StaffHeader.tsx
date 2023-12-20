import React from "react";
import ViewAllButton from './ViewAllButton';

export default function StaffHeader() {
  return (
    <div className={'flex justify-between items-center px-32 pt-20'}>
      <div>
        <div className={'font-manrope font-medium text-lg text-[#8A8998]'}>
          Overline Goes Here
        </div>
        <div className={'font-manrope font-bold text-[64px] text-[#1F2B3D] -mt-2'}>
          Staff Members
        </div>
      </div>
      <ViewAllButton text={'View All'} width={20} />
    </div>
  )
}