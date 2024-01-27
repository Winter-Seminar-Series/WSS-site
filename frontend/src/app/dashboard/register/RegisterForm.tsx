'use client';

import { useState } from 'react';
import { ModeOfAttendance, WorkshopType } from '../../../lib/types';
import ProfileCompletionWarning from './ProfileCompletionWarning';
import Workshops from './Workshps';
import AttendanceInfo from './AttendanceInfo';

export type workshopType = {
  image: string,
  startMonth: string,
  startDay: number,
  endMonth: string,
  endDay: number,
  moduleNumber: number,
  name: string,
  price: number,
  isAttended: boolean,
}

export default function RegisterForm({
  // workshops,
  // modesOfAttendance,
  // nationalCode,
}: {
  // workshops: Workshop[];
  // modesOfAttendance: ModeOfAttendance[];
  // nationalCode?: string;
}) {
  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState(false);

  const workshops: workshopType[] = [
    {
      image: '/source/dashboard/register/sample.svg',
      startMonth: 'APRIL',
      startDay: 7,
      endMonth: 'JUNE',
      endDay: 11,
      moduleNumber: 7,
      name: 'Big Data and Artificial Intelligence: Driving Personalised Medicine of the Future',
      price: 120000,
      isAttended: false,
    },
    {
      image: '/source/dashboard/register/sample.svg',
      startMonth: 'APRIL',
      startDay: 7,
      endMonth: 'JUNE',
      endDay: 11,
      moduleNumber: 7,
      name: 'Big Data and Artificial Intelligence: Driving Personalised Medicine of the Future',
      price: 120000,
      isAttended: true,
    },
    {
      image: '/source/dashboard/register/sample.svg',
      startMonth: 'APRIL',
      startDay: 7,
      endMonth: 'JUNE',
      endDay: 11,
      moduleNumber: 7,
      name: 'Big Data and Artificial Intelligence: Driving Personalised Medicine of the Future',
      price: 120000,
      isAttended: true,
    },
    {
      image: '/source/dashboard/register/sample.svg',
      startMonth: 'APRIL',
      startDay: 7,
      endMonth: 'JUNE',
      endDay: 11,
      moduleNumber: 7,
      name: 'Big Data and Artificial Intelligence: Driving Personalised Medicine of the Future',
      price: 120000,
      isAttended: false,
    },
    {
      image: '/source/dashboard/register/sample.svg',
      startMonth: 'APRIL',
      startDay: 7,
      endMonth: 'JUNE',
      endDay: 11,
      moduleNumber: 7,
      name: 'Big Data and Artificial Intelligence: Driving Personalised Medicine of the Future',
      price: 120000,
      isAttended: true,
    }
  ]

  return (
    <>
      <ProfileCompletionWarning />
      <div className={'flex w-full flex-col'}>
        <div
          className={
            'text-4xl font-bold tracking-[-0.72px] text-darkslategray-100'
          }
        >
          Workshops
        </div>
        <Workshops workshops={workshops} />
      </div>
      <div>
        <div
          className={
            'text-4xl font-bold tracking-[-0.72px] text-darkslategray-100'
          }
        >
          Attendance Info
        </div>
        <AttendanceInfo />
      </div>
    </>
  );
}
