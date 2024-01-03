import React from 'react';

export default function FormHeader({ overline, title }: { overline: string, title: string }) {
  return (
    <div className={'flex items-center justify-between px-32 pt-20'}>
      <div>
        <div
          className={'font-manrope font-medium text-left text-base text-lightslategray uppercase'}
        >
          {overline}
        </div>
        <div className={'-mt-2 font-manrope text-[76px] font-bold text-darkslategray/100'}>
          {title}
        </div>
      </div>
    </div>
  );
}