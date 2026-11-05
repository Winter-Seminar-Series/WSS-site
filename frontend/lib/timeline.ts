import type { AgendaItem } from '@/lib/editions';
import type { SubEvent } from '@/types/event.type';

export type Venue = 'in-person' | 'online' | 'hybrid';

/** One slot of the day: the sessions that start together (parallel tracks), or a fixed part of the programme. */
export type TimelineEntry =
  | { kind: 'sessions'; start: string; end: string; venue: Venue; sessions: SubEvent[] }
  | { kind: 'moment'; start: string; end: string; venue: Venue; item: AgendaItem };

export interface TimelineDay {
  /** `YYYY-MM-DD`, Tehran. */
  date: string;
  entries: TimelineEntry[];
}

/** `9:00`, `09:00` and `09:00:00` all sort as `09:00`. */
function clock(time: string): string {
  return time.slice(0, 5).padStart(5, '0');
}

/**
 * The schedule of an edition, day by day: its sessions, grouped where they run in parallel, interleaved with the
 * registry's agenda. `streamsInPerson` labels in-person sessions as hybrid.
 */
export function buildTimeline(sessions: SubEvent[], agenda: AgendaItem[], streamsInPerson = false): TimelineDay[] {
  const slots = new Map<string, SubEvent[]>();
  for (const session of sessions) {
    const key = `${session.date} ${clock(session.startTime)}`;
    slots.set(key, [...(slots.get(key) ?? []), session]);
  }

  const entries: (TimelineEntry & { date: string })[] = [
    ...[...slots.values()].map((group) => {
      const [first] = group as [SubEvent, ...SubEvent[]];
      const venue: Venue = first.venue === 'online' ? 'online' : streamsInPerson ? 'hybrid' : 'in-person';
      const end =
        group
          .map((session) => clock(session.endTime))
          .sort()
          .at(-1) ?? clock(first.endTime);
      return {
        kind: 'sessions' as const,
        date: first.date,
        start: clock(first.startTime),
        end,
        venue,
        sessions: group,
      };
    }),
    ...agenda.map((item) => ({
      kind: 'moment' as const,
      date: item.date,
      start: clock(item.start),
      end: clock(item.end),
      venue: item.venue,
      item,
    })),
  ];

  const days = new Map<string, TimelineEntry[]>();
  for (const { date, ...entry } of entries.sort((a, b) =>
    `${a.date} ${a.start}`.localeCompare(`${b.date} ${b.start}`),
  )) {
    days.set(date, [...(days.get(date) ?? []), entry]);
  }
  return [...days].map(([date, dayEntries]) => ({ date, entries: dayEntries }));
}
