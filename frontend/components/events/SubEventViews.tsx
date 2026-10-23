import { notFound } from 'next/navigation';

import { getSubEvent, getSubEvents } from '@/api/events.api';
import { EmptyState, EventCard, EventGrid } from '@/components/events/EventCard';
import { EventDetail } from '@/components/events/EventDetail';
import { SessionMeta } from '@/components/events/EventMeta';
import { PageHero } from '@/components/layout/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { editionHref, isCurrentEdition } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { EAGER_LIST_ITEMS } from '@/lib/images';
import { summarize } from '@/lib/metadata';
import { SITE_URL } from '@/lib/site';
import { editionBreadcrumbs, subEventJsonLd } from '@/lib/structured-data';
import { SUB_EVENT_SECTIONS } from '@/lib/sub-events';
import type { SubEventKind } from '@/types/event.type';

interface ListProps {
  edition: Edition;
  kind: SubEventKind;
}

export async function SubEventList({ edition, kind }: ListProps) {
  const section = SUB_EVENT_SECTIONS[kind];
  const subEvents = await getSubEvents(edition.eventId, kind);

  return (
    <>
      <JsonLd data={editionBreadcrumbs(edition, section)} />
      <PageHero image={edition.heroImage} overline={section.overline} title={section.title}>
        <p className="mt-6 max-w-3xl text-lg text-muted">{section.description}</p>
      </PageHero>
      {subEvents.length === 0 ? (
        <EmptyState>
          {isCurrentEdition(edition) ? section.empty : `The ${edition.label} had no ${section.title.toLowerCase()}.`}
        </EmptyState>
      ) : (
        <EventGrid>
          {subEvents.map((subEvent, index) => (
            <li key={subEvent.id}>
              <EventCard
                href={editionHref(edition, `${section.path}/${subEvent.id}`)}
                title={subEvent.name}
                thumbnail={subEvent.thumbnail}
                thumbnailBlur={subEvent.thumbnailBlur}
                eager={index < EAGER_LIST_ITEMS}
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
        meta={<SessionMeta date={subEvent.date} startTime={subEvent.startTime} endTime={subEvent.endTime} />}
        poster={subEvent.poster}
        posterBlur={subEvent.posterBlur}
        descriptionHtml={subEvent.descriptionHtml}
        speakers={subEvent.speakers}
      />
    </>
  );
}
