import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Logo } from '@/components/brand/Logo';
import { CURRENT_EDITION, editionHref } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { fitWithin } from '@/lib/images';
import { CONTACT, FOUNDED_YEAR, HOSTS, SITE_NAME, SOCIAL_LINKS, VENUE } from '@/lib/site';
import type { LogoLink } from '@/lib/site';

// The copyright year is fixed at build/revalidate time; computing it per request would make every page dynamic.
const CURRENT_YEAR = new Date().getFullYear();

/** Partner logos fit this box (px). */
const PARTNER_BOX = { width: 112, height: 36 };

const CONTACT_ITEMS = [
  {
    Icon: MapPin,
    label: 'Venue',
    value: `${VENUE.name}, ${VENUE.street}, ${VENUE.city}`,
    href: VENUE.mapUrl,
  },
  { Icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { Icon: Phone, label: 'Phone', value: CONTACT.phoneLabel, href: `tel:${CONTACT.phone}` },
];

function LogoRow({ logos }: { logos: LogoLink[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-8 gap-y-5">
      {logos.map((partner) => {
        const size = fitWithin(partner, PARTNER_BOX);
        return (
          <li key={partner.name}>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={partner.name}
              className="block rounded-md"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                {...size}
                style={size}
                className="object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

interface Props {
  /** Whose sponsors to show. */
  edition?: Edition;
}

export function Footer({ edition = CURRENT_EDITION }: Props) {
  return (
    <footer className="bg-canvas text-ink">
      <div className="mx-auto max-w-300 px-4 pt-14 pb-[calc(2rem+env(safe-area-inset-bottom))] md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Link
              href={editionHref(edition)}
              aria-label={`${edition.label} — home`}
              className="inline-flex min-h-11 items-center gap-3"
            >
              <Logo className="w-11 text-ink" />
              <span className="text-lg leading-tight font-extrabold tracking-tight">{SITE_NAME}</span>
            </Link>
            <p className="mt-4 text-[0.9375rem] text-muted">
              Held every winter since {FOUNDED_YEAR} by the Student Scientific Chapter of the Computer Engineering
              Department, Sharif University of Technology.
            </p>
          </div>
          <ul className="flex items-center gap-2" aria-label="Follow us">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="block rounded-full transition-transform duration-300 ease-snap hover:-translate-y-1"
                >
                  <Image src={social.icon} alt="" width={44} height={44} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-10 border-y border-line-soft py-10 md:grid-cols-[auto_1fr] md:gap-16">
          <div>
            <p className="mb-4 text-sm font-semibold text-muted">Hosted by</p>
            <LogoRow logos={HOSTS} />
          </div>
          {edition.sponsors.length > 0 && (
            <div>
              <p className="mb-4 text-sm font-semibold text-muted">Sponsors of the {edition.label}</p>
              <LogoRow logos={edition.sponsors} />
            </div>
          )}
        </div>

        <address className="mt-10 grid grid-cols-1 gap-4 not-italic sm:grid-cols-3">
          {CONTACT_ITEMS.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group -m-2 flex min-w-0 items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-surface"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-brand ring-1 ring-line-soft transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold text-muted">{label}</span>
                <span className="block text-sm font-semibold sm:truncate">{value}</span>
              </span>
            </a>
          ))}
        </address>

        <p className="mt-12 text-sm text-muted">
          © {FOUNDED_YEAR}–{CURRENT_YEAR} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
