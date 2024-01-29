'use client';

import React, { useState } from 'react';
import { ModeOfAttendance } from '../../../lib/types';

export default function AttendanceInfo({
  modesOfAttendance,
  selectPlan,
  removePlan,
}: {
  modesOfAttendance: ModeOfAttendance[];
  selectPlan: (planId: number) => void;
  removePlan: (planId: number) => void;
}) {
  console.log(modesOfAttendance);
  const [selectedModeIndex, setSelectedModeIndex] = useState<number>(
    modesOfAttendance.findIndex((mode) => mode.paid),
  );

  const onModeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const id = parseInt(event.target.value);
    console.log(id);
    const previousSelectedMode = modesOfAttendance[selectedModeIndex];
    if (previousSelectedMode && previousSelectedMode.paid) {
      return;
    }
    if (previousSelectedMode) {
      removePlan(previousSelectedMode.id);
    }
    const newSelectedMode = modesOfAttendance.findIndex(
      (mode) => mode.id === id,
    );
    setSelectedModeIndex(newSelectedMode);
    selectPlan(id);
  };

  return (
    <div className={'mt-5 w-full flex-col items-center justify-between'}>
      <div className={'flex w-full items-start justify-between'}>
        <div className={'flex-col text-base font-medium text-lightslategray'}>
          MODE OF ATTENDANCE
          <div
            className={
              'mt-2 flex flex-row items-center text-lg font-semibold text-darkslategray-100'
            }
          >
            {modesOfAttendance.map((modeOfAttendance) => (
              <div key={modeOfAttendance.id} className="pr-6">
                <input
                  type={'radio'}
                  id={modeOfAttendance.name}
                  name={'modeOfAttendance'}
                  value={modeOfAttendance.id}
                  disabled={modesOfAttendance[selectedModeIndex]?.paid}
                  defaultChecked={
                    modesOfAttendance[selectedModeIndex]?.id ===
                    modeOfAttendance.id
                  }
                  onChange={onModeChange}
                />
                <label htmlFor={modeOfAttendance.name} className={'ml-2'}>
                  {modeOfAttendance.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`w-1/2 flex-col text-base font-medium text-lightslategray ${
            modesOfAttendance[selectedModeIndex]?.isNationalCodeRequired
              ? 'visible'
              : 'invisible'
          }`}
        >
          NATIONAL CODE (NEEDED FOR ENTRANCE)
          <input
            type={'text'}
            className={
              'mt-2 h-14 w-full rounded-lg border border-lightslategray border-opacity-30 px-5 py-4 text-lg font-semibold text-darkslategray-100 focus:outline-none'
            }
          />
        </div>
      </div>

      <div className={'mt-12 flex w-full items-start justify-between'}>
        <div
          className={'w-1/2 flex-col text-base font-medium text-lightslategray'}
        >
          PRICE
          <div className={'flex items-end font-semibold text-black'}>
            <div className={'text-4xl'}>120000</div>
            <div className={'text-base'}>&nbsp;Tomans</div>
          </div>
        </div>

        <div
          className={'w-1/2 flex-col text-base font-medium text-lightslategray'}
        >
          DISCOUNT CODE
          <div
            className={
              'm-0 mt-2 flex grow-[2] rounded-lg outline outline-1 outline-lightslategray/[0.3]'
            }
          >
            <input
              type={'text'}
              className={
                'h-14 w-full px-5 py-4 text-lg font-semibold text-darkslategray-100 focus:outline-none'
              }
            />
            <button className={'mr-5 text-lg font-semibold text-primary'}>
              APPLY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// border border-lightslategray border-opacity-30 rounded-md
