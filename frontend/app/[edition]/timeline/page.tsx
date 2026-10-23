import type { Metadata } from 'next';
import Image from 'next/image';

import { RegisterCta } from '@/components/countdown/RegisterCta';
import { PageHero } from '@/components/layout/PageHero';
import { editionStaticParams, resolveEdition } from '@/lib/edition-route';
import { editionPageMetadata } from '@/lib/metadata';

export const generateStaticParams = editionStaticParams();

export async function generateMetadata({ params }: PageProps<'/[edition]/timeline'>): Promise<Metadata> {
  const edition = await resolveEdition(params, 'timeline');
  return editionPageMetadata(
    edition,
    'Timeline',
    `The full schedule of the ${edition.title}, ${edition.dateRange}.`,
    '/timeline',
  );
}

export default async function TimelinePage({ params }: PageProps<'/[edition]/timeline'>) {
  const edition = await resolveEdition(params, 'timeline');

  return (
    <>
      <PageHero image={edition.heroImage} overline={edition.dateRange} title="Timeline">
        {(edition.timelineImages ?? []).map(({ day, src }, index) => (
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
              alt={`${edition.title} schedule — ${day}`}
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
      <RegisterCta edition={edition} />
    </>
  );
}
