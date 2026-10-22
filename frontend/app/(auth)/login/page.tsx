import type { Metadata } from 'next';
import Link from 'next/link';

import { loginAction } from '@/actions/auth.actions';
import { AuthForm } from '@/app/(auth)/_components/AuthForm';
import { PRIVATE_PAGE, pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  ...pageMetadata('Log In', 'Log in to your Winter Seminar Series account.', '/login'),
  ...PRIVATE_PAGE,
};

export default async function LoginPage({ searchParams }: PageProps<'/login'>) {
  const { next, reset } = await searchParams;

  return (
    <AuthForm
      overline="Unlock Your World"
      title="Log In"
      submitLabel="Log In"
      action={loginAction}
      hidden={typeof next === 'string' ? { next } : {}}
      notice={reset ? 'Your password has been reset. Log in with your new password.' : undefined}
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
          placeholder: 'Enter your password',
          autoComplete: 'current-password',
          action: (
            <Link href="/reset-password" className="font-medium text-accent hover:underline">
              Forgot password?
            </Link>
          ),
        },
      ]}
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-accent hover:underline">
            Sign up
          </Link>
        </>
      }
    />
  );
}
