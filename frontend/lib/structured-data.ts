import { toIsoDateTime } from '@/lib/dates';
import { editionHref } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { SITE_NAME, SITE_URL, SOCIAL_LINKS, VENUE } from '@/lib/site';
import type { SubEvent } from '@/types/event.type';

/* schema.org JSON-LD builders — rich results for the event and its sessions. */

const place = {
  '@type': 'Place',
  name: VENUE.name,
  address: {
    '@type': 'PostalAddress',
    streetAddress: VENUE.street,
    addressLocality: VENUE.city,
    addressCountry: 'IR',
  },
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'WSS',
  url: SITE_URL,
  logo: `${SITE_URL}/og.png`,
  sameAs: SOCIAL_LINKS.map((social) => social.href),
  parentOrganization: { '@type': 'CollegeOrUniversity', name: VENUE.name, url: 'https://www.sharif.edu' },
};

/** Doors open at 09:00 and close at 18:00 Tehran time unless an edition says otherwise. */
function editionStart(edition: Edition): string {
  return edition.startsAt ?? `${edition.startDate}T09:00:00+03:30`;
}

function editionUrl(edition: Edition): string {
  return `${SITE_URL}${editionHref(edition)}`;
}

export function editionJsonLd(edition: Edition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: edition.title,
    description: edition.tagline,
    startDate: editionStart(edition),
    endDate: `${edition.endDate}T18:00:00+03:30`,
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: place,
    image: [`${SITE_URL}/og.png`],
    url: editionUrl(edition),
    organizer: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}

export function subEventJsonLd(edition: Edition, subEvent: SubEvent, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: subEvent.name,
    startDate: toIsoDateTime(subEvent.date, subEvent.startTime),
    endDate: toIsoDateTime(subEvent.date, subEvent.endTime),
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: place,
    image: [subEvent.poster ?? subEvent.thumbnail ?? `${SITE_URL}/og.png`],
    url,
    performer: subEvent.speakers.map((speaker) => ({
      '@type': 'Person',
      name: speaker.name,
      jobTitle: speaker.designation || undefined,
    })),
    superEvent: { '@type': 'EducationEvent', name: edition.title, url: editionUrl(edition) },
    organizer: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
