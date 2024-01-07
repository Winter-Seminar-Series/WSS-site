import React from 'react';
import { FieldsType, FormType } from './Form';
import FormField from './FormField';

export default function FormFields({
  formType,
  fields,
}: {
  formType: FormType;
  fields: FieldsType;
}) {
  return (
    <div className={'mt-20'}>
      {fields.map(({ title, name, placeholder, type }) => (
        <FormField
          key={title}
          formType={formType}
          title={title}
          name={name}
          placeholder={placeholder}
          type={type}
        />
      ))}
    </div>
  );
}
