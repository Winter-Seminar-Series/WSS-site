import type { Metadata } from 'next';
import Link from 'next/link';

import { getSubEvents } from '@/api/events.api';
import { TimelineDay } from '@/app/[edition]/timeline/_components/TimelineDay';
import { RegisterCta } from '@/components/countdown/RegisterCta';
import { EmptyState } from '@/components/events/EventCard';
import { PageBody, PageHero } from '@/components/layout/PageHero';
import { formatEventDate } from '@/lib/dates';
import { editionStaticParams, resolveEdition } from '@/lib/edition-route';
import { hasPage } from '@/lib/editions';
import type { EditionPage } from '@/lib/editions';
import { editionPageMetadata } from '@/lib/metadata';
import { buildTimeline } from '@/lib/timeline';
import type { SubEventKind } from '@/types/event.type';

export const revalidate = 900;

export const generateStaticParams = editionStaticParams();

/** The session kinds on the timeline, each fetched only where the edition has its page. */
const KINDS: [SubEventKind, EditionPage][] = [
  ['seminar', 'seminars'],
  ['round-table', 'round-tables'],
  ['lab-talk', 'lab-talks'],
];

export async function generateMetadata({ params }: PageProps<'/[edition]/timeline'>): Promise<Metadata> {
  const edition = await resolveEdition(params, 'timeline');
  return editionPageMetadata(
    edition,
    'Timeline',
    `The full schedule of the ${edition.title}, ${edition.dateRange}: every talk, round table and break, hour by hour.`,
    '/timeline',
  );
}

export default async function TimelinePage({ params }: PageProps<'/[edition]/timeline'>) {
  const edition = await resolveEdition(params, 'timeline');
  const sessions = (
    await Promise.all(
      KINDS.filter(([, page]) => hasPage(edition, page)).map(([kind]) => getSubEvents(edition.eventId, kind)),
    )
  ).flat();
  const days = buildTimeline(sessions, edition.agenda ?? [], edition.streamsInPerson);

  return (
    <>
      <PageHero
        image={edition.heroImage}
        context={edition.dateRange}
        title="Timeline"
        lead="Every talk, round table and break, hour by hour. Times are in Tehran time."
      >
        {days.length > 1 && (
          <nav aria-label="Days">
            <ul className="flex flex-wrap gap-2">
              {days.map((day, index) => (
                <li key={day.date}>
                  <Link
                    href={`#day-${index + 1}-section`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/12 px-4 text-sm font-semibold ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white hover:text-ink"
                  >
                    Day {index + 1}
                    <span className="font-medium opacity-75">{formatEventDate(day.date)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </PageHero>
      <PageBody className="flex flex-col gap-16 md:gap-24">
        {days.length === 0 ? (
          <EmptyState>The schedule for this edition will be announced soon.</EmptyState>
        ) : (
          days.map((day, index) => <TimelineDay key={day.date} day={day} number={index + 1} edition={edition} />)
        )}
      </PageBody>
      <RegisterCta edition={edition} />
    </>
  );
}
