import Image from 'next/image';

import { organizationInitials } from '@/lib/speakers';
import type { Speaker } from '@/types/event.type';
import { PersonPhoto } from '@/ui/PersonPhoto';

interface Props {
  speaker: Pick<Speaker, 'name' | 'image' | 'imageBlur' | 'currentOrganization'>;
  size: number;
  /** Shape of the photo, e.g. `rounded-2xl`. */
  className?: string;
  /** Ring that separates the badge from what is behind the photo; match the background. */
  ringClassName?: string;
}

/** A speaker's photo with their current organization's logo badged on its corner. */
export function SpeakerPhoto({ speaker, size, className = '', ringClassName = 'ring-surface' }: Props) {
  const organization = speaker.currentOrganization;
  // A third of the photo, but never smaller than a legible logo.
  const badge = Math.max(20, Math.round(size * 0.34));

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className={`overflow-hidden ${className}`}>
        <PersonPhoto src={speaker.image} blur={speaker.imageBlur} name={speaker.name} size={size} />
      </div>
      {organization && (
        <span
          title={organization.name}
          className={`absolute -top-1.5 -right-1.5 flex items-center justify-center overflow-hidden rounded-full bg-white p-0.5 shadow-card ring-2 ${ringClassName}`}
          style={{ width: badge, height: badge }}
        >
          {organization.logo ? (
            <Image
              src={organization.logo}
              alt={organization.name}
              width={badge}
              height={badge}
              className="size-full object-contain"
            />
          ) : (
            <span
              className="text-[0.625rem] leading-none font-extrabold text-ink"
              role="img"
              aria-label={organization.name}
            >
              {organizationInitials(organization.name)}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
