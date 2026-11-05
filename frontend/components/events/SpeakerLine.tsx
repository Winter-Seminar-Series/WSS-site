import type { Speaker } from '@/types/event.type';
import { PersonPhoto } from '@/ui/PersonPhoto';

/** Footer of a session card: the presenters' faces, then their names (and the organization, for a single presenter). */
export function SpeakerLine({ speakers }: { speakers: Speaker[] }) {
  if (speakers.length === 0) return null;
  const [first] = speakers;

  return (
    <div className="flex items-center gap-3">
      <div className="flex shrink-0 -space-x-3">
        {speakers.slice(0, 3).map((speaker) => (
          <PersonPhoto
            key={speaker.id}
            src={speaker.image}
            blur={speaker.imageBlur}
            name={speaker.name}
            size={40}
            className="rounded-full ring-2 ring-surface"
          />
        ))}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-ink">{speakers.map((speaker) => speaker.name).join(', ')}</p>
        {speakers.length === 1 && first && (first.organization ?? first.role) && (
          <p className="truncate text-xs text-muted">{first.organization ?? first.role}</p>
        )}
      </div>
    </div>
  );
}
