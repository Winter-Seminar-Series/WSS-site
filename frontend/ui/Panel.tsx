import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface PanelProps {
  /** Rendered as an <h2>, labelling the section. */
  title?: string;
  description?: ReactNode;
  id?: string;
  /** Rendered beside the title, e.g. a status. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** A white card on the dashboard's grey canvas: one titled group of content. */
export function Panel({ title, description, id, action, children, className = '' }: PanelProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`rounded-3xl bg-surface p-5 ring-1 ring-line-soft md:p-8 ${className}`}
    >
      {title && (
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id={headingId} className="text-xl font-extrabold tracking-tight text-ink md:text-2xl">
              {title}
            </h2>
            {description && <p className="mt-1 text-[0.9375rem] text-muted">{description}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

interface EmptyPanelProps {
  Icon: LucideIcon;
  title: string;
  children?: ReactNode;
  /** What to do about it, e.g. a link to another tab. */
  action?: ReactNode;
}

/** A tab with nothing to show yet: what will appear here, and when. */
export function EmptyPanel({ Icon, title, children, action }: EmptyPanelProps) {
  return (
    <div className="flex flex-col items-center rounded-3xl bg-surface px-6 py-14 text-center ring-1 ring-line-soft md:py-20">
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand">
        <Icon className="size-7" aria-hidden />
      </span>
      <p className="mt-5 text-xl font-extrabold tracking-tight text-ink">{title}</p>
      {children && <div className="mt-2 max-w-sm text-[0.9375rem] text-muted">{children}</div>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
