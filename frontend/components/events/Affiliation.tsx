import type { Speaker } from '@/types/event.type';

interface Props {
  speaker: Pick<Speaker, 'role' | 'organization'>;
  /** `dark` for text on the dark speaker band. */
  tone?: 'light' | 'dark';
  className?: string;
}

/** Role, then the organization on its own line and in weight: the part visitors scan for. */
export function Affiliation({ speaker, tone = 'light', className = '' }: Props) {
  if (!speaker.role && !speaker.organization) return null;
  return (
    <p className={`text-sm leading-snug ${className}`}>
      {speaker.role && (
        <span className={`line-clamp-1 block ${tone === 'dark' ? 'text-white/65' : 'text-muted'}`}>{speaker.role}</span>
      )}
      {speaker.organization && (
        <span className={`line-clamp-1 block font-bold ${tone === 'dark' ? 'text-brand-muted' : 'text-brand-strong'}`}>
          {speaker.organization}
        </span>
      )}
    </p>
  );
}
