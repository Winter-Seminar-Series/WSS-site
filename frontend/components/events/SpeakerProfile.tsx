import type { Speaker } from '@/types/event.type';
import { PersonPhoto } from '@/ui/PersonPhoto';
import { RichText } from '@/ui/RichText';

export function SpeakerProfile({ speaker }: { speaker: Speaker }) {
  return (
    <article className="flex flex-col gap-4 sm:flex-row">
      <PersonPhoto src={speaker.image} name={speaker.name} size={104} className="shrink-0 rounded-xl" />
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-semibold text-ink">{speaker.name}</h3>
        {speaker.designation && <p className="text-lg text-muted">{speaker.designation}</p>}
        <RichText html={speaker.bioHtml} className="mt-2 text-muted" />
      </div>
    </article>
  );
}
