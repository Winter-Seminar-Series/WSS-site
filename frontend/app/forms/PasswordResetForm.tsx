import React from 'react';
import Form from './Form';

export default function PasswordResetForm() {
  return (
    <Form
      formType={'resetPassword'}
      overline={'Overline goes here'}
      title={'Password Reset'}
      fields={[
        {
          title: 'Email',
          placeholder: 'Enter your email address',
          type: 'email',
        },
      ]}
      submitText={'Reset Password'}
    />
  );
}
