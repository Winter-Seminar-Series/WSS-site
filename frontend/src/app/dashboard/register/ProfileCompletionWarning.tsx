'use client';

import Link from 'next/link';

export default function ProfileCompletionWarning() {
  return (
    <div
      className={
        'flex w-full items-center justify-between rounded-md bg-rose-300 p-5 font-semibold'
      }
    >
      <div
        className={
          'flex items-center justify-center text-xl text-darkslategray-100'
        }
      >
        <img
          src="/source/dashboard/register/warning.svg"
          alt={'warning'}
          className={'mr-3'}
        />
        Please complete your profile information first
      </div>
    </div>
  );
}
