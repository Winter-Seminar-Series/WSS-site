import type { ReactNode } from 'react';

/** A placeholder block. Pulses, unless the visitor prefers reduced motion. Size it with `className`. */
export function Skeleton({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    <div
      aria-hidden
      className={`rounded-md motion-safe:animate-pulse ${tone === 'dark' ? 'bg-white/10' : 'bg-surface-hover'} ${className}`}
    />
  );
}

/** Lines of text; the last one shorter, like a paragraph. */
export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div aria-hidden className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton key={index} className={`h-4 ${index === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
}

/**
 * Wraps a skeleton so assistive technology hears "Loading …" once, instead of a tree of empty boxes. Every
 * loading.tsx and Suspense fallback renders its skeleton inside one.
 */
export function LoadingRegion({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div role="status" aria-busy="true" aria-live="polite" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}
