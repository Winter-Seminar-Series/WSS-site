import type { ReactNode } from 'react';

import { HeroBand } from '@/components/layout/HeroBand';

interface Props {
  overline?: ReactNode;
  title: string;
  /** Rendered beside the title, e.g. a registration badge. */
  aside?: ReactNode;
  children?: ReactNode;
  /** Background of the band behind the navbar, see HeroBand. */
  image?: string;
}

/**
 * The inner-page header: the brand photo band behind the navbar with a white card overlapping it.
 * The card owns the page's only <h1>.
 */
export function PageHero({ overline, title, aside, children, image }: Props) {
  return (
    <>
      <HeroBand image={image} />
      <div className="relative mx-auto -mt-48 max-w-300 px-4 md:-mt-64 md:px-6">
        <div className="rounded-2xl bg-surface px-6 py-10 shadow-card md:px-16 md:py-14">
          <div className="flex items-start justify-between gap-6">
            <div>
              {overline && (
                <p className="text-base font-medium tracking-wide text-muted uppercase md:text-xl">{overline}</p>
              )}
              <h1 className="mt-1 text-4xl font-bold tracking-tight text-ink md:text-7xl">{title}</h1>
            </div>
            {aside}
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
