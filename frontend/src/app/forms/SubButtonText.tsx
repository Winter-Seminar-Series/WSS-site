import React from 'react';
import { FormType } from './Form';

export default function SubButtonText({ formType }: { formType: FormType }) {
  return (
    <div className={'flex mt-5'}>
      <p className={'text-darkslategray/100 text-lg'}>
        {
          formType !== 'resetPassword' && (formType === 'signUp'
            ? 'Already have an account?'
            : 'Don\'t have an account?')
        }
        <span className={'text-primary font-medium ml-1 underline cursor-pointer'}>
          {
            formType !== 'resetPassword' && (formType === 'signUp'
              ? 'Log in'
              : 'Sign up')
          }
          </span>
      </p>
    </div>
  );
}