import React from 'react';
import Image from 'next/image';

export default function SeminarLogo({
  logo,
  alt,
}: {
  logo: string;
  alt: string;
}) {
  return (
    <button
      className={
        'mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-white bg-opacity-40'
      }
    >
      <Image src={logo} alt={alt} width={13} height={13} />
    </button>
  );
}
