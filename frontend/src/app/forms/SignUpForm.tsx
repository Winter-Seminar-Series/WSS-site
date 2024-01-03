import React from 'react';
import Form from './Form';

export default function SignUpForm() {
  return (
    <Form
      formType={'signUp'}
      overline={'Overline goes here'}
      title={'Sign Up'}
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
        {
          title: 'Confirm Password',
          placeholder: 'Confirm your password',
          type: 'password',
        },
      ]}
    />
  );
}
