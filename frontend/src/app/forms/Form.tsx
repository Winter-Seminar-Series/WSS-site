import React from 'react';
import FormHeader from './FormHeader';
import Image from 'next/image';
import BeautifulImage from './assets/beautiful image.svg';
import CurveBackground from './assets/curve background.svg';
import FormFields from './FormFields';
import SubButtonText from './SubButtonText';

export type FieldType = {
  title: string;
  placeholder: string;
  type: 'text' | 'password' | 'email';
};

export type FieldsType = FieldType[];

export type FormType = 'signUp' | 'logIn' | 'resetPassword';

export default function Form({
  formType,
  overline,
  title,
  fields,
  submitText = 'Submit',
  onSubmit,
}: {
  formType: FormType;
  overline: string;
  title: string;
  fields: FieldsType;
  submitText?: string;
  onSubmit?: () => void;
}) {
  return (
    <div className="flex min-h-screen max-md:flex-col">
      <div className="relative shrink-0 px-6 pt-20 md:w-1/2 md:px-10 lg:px-20">
        <Image alt="" src={CurveBackground} className="absolute left-0 top-0" />
        <FormHeader overline={overline} title={title} />
        <FormFields formType={formType} fields={fields} />
        <button
          onClick={onSubmit}
          className={
            'mt-8 h-16 w-full rounded-md bg-secondary text-lg font-medium text-white'
          }
        >
          {submitText}
        </button>
        <SubButtonText formType={formType} />
      </div>
      <Image
        src={BeautifulImage}
        className="self-stretch object-cover max-md:hidden md:w-1/2"
        alt={'Beautiful Image of a mountain and sea'}
      />
    </div>
  );
}
