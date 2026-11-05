import type { Metadata } from 'next';
import Link from 'next/link';

import { requestPasswordResetAction } from '@/actions/auth.actions';
import { AuthForm } from '@/app/(auth)/_components/AuthForm';
import { PRIVATE_PAGE } from '@/lib/metadata';

export const metadata: Metadata = { title: 'Reset Password', ...PRIVATE_PAGE };

export default function ResetPasswordPage() {
  return (
    <AuthForm
      title="Reset your password"
      lead="Enter the email you signed up with and we will send you a link to choose a new password."
      submitLabel="Send reset link"
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
        <Link href="/login" className="font-semibold text-brand-strong underline-offset-4 hover:underline">
          Back to log in
        </Link>
      }
    />
  );
}
