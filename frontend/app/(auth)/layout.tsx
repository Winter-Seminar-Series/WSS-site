import Image from 'next/image';
import type { ReactNode } from 'react';

import { EdgeLines } from '@/components/brand/EdgeLines';
import { Logo } from '@/components/brand/Logo';
import { Navbar } from '@/components/layout/Navbar';
import { editionNav } from '@/lib/edition-nav';
import { CURRENT_EDITION } from '@/lib/editions';

/** A focused split screen: the form on one side, the edition's photo on the other (a short band on phones). */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar variant="solid" nav={editionNav()} />
      <main id="main" className="flex min-h-dvh flex-col pt-(--navbar-height) md:flex-row">
        <div
          className="relative h-36 overflow-hidden bg-ink-deep max-md:edge-bottom md:order-last md:h-auto md:w-1/2 md:edge-start"
          aria-hidden
        >
          <Image
            src="/images/auth.webp"
            alt=""
            fill
            preload
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 hidden bg-linear-to-t from-ink-deep/80 via-transparent to-transparent md:block" />
          <div className="absolute right-10 bottom-10 left-22 hidden text-white md:block lg:right-14 lg:bottom-14 lg:left-26">
            <Logo className="w-14" />
            <p className="mt-5 max-w-sm text-3xl leading-tight font-extrabold tracking-[-0.03em] lg:text-4xl">
              {CURRENT_EDITION.title}
            </p>
            <p className="mt-2 font-medium text-white/75">{CURRENT_EDITION.tagline}</p>
          </div>
          {/* The photo's edge facing the form is cut to the brand pattern: below it on phones, beside it from md. */}
          <EdgeLines className="text-white/30 md:hidden" />
          <EdgeLines side="start" className="hidden text-white/30 md:block" />
        </div>
        <div className="flex w-full items-start justify-center px-4 pt-6 pb-16 sm:px-6 md:w-1/2 md:items-center md:px-10 md:py-16 lg:px-20">
          <div className="w-full max-w-md motion-safe:animate-rise">{children}</div>
        </div>
      </main>
    </>
  );
}
