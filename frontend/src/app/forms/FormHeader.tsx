import React from 'react';

export default function FormHeader({
  overline,
  title,
}: {
  overline: string;
  title: string;
}) {
  return (
    <div className={'flex items-center justify-between leading-[76px]'}>
      <div>
        <div
          className={
            'text-left font-manrope text-base font-medium uppercase text-lightslategray'
          }
        >
          {overline}
        </div>
        <div
          className={
            'text-darkslategray/100 -mt-2 font-manrope text-[76px] font-bold'
          }
        >
          {title}
        </div>
      </div>
    </div>
  );
}
