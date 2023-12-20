import React from 'react';
import Image from 'next/image';

export default function SeminarLogo({logo, alt}: {logo: string, alt: string}) {
  return (
    <button className={'flex justify-center items-center bg-white bg-opacity-40 rounded-full mt-2 w-7 h-7'}>
      <Image src={logo} alt={alt} width={13} height={13}/>
    </button>
  )
}