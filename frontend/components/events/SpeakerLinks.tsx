import { GraduationCap, Linkedin } from 'lucide-react';

interface Props {
  name: string;
  linkedin: string | null;
  googleScholar: string | null;
}

const LINK_CLASSES =
  'inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-semibold text-brand-strong transition-colors hover:bg-brand-soft focus-visible:bg-brand-soft';

/** Footer of a speaker's profile. Renders nothing for a speaker without links (both are optional). */
export function SpeakerLinks({ name, linkedin, googleScholar }: Props) {
  const items = [
    linkedin && { label: 'LinkedIn', href: linkedin, icon: <Linkedin className="size-5 shrink-0" aria-hidden /> },
    googleScholar && {
      label: 'Google Scholar',
      href: googleScholar,
      icon: <GraduationCap className="size-5 shrink-0" aria-hidden />,
    },
  ].filter((item) => item !== null && item !== '');
  if (items.length === 0) return null;

  return (
    <ul className="mt-3 -ml-3 flex flex-wrap gap-1 border-t border-line-soft pt-3">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on ${item.label} (opens in a new tab)`}
            className={LINK_CLASSES}
          >
            {item.icon}
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
