import { Mail, Map, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { CURRENT_EDITION, editionHref } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { CONTACT, FOUNDED_YEAR, HOSTS, SITE_NAME, SOCIAL_LINKS, VENUE } from '@/lib/site';

// The copyright year is fixed at build/revalidate time; computing it per request would make every page dynamic.
const CURRENT_YEAR = new Date().getFullYear();

const CONTACT_ITEMS = [
  { Icon: MapPin, label: 'Location', value: VENUE.name, href: VENUE.mapUrl },
  { Icon: Map, label: 'Address', value: `${VENUE.street}, ${VENUE.city}, ${VENUE.country}`, href: VENUE.mapUrl },
  { Icon: Mail, label: 'Mail', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { Icon: Phone, label: 'Tel', value: CONTACT.phoneLabel, href: `tel:${CONTACT.phone}` },
];

interface Props {
  /** Whose sponsors to show. */
  edition?: Edition;
}

export function Footer({ edition = CURRENT_EDITION }: Props) {
  return (
    <footer className="border-t border-line-soft bg-surface pt-14 pb-8 text-ink">
      <div className="mx-auto max-w-300 px-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:justify-between">
          <li>
            <Link href={editionHref(edition)} aria-label={`${edition.label} — home`}>
              <Image
                src="/images/partners/wss.svg"
                alt={SITE_NAME}
                width={72}
                height={48}
                className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </Link>
          </li>
          {[...HOSTS, ...edition.sponsors].map((partner) => (
            <li key={partner.name}>
              <a href={partner.href} target="_blank" rel="noopener noreferrer" aria-label={partner.name}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  // Rendered 40px tall; request exactly that so the srcset is just 1x/2x.
                  width={Math.round((40 * partner.width) / partner.height)}
                  height={40}
                  className="h-10 w-auto max-w-32 object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="my-10 flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="max-w-prose text-center text-sm text-muted md:text-start">
            The event is held by the Student Scientific Chapter (SSC) of the Computer Engineering Department of Sharif
            University of Technology.
          </p>
          <ul className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="block transition-transform hover:-translate-y-0.5"
                >
                  <Image src={social.icon} alt="" width={44} height={44} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <address className="grid grid-cols-1 gap-6 not-italic sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_ITEMS.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-muted">{label}</span>
                <span className="block text-sm font-semibold">{value}</span>
              </span>
            </a>
          ))}
        </address>

        <p className="mt-10 text-center text-sm text-muted md:text-end">
          © {FOUNDED_YEAR}–{CURRENT_YEAR} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
