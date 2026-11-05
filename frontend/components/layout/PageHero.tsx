import Image from 'next/image';
import type { ReactNode } from 'react';

import { EdgeLines } from '@/components/brand/EdgeLines';
import { CURRENT_EDITION } from '@/lib/editions';
import { BACKDROP_QUALITY } from '@/lib/images';

interface Props {
  /** A short line above the title placing the page, e.g. the edition. */
  context?: ReactNode;
  title: string;
  /** One or two sentences under the title. */
  lead?: ReactNode;
  /** Rendered under the lead, e.g. a call to action. */
  children?: ReactNode;
  /** The edition's hero photo (`Edition.heroImage`); pages outside an edition use the current one. */
  image?: string;
}

/**
 * The inner-page header: the edition's dusk photo behind the navbar, the title set on it in white, and its lower edge
 * cut to the brand pattern. It owns the page's only <h1>.
 */
export function PageHero({ context, title, lead, children, image = CURRENT_EDITION.heroImage }: Props) {
  return (
    <header className="relative isolate overflow-hidden bg-ink-deep text-white edge-bottom [&_:focus-visible]:outline-white">
      <Image
        src={image}
        alt=""
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        quality={BACKDROP_QUALITY}
        className="-z-10 object-cover motion-safe:animate-settle"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink-deep/70 via-ink-deep/55 to-ink-deep/80" />
      <div className="mx-auto max-w-300 px-4 pt-[calc(var(--navbar-height)+2.5rem)] pb-24 md:px-6 md:pt-[calc(var(--navbar-height)+4.5rem)] md:pb-36">
        {context && <p className="text-[0.9375rem] font-semibold text-white/75 motion-safe:animate-rise">{context}</p>}
        <h1 className="mt-2 max-w-4xl text-[2.75rem] leading-[1.02] font-extrabold tracking-[-0.04em] motion-safe:animate-rise motion-safe:[animation-delay:80ms] md:text-7xl">
          {title}
        </h1>
        {lead && (
          <div className="mt-5 max-w-2xl text-lg text-white/80 motion-safe:animate-rise motion-safe:[animation-delay:160ms] md:text-xl">
            {lead}
          </div>
        )}
        {children && (
          <div className="mt-8 motion-safe:animate-rise motion-safe:[animation-delay:240ms]">{children}</div>
        )}
      </div>
      <EdgeLines />
    </header>
  );
}

/** The width-limited column that inner pages put their content in, under the hero. */
export function PageBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-300 px-4 py-12 md:px-6 md:py-16 ${className}`}>{children}</div>;
}
