import React from 'react';
import { FormType } from './Form';

export default function SubButtonText({ formType }: { formType: FormType }) {
  return (
    <div className={'mt-5 flex'}>
      <p className={'text-darkslategray/100 text-lg'}>
        {formType !== 'resetPassword' &&
          (formType === 'signUp'
            ? 'Already have an account?'
            : "Don't have an account?")}
        <span
          className={'ml-1 cursor-pointer font-medium text-primary underline'}
        >
          {formType !== 'resetPassword' &&
            (formType === 'signUp' ? 'Log in' : 'Sign up')}
        </span>
      </p>
    </div>
  );
}
