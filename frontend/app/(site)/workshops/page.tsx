import type { Metadata } from 'next';

import { getWorkshops } from '@/api/events.api';
import { EmptyState, EventCard, EventGrid } from '@/components/events/EventCard';
import { WorkshopMeta } from '@/components/events/EventMeta';
import { PageHero } from '@/components/layout/PageHero';
import { formatToman } from '@/lib/digits';
import { pageMetadata } from '@/lib/metadata';

export const revalidate = 900;

const DESCRIPTION = 'Hands-on, multi-session workshops held alongside the Winter Seminar Series.';

export const metadata: Metadata = pageMetadata('Workshops', DESCRIPTION, '/workshops');

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <>
      <PageHero overline="Engage in Transformative Workshops" title="Workshops">
        <p className="mt-6 max-w-3xl text-lg text-muted">{DESCRIPTION}</p>
      </PageHero>
      {workshops.length === 0 ? (
        <EmptyState>Workshops for this edition will be announced soon.</EmptyState>
      ) : (
        <EventGrid>
          {workshops.map((workshop, index) => (
            <li key={workshop.id}>
              <EventCard
                href={`/workshops/${workshop.id}`}
                title={workshop.name}
                thumbnail={workshop.thumbnail}
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
