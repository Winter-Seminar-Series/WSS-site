import React from "react";
import Image from 'next/image';

export default function NextPreButton({src, direction, className}: {src: string, direction: 'next' | 'pre', className?: string}) {
  return (
    <button className={'flex justify-center items-center bg-white rounded-full w-12 h-12 ' + className}>
      <Image src={src} alt={direction + ' arrow'} className={'w-7 h-7'}/>
    </button>
  )
}