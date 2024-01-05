import React from 'react';
import Form from './Form';

export default function LogInForm() {
  return (
    <Form
      formType={'logIn'}
      overline={'Overline goes here'}
      title={'Log In'}
      fields={[
        {
          title: 'Email',
          placeholder: 'Enter your email address',
          type: 'email',
        },
        {
          title: 'Password',
          placeholder: 'Enter your password',
          type: 'password',
        },
      ]}
    />
  );
}
