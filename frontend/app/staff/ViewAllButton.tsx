import React from 'react';
import Image from 'next/image';

export default function ViewAllButton({ text }: { text: string }) {
  return (
    <button
      className={
        'font-manrope mb-3 flex items-center justify-center rounded-md bg-secondary px-8 py-5 text-lg font-bold text-white'
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
