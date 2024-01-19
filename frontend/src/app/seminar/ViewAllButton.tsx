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
        'font-manrope m-auto mb-3 flex items-center justify-center rounded-md bg-white hover:bg-whitesmoke px-8 py-5 text-lg font-bold'
      }
    >
      <div>{text}</div>
      <Image
        src={'/source/arrow_right_black.svg'}
        alt={'view all arrow'}
        width={20}
        height={20}
        className={'ml-3'}
      />
    </button>
  );
}
