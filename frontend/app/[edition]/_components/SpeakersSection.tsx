import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { getEditionSpeakers } from '@/api/events.api';
import { editionHref } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { BACKDROP_QUALITY } from '@/lib/images';
import { LinkButton } from '@/ui/Button';
import { Marquee } from '@/ui/Marquee';
import { PersonPhoto } from '@/ui/PersonPhoto';
import { SectionHeading } from '@/ui/SectionHeading';

export async function SpeakersSection({ edition }: { edition: Edition }) {
  const speakers = await getEditionSpeakers(edition.eventId);
  if (speakers.length === 0) return null;

  return (
    <section aria-labelledby="speakers" className="relative overflow-hidden bg-ink-deep pb-4">
      <Image src={edition.bandImage} alt="" fill sizes="100vw" quality={BACKDROP_QUALITY} className="object-cover" />
      <div className="relative mx-auto max-w-300 px-6 pt-20 pb-10">
        <SectionHeading
          id="speakers"
          tone="dark"
          overline="Unveiling the Frontiers of Knowledge"
          title="Speakers"
          action={
            <LinkButton href={editionHref(edition, '/seminars')} variant="light" size="lg">
              View All
              <ArrowRight className="size-5" aria-hidden />
            </LinkButton>
          }
        />
      </div>
      <div className="relative">
        <Marquee label={`Speakers of the ${edition.label}`} durationSeconds={speakers.length * 4}>
          {speakers.map((speaker) => (
            <li key={speaker.id} className="w-60 shrink-0 px-3 pt-4 pb-12">
              <div className="flex h-full flex-col items-center rounded-xl bg-surface p-5 text-center">
                <PersonPhoto
                  src={speaker.image}
                  blur={speaker.imageBlur}
                  name={speaker.name}
                  size={160}
                  className="rounded-full"
                />
                <p className="mt-4 text-lg font-semibold text-ink">{speaker.name}</p>
                <p className="mt-1 line-clamp-3 text-sm text-muted">{speaker.designation}</p>
              </div>
            </li>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
