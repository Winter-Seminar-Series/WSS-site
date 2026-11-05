'use client';

import type { ReactNode } from 'react';

import { useIsSignedIn } from '@/hooks/useIsSignedIn';
import { LinkButton } from '@/ui/Button';
import type { ButtonSize, ButtonVariant } from '@/ui/Button';

interface Props {
  /** What a visitor without an account is offered (the static HTML shows this). */
  signedOut: { href: string; label: ReactNode };
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * A call to action on a static page that changes for signed-in visitors: "Create an account" becomes "Go to your
 * dashboard". It reads the `wss-signed-in` hint cookie after hydration, so the page itself stays static.
 */
export function AccountLink({ signedOut, variant, size, className }: Props) {
  const isSignedIn = useIsSignedIn();
  const { href, label } = isSignedIn ? { href: '/dashboard/profile', label: 'Go to your dashboard' } : signedOut;
  return (
    <LinkButton href={href} variant={variant} size={size} className={className}>
      {label}
    </LinkButton>
  );
}
