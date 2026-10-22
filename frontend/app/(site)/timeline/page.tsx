import type { Metadata } from 'next';
import Image from 'next/image';

import { RegisterCta } from '@/components/countdown/RegisterCta';
import { PageHero } from '@/components/layout/PageHero';
import { pageMetadata } from '@/lib/metadata';
import { CURRENT_EDITION } from '@/lib/site';

export const metadata: Metadata = pageMetadata(
  'Timeline',
  `The full schedule of the ${CURRENT_EDITION.title}, ${CURRENT_EDITION.dateRange}.`,
  '/timeline',
);

export default function TimelinePage() {
  return (
    <>
      <PageHero overline={CURRENT_EDITION.dateRange} title="Timeline">
        {CURRENT_EDITION.timelineImages.map(({ day, src }, index) => (
          <section key={day} aria-labelledby={`day-${index}`} className="mt-10">
            <div className="flex items-center gap-6">
              <hr className="grow border-line" />
              <h2 id={`day-${index}`} className="text-3xl font-bold text-ink md:text-4xl">
                {day}
              </h2>
              <hr className="grow border-line" />
            </div>
            <Image
              src={src}
              alt={`${CURRENT_EDITION.title} schedule — ${day}`}
              width={1200}
              height={1600}
              sizes="(min-width: 1200px) 1070px, 100vw"
              priority={index === 0}
              className="mt-6 h-auto w-full rounded-lg"
            />
          </section>
        ))}
      </PageHero>
      <div className="h-16" />
      <RegisterCta />
    </>
  );
}
