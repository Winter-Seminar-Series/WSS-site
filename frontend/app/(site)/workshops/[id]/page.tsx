import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getWorkshop } from '@/api/events.api';
import { EventDetail } from '@/components/events/EventDetail';
import { WorkshopMeta } from '@/components/events/EventMeta';
import { uniqueById } from '@/lib/collections';
import { formatClock, formatShortDate } from '@/lib/dates';
import { PRIVATE_PAGE, noStaticParams, pageMetadata, parseId, summarize } from '@/lib/metadata';
import { Disclosure } from '@/ui/Disclosure';
import { RichText } from '@/ui/RichText';

export const revalidate = 900;

export const generateStaticParams = noStaticParams;

export async function generateMetadata({ params }: PageProps<'/workshops/[id]'>): Promise<Metadata> {
  const id = parseId((await params).id);
  const workshop = id ? await getWorkshop(id) : null;
  if (!workshop) return { title: 'Not found', ...PRIVATE_PAGE };
  return pageMetadata(
    workshop.name,
    summarize(workshop.descriptionHtml, `${workshop.name} — a workshop at the Winter Seminar Series.`),
    `/workshops/${workshop.id}`,
  );
}

export default async function WorkshopPage({ params }: PageProps<'/workshops/[id]'>) {
  const id = parseId((await params).id);
  const workshop = id ? await getWorkshop(id) : null;
  if (!workshop) notFound();

  return (
    <EventDetail
      title={workshop.name}
      meta={
        <WorkshopMeta startDate={workshop.startDate} endDate={workshop.endDate} modules={workshop.sessions.length} />
      }
      poster={workshop.poster}
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
  );
}
