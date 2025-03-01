import React from 'react';
import { FormType } from './Form';
import Link from 'next/link';

export default function SubButtonText({ formType }: { formType: FormType }) {
  return (
    <div className={'mt-5 flex'}>
      <p className={'text-darkslategray/100 text-lg'}>
        {formType !== 'requestResetPassword' &&
          formType !== 'confirmNewPassword' &&
          (formType === 'signUp'
            ? 'Already have an account?'
            : "Don't have an account?")}
        <Link
          href={formType === 'signUp' ? '/login' : '/signup'}
          className={
            'ml-1 cursor-pointer font-medium text-primary hover:underline focus:underline'
          }
        >
          {formType !== 'requestResetPassword' &&
            formType !== 'confirmNewPassword' &&
            (formType === 'signUp' ? 'Log in' : 'Sign up')}
        </Link>
      </p>
    </div>
  );
}
