import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getWorkshop } from '@/api/events.api';
import { EventDetail } from '@/components/events/EventDetail';
import { WorkshopMeta } from '@/components/events/EventMeta';
import { JsonLd } from '@/components/seo/JsonLd';
import { uniqueById } from '@/lib/collections';
import { formatClock, formatShortDate } from '@/lib/dates';
import { resolveEdition } from '@/lib/edition-route';
import { editionHref } from '@/lib/editions';
import { PRIVATE_PAGE, editionPageMetadata, noStaticParams, parseId, posterImages, summarize } from '@/lib/metadata';
import { SITE_URL } from '@/lib/site';
import { editionBreadcrumbs, workshopJsonLd } from '@/lib/structured-data';
import { WORKSHOPS_SECTION } from '@/lib/sub-events';
import type { Workshop } from '@/types/event.type';
import { Disclosure } from '@/ui/Disclosure';
import { RichText } from '@/ui/RichText';

export const revalidate = 900;

function workshopSummary(workshop: Workshop): string {
  return summarize(workshop.descriptionHtml, `${workshop.name} — a workshop at the Winter Seminar Series.`);
}

export const generateStaticParams = noStaticParams;

export async function generateMetadata({ params }: PageProps<'/[edition]/workshops/[id]'>): Promise<Metadata> {
  const edition = await resolveEdition(params, 'workshops');
  const id = parseId((await params).id);
  const workshop = id ? await getWorkshop(edition.eventId, id) : null;
  if (!workshop) return { title: 'Not found', ...PRIVATE_PAGE };
  return editionPageMetadata(
    edition,
    workshop.name,
    workshopSummary(workshop),
    `/workshops/${workshop.id}`,
    posterImages(edition, workshop.poster ?? workshop.thumbnail, workshop.name),
  );
}

export default async function WorkshopPage({ params }: PageProps<'/[edition]/workshops/[id]'>) {
  const edition = await resolveEdition(params, 'workshops');
  const id = parseId((await params).id);
  const workshop = id ? await getWorkshop(edition.eventId, id) : null;
  if (!workshop) notFound();

  const path = editionHref(edition, `${WORKSHOPS_SECTION.path}/${workshop.id}`);
  const event = workshopJsonLd(edition, workshop, `${SITE_URL}${path}`, workshopSummary(workshop));
  return (
    <>
      <JsonLd
        data={[
          ...(event ? [event] : []),
          editionBreadcrumbs(edition, WORKSHOPS_SECTION, { name: workshop.name, id: workshop.id }),
        ]}
      />
      <EventDetail
        image={edition.heroImage}
        title={workshop.name}
        meta={
          <WorkshopMeta startDate={workshop.startDate} endDate={workshop.endDate} modules={workshop.sessions.length} />
        }
        poster={workshop.poster}
        posterBlur={workshop.posterBlur}
        descriptionHtml={workshop.descriptionHtml}
        speakers={uniqueById(workshop.sessions.map((session) => session.speaker))}
      >
        {workshop.sessions.length > 0 && (
          <section aria-labelledby="modules" className="flex flex-col gap-3">
            <h2 id="modules" className="text-3xl font-semibold text-ink">
              Modules
            </h2>
            {workshop.sessions.map((session, index) => (
              <Disclosure
                key={session.id}
                summary={
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-4">
                    <span className="font-medium text-ink">
                      Module {index + 1}: {session.name} ({session.speaker.name})
                    </span>
                    <span className="shrink-0 text-sm font-medium tracking-wide text-muted uppercase">
                      {formatShortDate(session.date)}, {formatClock(session.startTime)} – {formatClock(session.endTime)}
                    </span>
                  </div>
                }
              >
                <RichText html={session.descriptionHtml} className="text-muted" />
              </Disclosure>
            ))}
          </section>
        )}
      </EventDetail>
    </>
  );
}
