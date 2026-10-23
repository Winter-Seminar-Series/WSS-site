import type { Metadata } from 'next';

import { getWorkshops } from '@/api/events.api';
import { EmptyState, EventCard, EventGrid } from '@/components/events/EventCard';
import { WorkshopMeta } from '@/components/events/EventMeta';
import { PageHero } from '@/components/layout/PageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { formatToman } from '@/lib/digits';
import { editionStaticParams, resolveEdition } from '@/lib/edition-route';
import { editionHref, isCurrentEdition } from '@/lib/editions';
import { editionPageMetadata, emptySectionRobots } from '@/lib/metadata';
import { editionBreadcrumbs } from '@/lib/structured-data';
import { WORKSHOPS_SECTION } from '@/lib/sub-events';

export const revalidate = 900;

export const generateStaticParams = editionStaticParams();

const DESCRIPTION = 'Hands-on, multi-session workshops held alongside the Winter Seminar Series.';

export async function generateMetadata({ params }: PageProps<'/[edition]/workshops'>): Promise<Metadata> {
  const edition = await resolveEdition(params, 'workshops');
  const workshops = await getWorkshops(edition.eventId);
  return {
    ...editionPageMetadata(edition, 'Workshops', DESCRIPTION, '/workshops'),
    ...emptySectionRobots(edition, workshops.length === 0),
  };
}

export default async function WorkshopsPage({ params }: PageProps<'/[edition]/workshops'>) {
  const edition = await resolveEdition(params, 'workshops');
  const workshops = await getWorkshops(edition.eventId);

  return (
    <>
      <JsonLd data={editionBreadcrumbs(edition, WORKSHOPS_SECTION)} />
      <PageHero image={edition.heroImage} overline="Engage in Transformative Workshops" title="Workshops">
        <p className="mt-6 max-w-3xl text-lg text-muted">{DESCRIPTION}</p>
      </PageHero>
      {workshops.length === 0 ? (
        <EmptyState>
          {isCurrentEdition(edition)
            ? 'Workshops for this edition will be announced soon.'
            : `The ${edition.label} had no workshops.`}
        </EmptyState>
      ) : (
        <EventGrid>
          {workshops.map((workshop, index) => (
            <li key={workshop.id}>
              <EventCard
                href={editionHref(edition, `/workshops/${workshop.id}`)}
                title={workshop.name}
                thumbnail={workshop.thumbnail}
                thumbnailBlur={workshop.thumbnailBlur}
                priority={index < 3}
                meta={
                  <WorkshopMeta
                    startDate={workshop.startDate}
                    endDate={workshop.endDate}
                    modules={workshop.sessions.length}
                  />
                }
                footer={<p className="text-xl font-semibold text-ink">{formatToman(workshop.price)}</p>}
              />
            </li>
          ))}
        </EventGrid>
      )}
    </>
  );
}
