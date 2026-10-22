'use client';

import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

import { Button, LinkButton } from '@/ui/Button';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  // Reporting to the console is the only error sink this app has; the digest links it to the server log.
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-medium tracking-wide text-muted uppercase">Something went wrong</p>
      <h1 className="text-4xl font-bold text-ink md:text-5xl">We couldn&apos;t load this page</h1>
      <p className="max-w-md text-lg text-muted">
        This is usually temporary. Please try again — if it keeps happening, contact us and mention code{' '}
        <code>{error.digest ?? 'unknown'}</code>.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>
          <RotateCcw className="size-5" aria-hidden />
          Try again
        </Button>
        <LinkButton href="/" variant="soft">
          Home
        </LinkButton>
      </div>
    </main>
  );
}
