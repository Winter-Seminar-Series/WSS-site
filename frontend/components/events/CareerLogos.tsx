import Image from 'next/image';

import { organizationInitials } from '@/lib/speakers';
import type { CareerStep } from '@/types/event.type';

interface Props {
  career: CareerStep[];
  /** Logos shown before the rest collapse into "+N". */
  max?: number;
  /** `sm` for cards, `md` for profiles. */
  size?: 'sm' | 'md';
  /** Link each logo to the organization's site. Off inside a card that is itself a link. */
  linked?: boolean;
  className?: string;
}

const SIZES = { sm: { box: 'size-7', px: 20 }, md: { box: 'size-10', px: 30 } } as const;

/** A speaker's path as a row of logos: universities, labs and companies, in the order the admin set. */
export function CareerLogos({ career, max = 5, size = 'sm', linked = false, className = '' }: Props) {
  if (career.length === 0) return null;
  const { box, px } = SIZES[size];
  const shown = career.slice(0, max);
  const hidden = career.length - shown.length;

  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`} aria-label="Career">
      {shown.map((step) => {
        const mark = step.logo ? (
          <Image src={step.logo} alt={step.name} width={px} height={px} className="size-full object-contain" />
        ) : (
          <span className="text-[0.5625rem] leading-none font-extrabold text-ink" role="img" aria-label={step.name}>
            {organizationInitials(step.name)}
          </span>
        );
        return (
          <li
            key={step.name}
            title={step.name}
            className={`flex ${box} shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 ring-1 ring-line-soft`}
          >
            {linked && step.href ? (
              <a
                href={step.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-full items-center justify-center rounded-full"
              >
                {mark}
              </a>
            ) : (
              mark
            )}
          </li>
        );
      })}
      {hidden > 0 && (
        <li
          className={`flex ${box} items-center justify-center rounded-full bg-white text-xs font-bold text-ink ring-1 ring-line-soft`}
        >
          +{hidden}
        </li>
      )}
    </ul>
  );
}
