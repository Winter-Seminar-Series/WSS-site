import { ArrowRight, Pause, Play } from 'lucide-react';
import Link from 'next/link';

import { getEditionSpeakers } from '@/api/events.api';
import { EdgeLines } from '@/components/brand/EdgeLines';
import { Affiliation } from '@/components/events/Affiliation';
import { CareerLogos } from '@/components/events/CareerLogos';
import { SpeakerPhoto } from '@/components/events/SpeakerPhoto';
import { editionHref } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { SUB_EVENT_SECTIONS } from '@/lib/sub-events';
import type { EditionSpeaker } from '@/types/event.type';
import { LinkButton } from '@/ui/Button';
import { Marquee } from '@/ui/Marquee';
import { SectionHeading } from '@/ui/SectionHeading';

/** Below this many speakers one row is enough; above it, two rows drift past each other. */
const TWO_ROWS_FROM = 10;
/** Seconds each card takes to cross, so every row moves at the same reading speed. */
const SECONDS_PER_CARD = 5;
/** Cards per loop a row needs to span a wide screen; shorter rows repeat, or the loop would show a gap. */
const MIN_CARDS_PER_LOOP = 8;

interface Slot {
  speaker: EditionSpeaker;
  /** A repeat that only fills the row: hidden from assistive tech and the tab order. */
  repeat: boolean;
}

function fillRow(speakers: EditionSpeaker[]): Slot[] {
  const slots = speakers.map((speaker) => ({ speaker, repeat: false }));
  while (slots.length < MIN_CARDS_PER_LOOP) slots.push(...speakers.map((speaker) => ({ speaker, repeat: true })));
  return slots;
}

function lead(speakers: EditionSpeaker[]): string {
  const organizations = new Set(speakers.flatMap((speaker) => speaker.organization ?? [])).size;
  const people = `${speakers.length} researchers and engineers`;
  return organizations > 1
    ? `${people} from ${organizations} universities, labs and companies, sharing what they work on.`
    : `${people} sharing what they work on.`;
}

function SpeakerCard({ slot: { speaker, repeat }, edition }: { slot: Slot; edition: Edition }) {
  const href = editionHref(edition, `${SUB_EVENT_SECTIONS[speaker.session.kind].path}/${speaker.session.id}`);
  return (
    <li className="flex shrink-0 px-2 md:px-3" aria-hidden={repeat || undefined} inert={repeat || undefined}>
      <Link
        href={href}
        className="group/card flex w-[19rem] items-center gap-4 rounded-3xl bg-white/6 p-3 pr-5 ring-1 ring-white/10 transition-[background-color,box-shadow] duration-300 hover:bg-white/12 hover:ring-white/30 md:w-[22rem]"
      >
        <SpeakerPhoto speaker={speaker} size={88} className="rounded-2xl" ringClassName="ring-ink-deep" />
        <div className="min-w-0">
          <p className="line-clamp-2 text-lg leading-tight font-bold tracking-tight">{speaker.name}</p>
          <Affiliation speaker={speaker} tone="dark" className="mt-1" />
          <CareerLogos career={speaker.career} max={4} className="mt-2.5" />
        </div>
      </Link>
    </li>
  );
}

/**
 * Every speaker of the edition, drifting past in one or two rows (pure CSS, see ui/Marquee). Hovering or focusing a row
 * holds it; the switch holds them all.
 */
export async function SpeakersSection({ edition }: { edition: Edition }) {
  const speakers = await getEditionSpeakers(edition.eventId);
  if (speakers.length === 0) return null;

  const rows = (
    speakers.length >= TWO_ROWS_FROM
      ? [speakers.filter((_, index) => index % 2 === 0), speakers.filter((_, index) => index % 2 === 1)]
      : [speakers]
  ).map(fillRow);

  return (
    <section
      aria-labelledby="speakers"
      className="relative isolate overflow-hidden bg-ink-deep pb-24 text-white edge-y md:pb-36 [&_:focus-visible]:outline-white"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_90%_10%,color-mix(in_oklab,var(--color-brand)_40%,transparent),transparent)]" />
      <EdgeLines side="top" />

      <div className="mx-auto max-w-300 px-4 pt-24 md:px-6 md:pt-36">
        <SectionHeading
          id="speakers"
          tone="dark"
          title="Speakers"
          lead={lead(speakers)}
          action={
            <div className="flex flex-wrap gap-2">
              <LinkButton href={editionHref(edition, '/seminars')} variant="light">
                All talks
                <ArrowRight className="size-4" aria-hidden />
              </LinkButton>
              <label className="group/pause inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 ring-white/30 transition-colors select-none hover:bg-white/10 has-checked:bg-white has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-white motion-reduce:hidden pointer-fine:min-h-9">
                <input type="checkbox" data-marquee-pause className="sr-only" />
                <Pause className="size-4 group-has-checked/pause:hidden" aria-hidden />
                <Play className="hidden size-4 group-has-checked/pause:block" aria-hidden />
                Pause
              </label>
            </div>
          }
        />
      </div>

      <div
        role="region"
        aria-label={`Speakers of the ${edition.label}`}
        className="mt-12 flex flex-col gap-4 md:mt-14 md:gap-5"
      >
        {rows.map((row, index) => (
          <Marquee key={index} reverse={index % 2 === 1} durationSeconds={row.length * SECONDS_PER_CARD}>
            {row.map((slot, position) => (
              <SpeakerCard key={`${slot.speaker.id}-${position}`} slot={slot} edition={edition} />
            ))}
          </Marquee>
        ))}
      </div>

      <EdgeLines />
    </section>
  );
}
