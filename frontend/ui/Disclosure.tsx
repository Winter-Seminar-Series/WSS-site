import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Native <details>: zero JS, keyboard accessible, and the collapsed content is still in the HTML for crawlers. */
export function Disclosure({ summary, children, className = '' }: Props) {
  return (
    <details className={`group rounded-lg border border-line-soft ${className}`}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 p-4 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 grow">{summary}</div>
        <ChevronDown className="size-6 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  );
}
