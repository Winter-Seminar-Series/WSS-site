'use client';

import React from 'react';

export default function AttendanceInfo() {
  return (
    <div className={'flex-col items-center justify-between mt-5 w-full'}>
      <div className={'flex items-start justify-between w-full'}>
        <div className={'flex-col font-medium text-base text-lightslategray'}>
          MODE OF ATTENDANCE
          <div className={'flex flex-row items-center mt-2 font-semibold text-lg text-darkslategray-100'}>
            <input type={'radio'} id={'Online'} name={'modeOfAttendance'} value={'Online'} />
            <label htmlFor={'Online'} className={'ml-2'}>Online</label>
            <input type={'radio'} id={'In Person'} name={'modeOfAttendance'} value={'In Person'}
                   className={'ml-5'} />
            <label htmlFor={'In Person'} className={'ml-2'}>In Person</label>
          </div>
        </div>

        <div className={'flex-col font-medium text-base text-lightslategray w-1/2'}>
          NATIONAL CODE (NEEDED FOR ENTRANCE)
          <input type={'text'}
                 className={'mt-2 w-full h-14 px-5 py-4 font-semibold text-lg text-darkslategray-100 border border-lightslategray border-opacity-30 rounded-lg focus:outline-none'} />
        </div>
      </div>


      <div className={'flex items-start justify-between w-full mt-12'}>
        <div className={'flex-col font-medium text-base text-lightslategray w-1/2'}>
          PRICE
          <div className={'flex items-end text-black font-semibold'}>
            <div className={'text-4xl'}>120000</div>
            <div className={'text-base'}>&nbsp;Tomans</div>
          </div>
        </div>

        <div className={'flex-col font-medium text-base text-lightslategray w-1/2'}>
          DISCOUNT CODE
          <div className={'mt-2 flex grow-[2] outline outline-1 outline-lightslategray/[0.3] rounded-lg m-0'}>
            <input type={'text'}
                   className={'w-full h-14 px-5 py-4 font-semibold text-lg text-darkslategray-100 focus:outline-none'} />
          <button className={'mr-5 text-primary font-semibold text-lg'}>
            APPLY
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// border border-lightslategray border-opacity-30 rounded-md