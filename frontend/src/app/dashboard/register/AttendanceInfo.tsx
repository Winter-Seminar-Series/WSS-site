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
  isDiscountCodeValid: boolean;
  setDiscountCodeValid: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedModeIndex, setSelectedModeIndex] = useState<number>(
    modesOfAttendance.findIndex((mode) => mode.paid),
  );
  const [hasNationalCodeChanged, setNationalCodeChanged] = useState(true);
  const [nationalCodeError, setNationalCodeError] = useState('');
  const [inputDiscountCode, setInputDiscountCode] = useState(discountCode);

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

  const onDiscountCodeChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setDiscountCodeValid(true);
    setInputDiscountCode(event.target.value);
  };

  const onDiscountCodeClick: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    setDiscountCode(inputDiscountCode);
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

        {modesOfAttendance[selectedModeIndex]?.isNationalCodeRequired && (
          <form
            className="w-1/2 flex-col text-base font-medium text-lightslategray"
            action={onNationalCodeSubmit}
          >
            <p
              className={`mb-3 w-full rounded-md bg-red-50 p-3 font-medium text-red-600 ${
                nationalCodeError ? 'visible' : 'invisible'
              }`}
            >
              {nationalCodeError}
            </p>
            <div>NATIONAL CODE (NEEDED FOR ENTRANCE)</div>
            <div
              className={
                'm-0 mt-2 flex grow-[2] rounded-lg outline outline-1 outline-lightslategray/[0.3]'
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

      <div className={'mt-12 flex w-full items-start justify-between'}>
        <div
          className={'w-1/2 flex-col text-base font-medium text-lightslategray'}
        >
          PRICE
          <div className={'flex items-end font-semibold text-black'}>
            <div className={'text-4xl'}>{price}</div>
            <div className={'text-base'}>&nbsp;Tomans</div>
          </div>
        </div>

        <div
          className={'w-1/2 flex-col text-base font-medium text-lightslategray'}
        >
          <p
            className={`mb-3 w-full rounded-md bg-red-50 p-3 font-medium text-red-600 ${
              isDiscountCodeValid ? 'invisible' : 'visible'
            }`}
          >
            Discount code is invalid.
          </p>
          <div>DISCOUNT CODE</div>
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
              name="discountCode"
              id="discountCode"
              defaultValue={discountCode}
              onChange={onDiscountCodeChange}
            />
            <button
              className={'mr-5 text-lg font-semibold text-primary'}
              onClick={onDiscountCodeClick}
            >
              APPLY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// border border-lightslategray border-opacity-30 rounded-md
