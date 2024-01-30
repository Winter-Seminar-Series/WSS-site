'use client';

import { useCallback, useEffect, useState } from 'react';
import ProfileCompletionWarning from './ProfileCompletionWarning';
import Workshops from './Workshops';
import AttendanceInfo from './AttendanceInfo';
import { ModeOfAttendance, Workshop } from '../../../lib/types';
import { fetchPrice } from '../../../lib/api/dashboard/register';

export default function RegisterForm({
  workshops,
  modesOfAttendance,
  profileNationalCode,
  isProfileComplete,
}: {
  workshops: Workshop[];
  modesOfAttendance: ModeOfAttendance[];
  profileNationalCode?: string;
  isProfileComplete: boolean;
}) {
  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [price, setPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountCodeValid, setDiscountCodeValid] = useState(true);
  const [nationalCode, setNationalCode] = useState(profileNationalCode);
  const [selectedPlans, setSelectedPlans] = useState<number[]>(
    workshops
      .filter((workshop) => workshop.paid)
      .map((workshop) => workshop.id),
  );

  const selectPlan = useCallback(async (planId: number) => {
    setSelectedPlans((selectedPlans) => [...selectedPlans, planId]);
  }, []);

  const removePlan = useCallback(async (planId: number) => {
    setSelectedPlans((selectedPlans) =>
      selectedPlans.filter((selectedPlanId) => selectedPlanId !== planId),
    );
  }, []);

  const updatePrice = useCallback(async () => {
    if (!selectedPlans || !selectedPlans.length) {
      setPrice(0);
      return;
    }
    const {
      price: { calculatedPrice },
      isDiscountCodeValid,
      error,
    } = await fetchPrice(selectedPlans, discountCode);
    if (!isDiscountCodeValid) {
      setDiscountCodeValid(false);
      return;
    }
    setDiscountCodeValid(true);
    setPrice(calculatedPrice);
  }, [discountCode, selectedPlans]);

  useEffect(() => {
    const doUpdatePrice = async () => {
      await updatePrice();
    };

    doUpdatePrice();
  }, [updatePrice]);

  return (
    <>
      {!isProfileComplete && <ProfileCompletionWarning />}
      <div className={'flex w-full flex-col'}>
        <div
          className={
            'py-4 text-4xl font-bold tracking-[-0.72px] text-darkslategray-100'
          }
        >
          Workshops
        </div>
        <Workshops
          workshops={workshops}
          selectPlan={selectPlan}
          removePlan={removePlan}
        />
      </div>
      <div className={'flex w-full flex-col'}>
        <div
          className={
            'text-4xl font-bold tracking-[-0.72px] text-darkslategray-100'
          }
        >
          Attendance Info
        </div>
        <AttendanceInfo
          modesOfAttendance={modesOfAttendance}
          selectPlan={selectPlan}
          removePlan={removePlan}
          nationalCode={nationalCode}
          setNationalCode={setNationalCode}
          price={price}
          updatePrice={updatePrice}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          isDiscountCodeValid={isDiscountCodeValid}
          setDiscountCodeValid={setDiscountCodeValid}
        />

        <button
          className={
            'mt-14 w-full rounded-lg bg-secondary py-6 text-xl font-bold text-white'
          }
        >
          Checkout
        </button>
      </div>
    </>
  );
}
