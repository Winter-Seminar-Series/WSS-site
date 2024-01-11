'use client';

import React, { useState } from 'react';
import Form from '../../ui/components/forms/Form';
import signUp from '../../lib/api/auth/signUp';

export default function SignUpForm() {
  const [error, setError] = useState('');
  return (
    <Form
      error={error}
      formType={'signUp'}
      overline={'Overline goes here'}
      title={'Sign Up'}
      onSubmit={async (data) => {
        setError('');
        try {
          await signUp(data);
        } catch (error) {
          setError(error.message);
        }
      }}
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
