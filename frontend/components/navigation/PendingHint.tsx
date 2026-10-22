'use client';

import { useLinkStatus } from 'next/link';

interface Props {
  /** `underline` sits under a nav link; `bar` runs along the top of a card. */
  variant?: 'underline' | 'bar';
}

/**
 * Feedback for the rare click on a public page that is not prefetched yet (public pages are static and prefetched
 * as their links scroll into view, so they skip loading screens). Render it inside a <Link>. Always in the DOM,
 * only its opacity changes, so it never shifts layout; it fades in after 150ms so fast navigations show nothing.
 */
export function PendingHint({ variant = 'underline' }: Props) {
  const { pending } = useLinkStatus();
  const shape = variant === 'bar' ? 'inset-x-0 top-0 h-1 bg-brand' : 'inset-x-3 bottom-2 h-0.5 bg-current';

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute ${shape} transition-opacity ${
        pending ? 'opacity-100 delay-150 motion-safe:animate-pulse' : 'opacity-0'
      }`}
    />
  );
}
