import { Affiliation } from '@/components/events/Affiliation';
import { CareerLogos } from '@/components/events/CareerLogos';
import { SpeakerLinks } from '@/components/events/SpeakerLinks';
import { SpeakerPhoto } from '@/components/events/SpeakerPhoto';
import type { Speaker } from '@/types/event.type';
import { RichText } from '@/ui/RichText';

export function SpeakerProfile({ speaker }: { speaker: Speaker }) {
  return (
    <article className="flex flex-col gap-5 rounded-3xl p-5 ring-1 ring-line-soft sm:flex-row md:p-6">
      <SpeakerPhoto speaker={speaker} size={112} className="rounded-2xl" />
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-2xl font-extrabold tracking-tight text-ink">{speaker.name}</h3>
        <Affiliation speaker={speaker} className="text-base" />
        <CareerLogos career={speaker.career} size="md" max={8} linked className="mt-3" />
        <RichText html={speaker.bioHtml} className="mt-3 text-ink/80" />
        <SpeakerLinks name={speaker.name} linkedin={speaker.linkedin} googleScholar={speaker.googleScholar} />
      </div>
    </article>
  );
}
