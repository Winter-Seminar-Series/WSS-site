'use client';

import { useState } from 'react';
import ProfileCompletionWarning from './ProfileCompletionWarning';
import Workshops from './Workshops';
import AttendanceInfo from './AttendanceInfo';
import { ModeOfAttendance, Workshop } from '../../../lib/types';

export default function RegisterForm({
  workshops,
  modesOfAttendance,
  nationalCode,
  isProfileComplete,
}: {
  workshops: Workshop[];
  modesOfAttendance: ModeOfAttendance[];
  nationalCode?: string;
  isProfileComplete: boolean;
}) {
  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState<number[]>(
    workshops
      .filter((workshop) => workshop.paid)
      .map((workshop) => workshop.id),
  );

  const selectPlan = (planId: number) => {
    setSelectedPlans((selectedPlans) => [...selectedPlans, planId]);
  };

  const removePlan = (planId: number) => {
    setSelectedPlans((selectedPlans) =>
      selectedPlans.filter((selectedPlanId) => selectedPlanId !== planId),
    );
  };

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
