'use client';

import React, { useState } from 'react';
import Form from '../../ui/components/forms/Form';
import resetPassword from '../../lib/api/auth/resetPassword';

export default function PasswordResetForm() {
  const [error, setError] = useState('');
  return (
    <Form
      error={error}
      formType={'resetPassword'}
      overline={'Overline goes here'}
      title={'Password Reset'}
      onSubmit={async (data) => {
        setError('');
        try {
          await resetPassword(data);
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
      ]}
      submitText={'Reset Password'}
    />
  );
}
