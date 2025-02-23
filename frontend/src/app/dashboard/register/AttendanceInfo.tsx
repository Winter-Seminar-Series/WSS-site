'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ModeOfAttendance } from '../../../lib/types';
import { updateNationalCode } from '../../../lib/api/dashboard/profile';

export default function AttendanceInfo({
                                         modesOfAttendance,
                                         selectPlan,
                                         removePlan,
                                         nationalCode,
                                         setNationalCode,
                                         price,
                                         updatePrice,
                                         discountCode,
                                         setDiscountCode,
                                         selectedModeIndex,
                                         setSelectedModeIndex,
                                         isDiscountCodeValid,
                                         setDiscountCodeValid,
                                       }: {
  modesOfAttendance: ModeOfAttendance[];
  selectPlan: (planId: number) => Promise<void>;
  removePlan: (planId: number) => Promise<void>;
  nationalCode: string;
  setNationalCode: Dispatch<SetStateAction<string>>;
  price: number;
  updatePrice: () => void;
  discountCode: string;
  setDiscountCode: Dispatch<SetStateAction<string>>;
  selectedModeIndex: number;
  setSelectedModeIndex: Dispatch<SetStateAction<number>>;
  isDiscountCodeValid: boolean;
  setDiscountCodeValid: Dispatch<SetStateAction<boolean>>;
}) {
  const [hasNationalCodeChanged, setNationalCodeChanged] = useState(true);
  const [nationalCodeError, setNationalCodeError] = useState('');

  const onModeChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    const id = parseInt(event.target.value);
    const previousSelectedMode = modesOfAttendance[selectedModeIndex];
    if (previousSelectedMode && previousSelectedMode.paid) {
      return;
    }
    if (previousSelectedMode) {
      await removePlan(previousSelectedMode.id);
    }
    const newSelectedMode = modesOfAttendance.findIndex(
      (mode) => mode.id === id,
    );
    setSelectedModeIndex(newSelectedMode);
    await selectPlan(id);
  };

  const onNationalCodeSubmit = async (formData: FormData) => {
    setNationalCodeError('');

    const response = await updateNationalCode(formData);
    if (response.error) {
      setNationalCodeError(response.error);
      return;
    }

    const newNationalCode = formData.get('nationalCode').toString();
    setNationalCodeChanged(false);
    setNationalCode(newNationalCode);
  };

  return (
    <div className={'mt-6 w-full'}>
      <div className="mb-6 text-lg leading-relaxed text-lightslategray">
        The main event spans two days (April 10th - April 11th, 2025), with the
        first day in person and the following day entirely virtual.
        <br />
        <br />
        The plans to participate in the event are as follows:
        <br />
        <ul className="list-outside list-disc pl-[1.5em]">
          <li>
            In person
          </li>
          <li>Online</li>
        </ul>
      </div>
      <div
        className={
          'flex w-full items-start justify-between gap-y-4 max-md:flex-col'
        }
      >
        <div className={'flex-col text-base font-medium text-lightslategray'}>
          MODE OF ATTENDANCE
          <div
            className={
              'mt-2 flex flex-row items-center gap-x-6 text-lg font-semibold text-darkslategray-100 max-md:flex-col max-md:items-start'
            }
          >
            {modesOfAttendance.map((modeOfAttendance) => (
              <label
                key={modeOfAttendance.id}
                className={'flex items-center gap-x-2'}
              >
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
                <span>
                  {modeOfAttendance.name} -{' '}
                  {(modeOfAttendance.price ?? 0).toLocaleString()} Tooman
                </span>
              </label>
            ))}
          </div>
        </div>

        {modesOfAttendance[selectedModeIndex]?.isNationalCodeRequired && (
          <form
            className="w-1/2 flex-col text-base font-medium text-lightslategray max-md:w-full"
            action={onNationalCodeSubmit}
          >
            <p
              className={`bg-red-50 text-red-600 mb-3 w-full rounded-md p-3 font-medium ${
                nationalCodeError ? '' : 'hidden'
              }`}
            >
              {nationalCodeError}
            </p>
            <div>NATIONAL CODE (NEEDED FOR ENTRANCE)</div>
            <div
              className={
                'mt-2 flex rounded-lg outline outline-1 outline-lightslategray/[0.3]'
              }
            >
              <input
                type={'text'}
                name="nationalCode"
                id="nationalCode"
                className={
                  'h-14 w-full px-5 py-4 text-lg font-semibold text-darkslategray-100 focus:outline-none'
                }
                defaultValue={nationalCode}
                required
                onChange={() => setNationalCodeChanged(true)}
              />
              <button
                className={`mr-5 text-lg font-semibold ${
                  hasNationalCodeChanged ? 'text-primary' : 'text-green-600'
                }`}
              >
                UPDATE{!hasNationalCodeChanged && 'D'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
