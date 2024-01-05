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
            'font-manrope text-left text-base font-medium uppercase text-lightslategray'
          }
        >
          {overline}
        </div>
        <div
          className={
            'text-darkslategray/100 font-manrope -mt-2 text-[76px] font-bold'
          }
        >
          {title}
        </div>
      </div>
    </div>
  );
}
