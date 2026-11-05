import { CalendarClock, Radio } from 'lucide-react';
import type { Metadata } from 'next';

import { getStreamEvents } from '@/api/stream.api';
import { AttendButton } from '@/app/dashboard/stream/_components/AttendButton';
import { withAuth } from '@/lib/auth-guard';
import { formatDateTime } from '@/lib/dates';
import { Disclosure } from '@/ui/Disclosure';
import { EmptyPanel } from '@/ui/Panel';
import { RichText } from '@/ui/RichText';

export const metadata: Metadata = { title: 'Stream' };

export default async function StreamPage() {
  const events = await withAuth(getStreamEvents, '/dashboard/stream');

  if (events.length === 0) {
    return (
      <EmptyPanel Icon={Radio} title="Nothing is streaming right now">
        Sessions you registered for appear here shortly before they start, with a button to join.
      </EmptyPanel>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {events.map((event) => {
        const { live } = event;
        return (
          <li
            key={event.id}
            className="flex flex-col gap-3 rounded-3xl bg-surface p-2 ring-1 ring-line-soft sm:flex-row sm:items-start"
          >
            <Disclosure
              className="grow border-transparent open:border-transparent open:shadow-none"
              summary={
                <div className="flex flex-col gap-1.5">
                  {live ? (
                    <span className="flex items-center gap-2 text-sm font-bold text-danger">
                      <span className="size-2 rounded-full bg-danger motion-safe:animate-live" aria-hidden />
                      Live now
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm font-semibold text-muted">
                      <CalendarClock className="size-4" aria-hidden />
                      <time dateTime={event.startsAt}>{formatDateTime(event.startsAt)}</time>
                    </span>
                  )}
                  <span className="line-clamp-2 font-bold text-ink">{event.title}</span>
                </div>
              }
            >
              <RichText html={event.descriptionHtml} className="text-ink/80" />
            </Disclosure>
            <div className="px-2 pb-2 sm:p-3">
              <AttendButton eventId={event.id} live={live} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
