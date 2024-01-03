import React from 'react';
import FormHeader from './FormHeader';
import Image from 'next/image';
import BeautifulImage from './assets/beautiful image.svg';
import CurveBackground from './assets/curve background.svg';

export type FieldType = {

  title: string,
  hint: string,
  type: 'text' | 'password' | 'email',
}

export type FieldsType = FieldType[];

export default function Form({ formType, overline, title, fields, submitText = 'Submit', onSubmit }: {
  formType: 'signUp' | 'logIn' | 'resetPassword',
  overline: string,
  title: string,
  fields: FieldsType,
  submitText?: string,
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void,
}) {
  return (
    <div style={{ backgroundImage: `url(${CurveBackground.src})` }}
         className={'flex justify-between'}>
      <div>
        <FormHeader overline={overline} title={title} />

      </div>
      <Image src={BeautifulImage} alt={'Beautiful Image of a mountain and sea'} />
    </div>
  );
}