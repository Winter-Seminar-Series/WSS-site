import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import type { ComponentProps } from 'react';

import { loginAction } from '@/actions/auth.actions';
import { AuthForm } from '@/app/(auth)/_components/AuthForm';
import { LoginForm } from '@/app/(auth)/login/_components/LoginForm';
import { PRIVATE_PAGE, pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  ...pageMetadata('Log In', 'Log in to your Winter Seminar Series account.', '/login'),
  ...PRIVATE_PAGE,
};

const FORM: ComponentProps<typeof LoginForm> = {
  overline: 'Unlock Your World',
  title: 'Log In',
  submitLabel: 'Log In',
  action: loginAction,
  fields: [
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
      placeholder: 'Enter your password',
      autoComplete: 'current-password',
      action: (
        <Link href="/reset-password" className="font-medium text-accent hover:underline">
          Forgot password?
        </Link>
      ),
    },
  ],
  footer: (
    <>
      Don&apos;t have an account?{' '}
      <Link href="/signup" className="font-medium text-accent hover:underline">
        Sign up
      </Link>
    </>
  ),
};

/** Static: the URL's `?next` and `?reset` are read on the client (LoginForm), so this page is prefetched and cached. */
export default function LoginPage() {
  return (
    <Suspense fallback={<AuthForm {...FORM} />}>
      <LoginForm {...FORM} />
    </Suspense>
  );
}
