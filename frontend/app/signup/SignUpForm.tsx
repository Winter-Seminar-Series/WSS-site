import React from 'react';
import Form from '../../ui/forms/Form';
import signUp from '../../lib/api/auth/signUp';

export default function SignUpForm() {
  return (
    <Form
      formType={'signUp'}
      overline={'Overline goes here'}
      title={'Sign Up'}
      onSubmit={signUp}
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
        {
          title: 'Confirm Password',
          name: 'confirmPassword',
          placeholder: 'Confirm your password',
          type: 'password',
        },
      ]}
    />
  );
}
