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
    <div
      style={{ backgroundImage: `url(${CurveBackground.src})` }}
      className={'flex justify-between'}
    >
      <div className={'ml-40 w-1/3 pt-20'}>
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
        alt={'Beautiful Image of a mountain and sea'}
      />
    </div>
  );
}
