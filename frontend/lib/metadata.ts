import type { Metadata } from 'next';

import { getSubEvent, getSubEvents } from '@/api/events.api';
import { editionHref, isCurrentEdition } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { SUB_EVENT_SECTIONS } from '@/lib/sub-events';
import type { SubEventKind } from '@/types/event.type';

const DESCRIPTION_LENGTH = 160;

/** Plain-text summary for meta descriptions, cut at a word boundary. */
export function summarize(html: string, fallback: string): string {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return fallback;
  if (text.length <= DESCRIPTION_LENGTH) return text;
  return `${text.slice(0, text.lastIndexOf(' ', DESCRIPTION_LENGTH - 1))}…`;
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

/**
 * Metadata of a page within an edition (`path` is edition-relative, e.g. `/seminars`). The canonical URL carries the
 * edition prefix, and archived editions name themselves in the title and description, so no two editions compete
 * for the same snippet.
 */
export function editionPageMetadata(edition: Edition, title: string, description: string, path: string): Metadata {
  if (isCurrentEdition(edition)) return pageMetadata(title, description, path);
  const metadata = pageMetadata(
    `${title} — ${edition.label}`,
    `${edition.title}: ${description}`,
    editionHref(edition, path),
  );
  // The edition label already says WSS: skip the root template's `| WSS` suffix.
  return { ...metadata, title: { absolute: `${title} | ${edition.label}` } };
}

/** An archived edition's empty section has nothing worth indexing; the current edition's is about to fill up. */
export function emptySectionRobots(edition: Edition, isEmpty: boolean): Metadata {
  return isEmpty && !isCurrentEdition(edition) ? { robots: { index: false, follow: true } } : {};
}

/** Private pages: keep them out of search results and link previews. */
export const PRIVATE_PAGE: Metadata = { robots: { index: false, follow: false } };

export function parseId(value: string): number | null {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function subEventListMetadata(edition: Edition, kind: SubEventKind): Promise<Metadata> {
  const section = SUB_EVENT_SECTIONS[kind];
  const subEvents = await getSubEvents(edition.eventId, kind);
  return {
    ...editionPageMetadata(edition, section.title, section.description, section.path),
    ...emptySectionRobots(edition, subEvents.length === 0),
  };
}

export async function subEventMetadata(edition: Edition, kind: SubEventKind, rawId: string): Promise<Metadata> {
  const id = parseId(rawId);
  const subEvent = id ? await getSubEvent(edition.eventId, kind, id) : null;
  if (!subEvent) return { title: 'Not found', ...PRIVATE_PAGE };

  const section = SUB_EVENT_SECTIONS[kind];
  const speakers = subEvent.speakers.map((speaker) => speaker.name).join(', ');
  const title = speakers ? `${subEvent.name} — ${speakers}` : subEvent.name;
  const image = subEvent.poster ?? subEvent.thumbnail;
  const metadata = editionPageMetadata(
    edition,
    title,
    summarize(subEvent.descriptionHtml, section.description),
    `${section.path}/${subEvent.id}`,
  );
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      ...(image ? { images: [{ url: image, alt: subEvent.name }] } : {}),
    },
    twitter: image ? { card: 'summary_large_image', images: [image] } : undefined,
  };
}

/** Nothing is prerendered at build: each detail page renders on its first request, then ISR keeps it cached. */
export function noStaticParams(): { id: string }[] {
  return [];
}
