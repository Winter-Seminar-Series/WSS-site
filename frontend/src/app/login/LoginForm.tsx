'use client';

import React, { useState } from 'react';
import Form from '../../ui/components/forms/Form';
import login from '../../lib/api/auth/login';

export default function LogInForm() {
  const [error, setError] = useState('');
  return (
    <Form
      error={error}
      formType={'login'}
      overline={'Overline goes here'}
      title={'Log In'}
      onSubmit={async (data) => {
        setError('');
        try {
          await login(data);
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
      ]}
    />
  );
}
