import type { ReactNode } from 'react';

interface Props {
  overline: string;
  title: string;
  /** `dark` sits on a photo/brand background. */
  tone?: 'light' | 'dark';
  align?: 'start' | 'center';
  action?: ReactNode;
  id?: string;
}

export function SectionHeading({ overline, title, tone = 'light', align = 'start', action, id }: Props) {
  const centered = align === 'center';
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end ${centered ? 'items-center text-center md:justify-center' : 'md:justify-between'}`}
    >
      <div>
        <p
          className={`text-base font-medium tracking-wide uppercase md:text-lg ${tone === 'dark' ? 'text-white/60' : 'text-muted'}`}
        >
          {overline}
        </p>
        <h2
          id={id}
          className={`mt-1 text-4xl font-bold tracking-tight md:text-5xl ${tone === 'dark' ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
