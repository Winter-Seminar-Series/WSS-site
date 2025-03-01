'use client';

import React, { useState } from 'react';
import Form from '../../ui/components/forms/Form';
import resetPassword from '../../lib/api/auth/resetPassword';

export default function PasswordResetForm() {
  const [error, setError] = useState('');
  return (
    <Form
      error={error}
      formType={'requestResetPassword'}
      overline={'Secure Your Space!'}
      title={'Password Reset'}
      onSubmit={async (data) => {
        setError('');
        const response = await resetPassword(data);
        if (response.error) {
          setError(response.error);
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
