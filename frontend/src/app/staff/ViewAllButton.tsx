import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ViewAllButton({ text }: { text: string }) {
  return (
    <Link
    href="/about#staff-area"
      className={
        'font-manrope mb-3 flex items-center justify-center rounded-md bg-secondary hover:bg-secondary-400 px-8 py-5 text-lg font-bold text-white'
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
    </Link>
  );
}
