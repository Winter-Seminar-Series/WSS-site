import React from 'react';
import Arrow from './assets/view all arrow.svg';
import Image from 'next/image';

export default function ViewAllButton({ text, width }: { text: string, width?: number }) {
  return (
    <button className={'flex justify-center items-center rounded-md m-auto bg-white py-5 px-8 mb-3 font-manrope font-bold text-lg'}>
      <div>
        {text}
      </div>
      <Image src={Arrow} alt={'view all arrow'} width={width} height={width} className={'ml-3'} />
    </button>
  );
}