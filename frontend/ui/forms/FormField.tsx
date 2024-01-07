import React from 'react';
import { FieldType } from './Form';
import { FormType } from './Form';
import Link from 'next/link';

export default function FormField({
  formType,
  title,
  name,
  placeholder,
  type,
}: {
  formType: FormType;
} & FieldType) {
  return (
    <div className={'mt-7 flex flex-col'}>
      <div className={'flex justify-between'}>
        <label
          className={
            'text-base font-medium uppercase tracking-wide text-lightslategray'
          }
          htmlFor={name}
        >
          {title}
        </label>
        {formType == 'login' && title == 'Password' && (
          <Link
            className={
              'cursor-pointer font-medium text-primary hover:underline focus:underline'
            }
            href="/reset-password"
          >
            Forgot password?
          </Link>
        )}
      </div>
      <input
        className={
          'text-darkslategray/100 mt-2 h-14 rounded-md border border-lightslategray p-2 pl-3 placeholder-lightslategray'
        }
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
      />
    </div>
  );
}
