'use client';

export default function ProfileCompletionWarning() {
  return (
    <div
      className={
        'flex w-full items-center justify-between rounded-md bg-[#E7ECF3] p-5 font-semibold'
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
      <div
        className={
          'flex cursor-pointer items-center justify-center text-lg text-primary'
        }
      >
        PROFILE
        <img
          src="/source/dashboard/register/rightArrow.svg"
          className={'ml-2'}
        />
      </div>
    </div>
  );
}
