import type { Metadata } from 'next';

import { confirmPasswordResetAction } from '@/actions/auth.actions';
import { AuthForm } from '@/app/(auth)/_components/AuthForm';
import { PRIVATE_PAGE } from '@/lib/metadata';

export const metadata: Metadata = { title: 'Choose a New Password', ...PRIVATE_PAGE };

/** Target of the link in the password-reset email: `/reset-password/<code>`. */
export default async function ConfirmPasswordResetPage({ params }: PageProps<'/reset-password/[token]'>) {
  const { token } = await params;

  return (
    <AuthForm
      overline="Secure Your Space!"
      title="New Password"
      submitLabel="Reset Password"
      action={confirmPasswordResetAction}
      hidden={{ token }}
      fields={[
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email address',
          autoComplete: 'email',
        },
        {
          name: 'password',
          label: 'New Password',
          type: 'password',
          placeholder: 'At least 8 characters',
          autoComplete: 'new-password',
        },
        {
          name: 'confirmPassword',
          label: 'Confirm New Password',
          type: 'password',
          placeholder: 'Repeat your new password',
          autoComplete: 'new-password',
        },
      ]}
    />
  );
}
