import { notFound } from 'next/navigation';

import { getSubEvent, getSubEvents } from '@/api/events.api';
import { EmptyState, EventCard, EventGrid } from '@/components/events/EventCard';
import { EventDetail } from '@/components/events/EventDetail';
import { SessionMeta } from '@/components/events/EventMeta';
import { PageHero } from '@/components/layout/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/site';
import { breadcrumbJsonLd, subEventJsonLd } from '@/lib/structured-data';
import { SUB_EVENT_SECTIONS } from '@/lib/sub-events';
import type { SubEventKind } from '@/types/event.type';

export async function SubEventList({ kind }: { kind: SubEventKind }) {
  const section = SUB_EVENT_SECTIONS[kind];
  const subEvents = await getSubEvents(kind);

  return (
    <>
      <PageHero overline={section.overline} title={section.title}>
        <p className="mt-6 max-w-3xl text-lg text-muted">{section.description}</p>
      </PageHero>
      {subEvents.length === 0 ? (
        <EmptyState>{section.empty}</EmptyState>
      ) : (
        <EventGrid>
          {subEvents.map((subEvent, index) => (
            <li key={subEvent.id}>
              <EventCard
                href={`${section.path}/${subEvent.id}`}
                title={subEvent.name}
                thumbnail={subEvent.thumbnail}
                priority={index < 3}
                meta={<SessionMeta date={subEvent.date} startTime={subEvent.startTime} endTime={subEvent.endTime} />}
                footer={
                  <>
                    <p className="font-semibold text-ink">{subEvent.speakers.map((s) => s.name).join(', ')}</p>
                    {subEvent.speakers.length === 1 && subEvent.speakers[0]?.designation && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted">{subEvent.speakers[0].designation}</p>
                    )}
                  </>
                }
              />
            </li>
          ))}
        </EventGrid>
      )}
    </>
  );
}

export async function SubEventPage({ kind, id }: { kind: SubEventKind; id: number }) {
  const section = SUB_EVENT_SECTIONS[kind];
  const subEvent = await getSubEvent(kind, id);
  if (!subEvent) notFound();

  const path = `${section.path}/${subEvent.id}`;
  return (
    <>
      <JsonLd
        data={[
          subEventJsonLd(subEvent, `${SITE_URL}${path}`),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: section.title, path: section.path },
            { name: subEvent.name, path },
          ]),
        ]}
      />
      <EventDetail
        title={subEvent.name}
        meta={<SessionMeta date={subEvent.date} startTime={subEvent.startTime} endTime={subEvent.endTime} />}
        poster={subEvent.poster}
        descriptionHtml={subEvent.descriptionHtml}
        speakers={subEvent.speakers}
      />
    </>
  );
}
