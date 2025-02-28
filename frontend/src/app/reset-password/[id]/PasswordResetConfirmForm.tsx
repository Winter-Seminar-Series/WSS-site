'use client';

import React, { useState } from 'react';
import Form from '../../../ui/components/forms/Form';
import confirmResetPassword from '../../../lib/api/auth/confirmResetPassword';

export default function PasswordResetConfirmForm({ token }: { token: string }) {
  const [error, setError] = useState('');
  return (
    <Form
      error={error}
      formType={'confirmNewPassword'}
      overline={'Secure Your Space!'}
      title={'Password Reset'}
      onSubmit={async (data) => {
        setError('');
        const response = await confirmResetPassword(data, token);
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
        {
          title: 'New Password',
          name: 'password',
          placeholder: 'Enter your new password',
          type: 'password',
        },
        {
          title: 'Confirm new Password',
          name: 'confirmPassword',
          placeholder: 'Confirm your new password',
          type: 'password',
        },
      ]}
      submitText={'Reset Password'}
    />
  );
}
