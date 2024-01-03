import React from 'react';
import { FieldType } from './Form';
import { FormType } from './Form';

export default function FormField({ key, formType, title, placeholder, type }: {
  key: string,
  formType: FormType
} & FieldType) {
  return (
    <div
      key={key}
      className={'flex flex-col mt-7'}
    >
      <div className={'flex justify-between'}>
        <label className={'uppercase text-lightslategray font-medium text-base tracking-wide'} htmlFor={key}>
          {title}
        </label>
        {
          formType == 'logIn' && title == 'Password' && (
            <span className={'text-primary font-medium underline cursor-pointer'}>
              Forgot password?
            </span>
          )
        }
      </div>
      <input
        className={'text-darkslategray/100 placeholder-lightslategray h-14 border border-lightslategray rounded-md mt-2 pl-3 p-2'}
        type={type} placeholder={placeholder} id={key}
      />
    </div>
  );
}
