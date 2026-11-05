import type { ReactNode } from 'react';

interface Props {
  title: string;
  /** One sentence under the title saying what the section holds. */
  lead?: string;
  /** `dark` sits on a photo/brand background. */
  tone?: 'light' | 'dark';
  align?: 'start' | 'center';
  action?: ReactNode;
  id?: string;
}

export function SectionHeading({ title, lead, tone = 'light', align = 'start', action, id }: Props) {
  const centered = align === 'center';
  const dark = tone === 'dark';
  return (
    <div
      className={`reveal flex flex-col gap-6 sm:flex-row sm:items-end ${centered ? 'items-center text-center sm:justify-center' : 'sm:justify-between'}`}
    >
      <div className={`max-w-2xl ${centered ? 'mx-auto' : ''}`}>
        <h2
          id={id}
          className={`text-4xl font-extrabold tracking-[-0.035em] md:text-5xl ${dark ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </h2>
        {lead && <p className={`mt-3 text-lg ${dark ? 'text-white/75' : 'text-muted'}`}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
