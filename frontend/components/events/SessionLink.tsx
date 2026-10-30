import { ExternalLink, Play, Video } from 'lucide-react';

import { parseHttpUrl } from '@/lib/http-url';
import { describeSessionLink } from '@/lib/session-link';
import type { SessionLinkKind } from '@/lib/session-link';
import { buttonClasses } from '@/ui/Button';

interface Props {
  href: string;
}

const ICONS: Record<SessionLinkKind, typeof Play> = { video: Play, meeting: Video, other: ExternalLink };

/** The session's own link (recording, live room or material). The label says where it leads; always a new tab. */
export function SessionLink({ href }: Props) {
  const url = parseHttpUrl(href);
  if (!url) return null;

  const { label, kind } = describeSessionLink(url);
  const Icon = ICONS[kind];

  return (
    <a
      href={url.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonClasses('primary', 'md')} w-full sm:w-auto`}
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      {label}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
