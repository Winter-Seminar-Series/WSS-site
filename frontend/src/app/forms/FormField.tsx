import React from 'react';
import { FieldType } from './Form';
import { FormType } from './Form';

export default function FormField({
  key,
  formType,
  title,
  placeholder,
  type,
}: {
  key: string;
  formType: FormType;
} & FieldType) {
  return (
    <div key={key} className={'mt-7 flex flex-col'}>
      <div className={'flex justify-between'}>
        <label
          className={
            'text-base font-medium uppercase tracking-wide text-lightslategray'
          }
          htmlFor={key}
        >
          {title}
        </label>
        {formType == 'logIn' && title == 'Password' && (
          <span className={'cursor-pointer font-medium text-primary underline'}>
            Forgot password?
          </span>
        )}
      </div>
      <input
        className={
          'text-darkslategray/100 mt-2 h-14 rounded-md border border-lightslategray p-2 pl-3 placeholder-lightslategray'
        }
        type={type}
        placeholder={placeholder}
        id={key}
      />
    </div>
  );
}
