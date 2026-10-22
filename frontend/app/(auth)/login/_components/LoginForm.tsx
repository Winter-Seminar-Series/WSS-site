'use client';

import { useSearchParams } from 'next/navigation';
import type { ComponentProps } from 'react';

import { AuthForm } from '@/app/(auth)/_components/AuthForm';

type Props = Omit<ComponentProps<typeof AuthForm>, 'hidden' | 'notice'>;

/**
 * The login form plus what the URL adds to it: `?next=` (where to go after signing in) and `?reset=1` (coming back
 * from a password reset). Read on the client, so /login itself stays static and can be prefetched; the page wraps
 * this in <Suspense> with the plain form as the prerendered fallback.
 */
export function LoginForm(props: Props) {
  const searchParams = useSearchParams();
  const next = searchParams.get('next');

  return (
    <AuthForm
      {...props}
      hidden={next ? { next } : {}}
      notice={searchParams.has('reset') ? 'Your password has been reset. Log in with your new password.' : undefined}
    />
  );
}
