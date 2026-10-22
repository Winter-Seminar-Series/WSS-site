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
      overline="Your Key to Numerous Talks"
      title="Sign Up"
      submitLabel="Create Account"
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
          placeholder: 'At least 6 characters',
          autoComplete: 'new-password',
        },
        {
          name: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          placeholder: 'Repeat your password',
          autoComplete: 'new-password',
        },
      ]}
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-accent hover:underline">
            Log in
          </Link>
        </>
      }
    />
  );
}
