'use client'

export default function ProfileCompletionWarning() {
  return (
    <div className={'flex justify-between items-center bg-[#E7ECF3] w-full p-5 rounded-md font-semibold'}>
      <div className={'flex items-center justify-center text-xl text-darkslategray-100'}>
        <img src='/source/dashboard/register/warning.svg' alt={'warning'} className={'mr-3'} />
        Please complete your profile information first
      </div>
      <div className={'flex items-center justify-center text-primary text-lg cursor-pointer'}>
        PROFILE
        <img src='/source/dashboard/register/rightArrow.svg' className={'ml-2'} />
      </div>
    </div>
  )
}