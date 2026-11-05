import type { Metadata } from 'next';
import Link from 'next/link';

import { signUpAction } from '@/actions/auth.actions';
import { AuthForm } from '@/app/(auth)/_components/AuthForm';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata(
  'Sign Up',
  'Create your Winter Seminar Series account to register for seminars, workshops and the poster session.',
  '/signup',
);

export default function SignUpPage() {
  return (
    <AuthForm
      title="Create your account"
      lead="One account for registration, the live stream and your certificates."
      submitLabel="Create account"
      action={signUpAction}
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
          label: 'Password',
          type: 'password',
          placeholder: 'At least 8 characters',
          autoComplete: 'new-password',
        },
        {
          name: 'confirmPassword',
          label: 'Confirm password',
          type: 'password',
          placeholder: 'Repeat your password',
          autoComplete: 'new-password',
        },
      ]}
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-brand-strong underline-offset-4 hover:underline">
            Log in
          </Link>
        </>
      }
    />
  );
}
