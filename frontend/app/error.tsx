'use client';

import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

import { Logo } from '@/components/brand/Logo';
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
    <main id="main" className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-canvas px-6 text-center">
      <Logo className="w-14 text-brand" />
      <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-ink md:text-5xl">This page did not load</h1>
      <p className="max-w-md text-lg text-muted">
        This is usually temporary, so try again. If it keeps happening, email us and mention code{' '}
        <code className="rounded-md bg-surface px-1.5 py-0.5 text-ink ring-1 ring-line-soft">
          {error.digest ?? 'unknown'}
        </code>
        .
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} size="lg">
          <RotateCcw className="size-5" aria-hidden />
          Try again
        </Button>
        <LinkButton href="/" variant="outline" size="lg">
          Go to the home page
        </LinkButton>
      </div>
    </main>
  );
}
