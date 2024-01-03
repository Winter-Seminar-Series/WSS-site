import React from 'react';
import { FieldType } from './Form';

export default function FormField({ title, hint, type }: FieldType) {
  return (
    <div className={'flex flex-col items-center justify-center w-full'}>
      <div className={'flex flex-col items-start justify-center w-full'}>
        <label htmlFor={title}
               className={'font-manrope font-medium text-left text-base text-lightslategray uppercase'}>
          {title}
        </label>
        <input id={title}
               type={type}
               className={'w-full px-4 py-2 mt-2 border border-lightslategray rounded-lg focus:outline-none focus:ring-2 focus:ring-darkslategray/50'}
               placeholder={hint} />
      </div>
    </div>
  );
}