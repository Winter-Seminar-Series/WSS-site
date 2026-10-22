import { toIsoDateTime } from '@/lib/dates';
import { editionHref } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { CONTACT, SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME, SITE_URL, SOCIAL_LINKS, VENUE } from '@/lib/site';
import { socialImagePath } from '@/lib/social-image';
import type { Speaker, SubEvent, Workshop } from '@/types/event.type';

/*
 * schema.org JSON-LD builders: the site name and organisation (root layout), and an EducationEvent per edition and
 * per session for event rich results. Organisation and website are declared once with an `@id` and referenced.
 */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const place = {
  '@type': 'Place',
  name: VENUE.name,
  address: {
    '@type': 'PostalAddress',
    streetAddress: VENUE.street,
    addressLocality: VENUE.city,
    addressRegion: VENUE.city,
    addressCountry: 'IR',
  },
};

const organizer = { '@type': 'Organization', '@id': ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL };

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/og.png`, width: 428, height: 428 },
  email: CONTACT.email,
  sameAs: SOCIAL_LINKS.map((social) => social.href),
  parentOrganization: { '@type': 'CollegeOrUniversity', name: VENUE.name, url: 'https://www.sharif.edu' },
};

/** Lets Google show "Winter Seminar Series" as the site name in results. */
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: SITE_URL,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION_ID },
};

function editionUrl(edition: Edition): string {
  return `${SITE_URL}${editionHref(edition)}`;
}

/** Talks are given at the venue and streamed: mixed attendance needs both a place and a virtual location. */
function locations(edition: Edition) {
  return [place, { '@type': 'VirtualLocation', url: editionUrl(edition) }];
}

/** Doors open at 09:00 and close at 18:00 Tehran time unless an edition says otherwise. */
function editionStart(edition: Edition): string {
  return edition.startsAt ?? `${edition.startDate}T09:00:00+03:30`;
}

function performer(speaker: Speaker) {
  return {
    '@type': 'Person',
    name: speaker.name,
    jobTitle: speaker.designation || undefined,
    image: speaker.image ?? undefined,
  };
}

/** Fields shared by every event of an edition. */
function eventBase(edition: Edition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: locations(edition),
    organizer,
    inLanguage: 'en',
  };
}

export function editionJsonLd(edition: Edition) {
  return {
    ...eventBase(edition),
    name: edition.title,
    description: `${edition.tagline}. ${SITE_DESCRIPTION}`,
    startDate: editionStart(edition),
    endDate: `${edition.endDate}T18:00:00+03:30`,
    image: [`${SITE_URL}${socialImagePath(edition)}`],
    url: editionUrl(edition),
  };
}

function sessionImage(edition: Edition, poster: string | null): string[] {
  return poster ? [poster, `${SITE_URL}${socialImagePath(edition)}`] : [`${SITE_URL}${socialImagePath(edition)}`];
}

function superEvent(edition: Edition) {
  return { '@type': 'EducationEvent', name: edition.title, url: editionUrl(edition) };
}

/** `url` is absolute; `description` is plain text (lib/metadata.ts `summarize`). */
export function subEventJsonLd(edition: Edition, subEvent: SubEvent, url: string, description: string) {
  return {
    ...eventBase(edition),
    name: subEvent.name,
    description,
    startDate: toIsoDateTime(subEvent.date, subEvent.startTime),
    endDate: toIsoDateTime(subEvent.date, subEvent.endTime),
    image: sessionImage(edition, subEvent.poster ?? subEvent.thumbnail),
    url,
    performer: subEvent.speakers.map(performer),
    superEvent: superEvent(edition),
  };
}

/** A workshop spans its sessions; it is listed only once it has any. */
export function workshopJsonLd(edition: Edition, workshop: Workshop, url: string, description: string) {
  const first = workshop.sessions.at(0);
  const last = workshop.sessions.at(-1);
  if (!first || !last) return null;
  const speakers = new Map(workshop.sessions.map((session) => [session.speaker.id, session.speaker]));
  return {
    ...eventBase(edition),
    name: workshop.name,
    description,
    startDate: toIsoDateTime(first.date, first.startTime),
    endDate: toIsoDateTime(last.date, last.endTime),
    image: sessionImage(edition, workshop.poster ?? workshop.thumbnail),
    url,
    performer: [...speakers.values()].map(performer),
    superEvent: superEvent(edition),
    subEvent: workshop.sessions.map((session) => ({
      '@type': 'EducationEvent',
      name: session.name,
      startDate: toIsoDateTime(session.date, session.startTime),
      endDate: toIsoDateTime(session.date, session.endTime),
    })),
  };
}

/** `path`s are public paths (already edition-prefixed). */
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

/** Edition home › section (› item) breadcrumbs. `section.path` is edition-relative, e.g. `/seminars`. */
export function editionBreadcrumbs(
  edition: Edition,
  section: { title: string; path: string },
  item?: { name: string; id: number },
) {
  const sectionPath = editionHref(edition, section.path);
  return breadcrumbJsonLd([
    { name: edition.label, path: editionHref(edition) },
    { name: section.title, path: sectionPath },
    ...(item ? [{ name: item.name, path: `${sectionPath}/${item.id}` }] : []),
  ]);
}
