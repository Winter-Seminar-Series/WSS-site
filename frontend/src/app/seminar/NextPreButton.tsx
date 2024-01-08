import React from 'react';
import Image from 'next/image';

export default function NextPreButton({
  src,
  direction,
  className,
}: {
  src: string;
  direction: 'next' | 'pre';
  className?: string;
}) {
  return (
    <button
      className={
        'flex h-12 w-12 items-center justify-center rounded-full bg-white ' +
        className
      }
    >
      <Image src={src} alt={direction + ' arrow'} className={'h-7 w-7'} />
    </button>
  );
}
