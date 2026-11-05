import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Native <details>: zero JS, keyboard accessible, and the collapsed content is still in the HTML for crawlers. It
 * animates its height where the browser supports `interpolate-size` (app/globals.css).
 */
export function Disclosure({ summary, children, className = '' }: Props) {
  return (
    <details
      className={`group rounded-2xl border border-line-soft bg-surface transition-[border-color,box-shadow] duration-200 open:border-line open:shadow-card ${className}`}
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-4 transition-colors hover:bg-canvas md:px-5 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 grow">{summary}</div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-canvas text-muted transition-[transform,background-color] duration-300 ease-snap group-open:rotate-180 group-open:bg-brand-soft group-open:text-brand">
          <ChevronDown className="size-4" aria-hidden />
        </span>
      </summary>
      <div className="px-4 pb-5 md:px-5">{children}</div>
    </details>
  );
}
