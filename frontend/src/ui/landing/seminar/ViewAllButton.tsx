import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ViewAllButton({
  text,
  width,
}: {
  text: string;
  width?: number;
}) {
  return (
    <Link
      href={'/seminars'}
      className={
        'font-manrope flex w-fit items-center justify-center rounded-md bg-white px-8 py-5 text-lg font-bold hover:bg-whitesmoke '
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
    </Link>
  );
}
