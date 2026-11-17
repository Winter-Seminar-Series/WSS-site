import { notFound } from 'next/navigation';

import { getSubEvent, getSubEvents } from '@/api/events.api';
import { DayGrid, EmptyState, EventCard } from '@/components/events/EventCard';
import { EventDetail } from '@/components/events/EventDetail';
import { SessionMeta } from '@/components/events/EventMeta';
import { SessionLink } from '@/components/events/SessionLink';
import { SpeakerLine } from '@/components/events/SpeakerLine';
import { PageHero } from '@/components/layout/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { formatEventDate } from '@/lib/dates';
import { editionHref, hasPage, isCurrentEdition } from '@/lib/editions';
import type { Edition, EditionPage } from '@/lib/editions';
import { EAGER_LIST_ITEMS } from '@/lib/images';
import { summarize } from '@/lib/metadata';
import { SITE_URL } from '@/lib/site';
import { editionBreadcrumbs, subEventJsonLd } from '@/lib/structured-data';
import { SUB_EVENT_SECTIONS } from '@/lib/sub-events';
import { buildTimeline } from '@/lib/timeline';
import type { SubEvent, SubEventKind } from '@/types/event.type';

interface ListProps {
  edition: Edition;
  kind: SubEventKind;
}

/** The kinds that make up an edition's days, as on the timeline, each fetched only where the edition has its page. */
const DAY_KINDS: [SubEventKind, EditionPage][] = [
  ['seminar', 'seminars'],
  ['round-table', 'round-tables'],
  ['lab-talk', 'lab-talks'],
];

/**
 * The edition's days, in the order the timeline numbers them, so "Day 2" here is "Day 2" there even when this kind
 * only runs on that day. `own` are the sessions already loaded for `kind`: only the other kinds are fetched.
 */
async function getDayDates(edition: Edition, kind: SubEventKind, own: SubEvent[]): Promise<string[]> {
  const others = await Promise.all(
    DAY_KINDS.filter(([other, page]) => other !== kind && hasPage(edition, page)).map(([other]) =>
      getSubEvents(edition.eventId, other),
    ),
  );
  return buildTimeline([...own, ...others.flat()], edition.agenda ?? [], edition.streamsInPerson).map(
    (day) => day.date,
  );
}

function byStart(a: SubEvent, b: SubEvent): number {
  return a.startTime.localeCompare(b.startTime);
}

export async function SubEventList({ edition, kind }: ListProps) {
  const section = SUB_EVENT_SECTIONS[kind];
  const subEvents = await getSubEvents(edition.eventId, kind);
  const days = (await getDayDates(edition, kind, subEvents))
    .map((date, index) => ({
      date,
      number: index + 1,
      subEvents: subEvents.filter((subEvent) => subEvent.date === date).sort(byStart),
    }))
    .filter((day) => day.subEvents.length > 0);

  return (
    <>
      <JsonLd data={editionBreadcrumbs(edition, section)} />
      <PageHero image={edition.heroImage} context={edition.title} title={section.title} lead={section.description} />
      {subEvents.length === 0 ? (
        <EmptyState>
          {isCurrentEdition(edition) ? section.empty : `The ${edition.label} had no ${section.title.toLowerCase()}.`}
        </EmptyState>
      ) : (
        <div className="mx-auto flex max-w-300 flex-col gap-14 px-4 py-12 md:gap-20 md:px-6 md:py-16">
          {days.map((day, dayIndex) => (
            <section key={day.date} aria-labelledby={`day-${day.number}`}>
              <div className="reveal flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line-soft pb-5">
                <div>
                  <h2
                    id={`day-${day.number}`}
                    className="text-4xl font-extrabold tracking-[-0.035em] text-ink md:text-5xl"
                  >
                    Day {day.number}
                  </h2>
                  <p className="mt-1 text-lg font-semibold text-muted">
                    <time dateTime={day.date}>{formatEventDate(day.date)}</time>
                  </p>
                </div>
                <p className="text-sm font-semibold text-muted">
                  {day.subEvents.length} {day.subEvents.length === 1 ? 'session' : 'sessions'}
                </p>
              </div>
              <DayGrid>
                {day.subEvents.map((subEvent, index) => (
                  <li key={subEvent.id}>
                    <EventCard
                      href={editionHref(edition, `${section.path}/${subEvent.id}`)}
                      title={subEvent.name}
                      thumbnail={subEvent.thumbnail}
                      thumbnailBlur={subEvent.thumbnailBlur}
                      eager={dayIndex === 0 && index < EAGER_LIST_ITEMS}
                      headingLevel="h3"
                      meta={
                        <SessionMeta date={subEvent.date} startTime={subEvent.startTime} endTime={subEvent.endTime} />
                      }
                      footer={<SpeakerLine speakers={subEvent.speakers} />}
                    />
                  </li>
                ))}
              </DayGrid>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

interface DetailProps extends ListProps {
  id: number;
}

export async function SubEventPage({ edition, kind, id }: DetailProps) {
  const section = SUB_EVENT_SECTIONS[kind];
  const subEvent = await getSubEvent(edition.eventId, kind, id);
  if (!subEvent) notFound();

  const path = editionHref(edition, `${section.path}/${subEvent.id}`);
  return (
    <>
      <JsonLd
        data={[
          subEventJsonLd(
            edition,
            subEvent,
            `${SITE_URL}${path}`,
            summarize(subEvent.descriptionHtml, section.description),
          ),
          editionBreadcrumbs(edition, section, { name: subEvent.name, id: subEvent.id }),
        ]}
      />
      <EventDetail
        image={edition.heroImage}
        title={subEvent.name}
        back={{ href: editionHref(edition, section.path), label: section.title }}
        meta={<SessionMeta date={subEvent.date} startTime={subEvent.startTime} endTime={subEvent.endTime} />}
        action={subEvent.link && <SessionLink href={subEvent.link} />}
        poster={subEvent.poster}
        posterBlur={subEvent.posterBlur}
        descriptionHtml={subEvent.descriptionHtml}
        speakers={subEvent.speakers}
      />
    </>
  );
}
