import { ArrowRight, BadgeCheck, Coffee, Radio, Sparkles, Trophy, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Affiliation } from '@/components/events/Affiliation';
import { CareerLogos } from '@/components/events/CareerLogos';
import { SpeakerPhoto } from '@/components/events/SpeakerPhoto';
import { durationInMinutes, formatClock, formatEventDate } from '@/lib/dates';
import { editionHref, hasPage } from '@/lib/editions';
import type { AgendaItem, Edition } from '@/lib/editions';
import { SUB_EVENT_SECTIONS } from '@/lib/sub-events';
import type { TimelineDay as Day, TimelineEntry, Venue } from '@/lib/timeline';
import type { SubEvent } from '@/types/event.type';
import { LinkButton } from '@/ui/Button';

const VENUES: Record<Venue, string> = { 'in-person': 'In person', online: 'Online', hybrid: 'Hybrid' };

const MOMENT_ICONS: Record<AgendaItem['kind'], LucideIcon> = {
  registration: BadgeCheck,
  break: Coffee,
  competition: Trophy,
  ceremony: Sparkles,
};

const KIND_LABELS: Record<SubEvent['kind'], string> = {
  seminar: 'Seminar',
  'round-table': 'Round table',
  'lab-talk': 'Lab talk',
};

interface Props {
  day: Day;
  /** 1-based, for "Day 1". */
  number: number;
  edition: Edition;
}

function sessionHref(edition: Edition, session: SubEvent): string {
  return editionHref(edition, `${SUB_EVENT_SECTIONS[session.kind].path}/${session.id}`);
}

interface SessionCardProps {
  session: SubEvent;
  edition: Edition;
  /** The card has the row to itself: from md, the title and the speaker sit side by side. */
  wide: boolean;
}

function SessionCard({ session, edition, wide }: SessionCardProps) {
  const [speaker] = session.speakers;
  const panel = session.speakers.length > 1;
  const sideBySide = wide && !panel;

  return (
    <article
      className={`group relative flex h-full flex-col gap-4 rounded-3xl bg-surface p-4 shadow-card ring-1 ring-line-soft transition-[box-shadow,translate] duration-300 ease-snap hover:-translate-y-0.5 hover:shadow-lift md:p-6 ${sideBySide ? 'md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] md:items-center md:gap-8' : ''}`}
    >
      <div>
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-brand-strong uppercase">
          {panel && <Users className="size-3.5" aria-hidden />}
          {KIND_LABELS[session.kind]}
        </p>
        <h3 className="mt-1.5 text-lg leading-snug font-extrabold tracking-tight text-ink md:text-xl">
          {/* The whole card is the link's target area; the title alone is announced. */}
          <Link href={sessionHref(edition, session)} className="after:absolute after:inset-0 after:rounded-3xl">
            {session.name}
          </Link>
        </h3>
      </div>

      {panel ? (
        <ul className={`grid gap-3 sm:grid-cols-2 ${wide ? 'lg:grid-cols-3' : ''}`}>
          {session.speakers.map((member) => (
            <li key={member.id} className="flex min-w-0 items-center gap-3">
              <SpeakerPhoto speaker={member} size={44} className="rounded-full" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-ink">{member.name}</span>
                {(member.organization ?? member.role) && (
                  <span className="block truncate text-xs text-muted">{member.organization ?? member.role}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        speaker && (
          <div
            className={`mt-auto flex items-center gap-4 ${sideBySide ? 'md:mt-0 md:border-l md:border-line-soft md:pl-8' : ''}`}
          >
            <SpeakerPhoto speaker={speaker} size={72} className="rounded-2xl" />
            <div className="min-w-0">
              <p className="truncate font-bold text-ink">{speaker.name}</p>
              <Affiliation speaker={speaker} />
              <CareerLogos career={speaker.career} max={6} className="mt-2" />
            </div>
          </div>
        )
      )}
    </article>
  );
}

/** `90` → `1 h 30 min`, `60` → `1 hour`, `45` → `45 minutes`. */
function formatLength(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} minutes`;
  if (rest === 0) return hours === 1 ? '1 hour' : `${hours} hours`;
  return `${hours} h ${rest} min`;
}

/**
 * A part of the day that is not a session. Breaks are quiet (a dashed outline); registration, the competition and the
 * ceremonies are the programme's milestones, set dark with the brand weave behind them.
 */
function Moment({ entry, edition }: { entry: Extract<TimelineEntry, { kind: 'moment' }>; edition: Edition }) {
  const { title, page, kind } = entry.item;
  const Icon = MOMENT_ICONS[kind];
  const length = formatLength(durationInMinutes(entry.start, entry.end));

  if (kind === 'break') {
    return (
      <div className="flex items-center gap-4 rounded-3xl border border-dashed border-line px-5 py-4 md:px-6">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-canvas text-muted">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-ink">{title}</h3>
          <p className="text-sm text-muted">{length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate flex flex-wrap items-center gap-4 overflow-hidden rounded-3xl bg-ink-deep px-5 py-5 text-white sm:flex-nowrap md:px-7 md:py-6 [&_:focus-visible]:outline-white">
      <div
        aria-hidden
        className="spine absolute inset-y-0 right-6 -z-10 text-white/10 [--spine-width:4rem] md:right-12 md:[--spine-width:5.5rem]"
      />
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-muted ring-1 ring-white/15">
        <Icon className="size-6" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-xl font-extrabold tracking-tight md:text-2xl">{title}</h3>
        <p className="text-sm text-white/65">{length}</p>
      </div>
      {page && hasPage(edition, page) && (
        <LinkButton href={editionHref(edition, `/${page}`)} variant="light" size="sm" className="max-sm:w-full">
          Details
          <ArrowRight className="size-4" aria-hidden />
        </LinkButton>
      )}
    </div>
  );
}

/**
 * One day of the schedule: times down the left, the brand weave as the spine, and each slot's sessions (side by side
 * when parallel) or fixed moment on the right.
 */
export function TimelineDay({ day, number, edition }: Props) {
  const sessions = day.entries.flatMap((entry) => (entry.kind === 'sessions' ? entry.sessions : []));
  const id = `day-${number}`;

  return (
    <section aria-labelledby={id} className="scroll-mt-[calc(var(--navbar-height)+1.5rem)]" id={`${id}-section`}>
      <div className="reveal flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line-soft pb-5">
        <div>
          <h2 id={id} className="text-4xl font-extrabold tracking-[-0.035em] text-ink md:text-5xl">
            Day {number}
          </h2>
          <p className="mt-1 text-lg font-semibold text-muted">
            <time dateTime={day.date}>{formatEventDate(day.date)}</time>
          </p>
        </div>
        <p className="text-sm font-semibold text-muted">
          {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'}
        </p>
      </div>

      <div className="relative">
        {/* The spine: down the left edge on phones, between the times and the sessions from md. */}
        <div aria-hidden className="spine absolute inset-y-0 left-0 text-brand-muted/75 md:left-32" />
        <ol className="flex flex-col">
          {day.entries.map((entry) => {
            const parallel = entry.kind === 'sessions' && entry.sessions.length > 1;
            return (
              <li
                key={entry.kind === 'moment' ? `${entry.start}-${entry.item.title}` : `${entry.start}-sessions`}
                className="reveal relative grid grid-cols-1 gap-3 py-5 pl-12 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-x-20 md:py-7 md:pl-0"
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 md:block md:pt-1 md:text-right">
                  <p className="text-lg font-extrabold tracking-tight text-ink tabular-nums md:text-xl">
                    <time dateTime={entry.start}>{formatClock(entry.start)}</time>
                  </p>
                  <p className="text-sm font-medium text-muted tabular-nums">
                    to <time dateTime={entry.end}>{formatClock(entry.end)}</time>
                  </p>
                  <p className="inline-flex items-center gap-1 rounded-full bg-canvas px-2 py-0.5 text-xs font-bold text-ink/70 ring-1 ring-line-soft md:mt-2">
                    {entry.venue !== 'in-person' && <Radio className="size-3" aria-hidden />}
                    {VENUES[entry.venue]}
                  </p>
                </div>

                {/* The node on the spine, level with the start time. */}
                <span
                  aria-hidden
                  className="absolute top-[1.75rem] left-[0.625rem] size-3 rounded-full bg-brand ring-4 ring-surface md:top-[2.1875rem] md:left-[9.0625rem] md:size-3.5"
                />

                {entry.kind === 'moment' ? (
                  <Moment entry={entry} edition={edition} />
                ) : (
                  <div>
                    {parallel && (
                      <p className="mb-2 text-xs font-bold text-muted">{entry.sessions.length} sessions in parallel</p>
                    )}
                    <div className={`grid grid-cols-1 gap-4 ${parallel ? 'lg:grid-cols-2' : ''}`}>
                      {entry.sessions.map((session) => (
                        <SessionCard
                          key={`${session.kind}-${session.id}`}
                          session={session}
                          edition={edition}
                          wide={!parallel}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
