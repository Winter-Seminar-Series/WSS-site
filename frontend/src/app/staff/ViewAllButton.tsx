import React from 'react';
import Image from 'next/image';

export default function ViewAllButton({
  text,
  width,
}: {
  text: string;
  width?: number;
}) {
  return (
    <button
      className={
        'bg-secondary mb-3 flex items-center justify-center rounded-md px-8 py-5 font-manrope text-lg font-bold text-white'
      }
    >
      <div>{text}</div>
      <Image
        src={'/source/arrow_right_white.svg'}
        alt={'view all arrow'}
        width={20}
        height={20}
        className={'ml-3'}
      />
    </button>
  );
}
