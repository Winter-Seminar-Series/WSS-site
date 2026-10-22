import { toIsoDateTime } from '@/lib/dates';
import { CURRENT_EDITION, SITE_NAME, SITE_URL, SOCIAL_LINKS, VENUE } from '@/lib/site';
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

export const editionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationEvent',
  name: CURRENT_EDITION.title,
  description: CURRENT_EDITION.tagline,
  startDate: CURRENT_EDITION.startsAt,
  endDate: `${CURRENT_EDITION.endDate}T18:00:00+03:30`,
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: place,
  image: [`${SITE_URL}/og.png`],
  url: SITE_URL,
  organizer: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
};

export function subEventJsonLd(subEvent: SubEvent, url: string) {
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
    superEvent: { '@type': 'EducationEvent', name: CURRENT_EDITION.title, url: SITE_URL },
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
