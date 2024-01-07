import React from 'react';
import Form from '../../ui/forms/Form';

export default function LogInForm() {
  return (
    <Form
      formType={'login'}
      overline={'Overline goes here'}
      title={'Log In'}
      fields={[
        {
          title: 'Email',
          name: 'email',
          placeholder: 'Enter your email address',
          type: 'email',
        },
        {
          title: 'Password',
          name: 'password',
          placeholder: 'Enter your password',
          type: 'password',
        },
      ]}
    />
  );
}
