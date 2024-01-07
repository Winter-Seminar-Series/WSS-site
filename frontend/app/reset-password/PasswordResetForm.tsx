import React from 'react';
import Form from '../../ui/forms/Form';
import resetPassword from '../../lib/api/auth/resetPassword';

export default function PasswordResetForm() {
  return (
    <Form
      formType={'resetPassword'}
      overline={'Overline goes here'}
      title={'Password Reset'}
      onSubmit={resetPassword}
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
