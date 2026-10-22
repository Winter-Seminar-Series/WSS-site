import type { Metadata } from 'next';
import Link from 'next/link';

import { requestPasswordResetAction } from '@/actions/auth.actions';
import { AuthForm } from '@/app/(auth)/_components/AuthForm';
import { PRIVATE_PAGE } from '@/lib/metadata';

export const metadata: Metadata = { title: 'Reset Password', ...PRIVATE_PAGE };

export default function ResetPasswordPage() {
  return (
    <AuthForm
      overline="Secure Your Space!"
      title="Password Reset"
      submitLabel="Send Reset Link"
      action={requestPasswordResetAction}
      fields={[
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email address',
          autoComplete: 'email',
        },
      ]}
      footer={
        <Link href="/login" className="font-medium text-accent hover:underline">
          Back to log in
        </Link>
      }
    />
  );
}
