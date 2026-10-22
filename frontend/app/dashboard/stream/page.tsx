import { Clock } from 'lucide-react';
import type { Metadata } from 'next';

import { getStreamEvents } from '@/api/stream.api';
import { AttendButton } from '@/app/dashboard/stream/_components/AttendButton';
import { withAuth } from '@/lib/auth-guard';
import { formatDateTime } from '@/lib/dates';
import { Disclosure } from '@/ui/Disclosure';
import { RichText } from '@/ui/RichText';

export const metadata: Metadata = { title: 'Stream' };

export default async function StreamPage() {
  const events = await withAuth(getStreamEvents, '/dashboard/stream');

  if (events.length === 0) {
    return <p className="py-20 text-center text-2xl font-semibold text-muted">No event is currently streaming.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {events.map((event) => {
        const { live } = event;
        return (
          <li key={event.id} className="flex flex-col gap-3 md:flex-row md:items-start">
            <Disclosure
              className="grow"
              summary={
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
                  <span
                    className={`flex shrink-0 items-center gap-2 text-sm font-semibold ${live ? 'text-danger' : 'text-muted'}`}
                  >
                    <Clock className="size-5" aria-hidden />
                    {live ? 'Live now' : <time dateTime={event.startsAt}>{formatDateTime(event.startsAt)}</time>}
                  </span>
                  <span className="line-clamp-2 font-medium text-ink">{event.title}</span>
                </div>
              }
            >
              <RichText html={event.descriptionHtml} className="text-muted" />
            </Disclosure>
            <div className="md:pt-2">
              <AttendButton eventId={event.id} live={live} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
