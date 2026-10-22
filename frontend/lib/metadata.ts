import type { Metadata } from 'next';

import { getSubEvent, getSubEvents } from '@/api/events.api';
import { CURRENT_EDITION, editionHref, isCurrentEdition } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { SITE_NAME, SITE_SHORT_NAME, TWITTER_HANDLE } from '@/lib/site';
import { SOCIAL_IMAGE_SIZE, socialImagePath } from '@/lib/social-image';
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

interface SocialImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

function editionSocialImage(edition: Edition): SocialImage {
  return { url: socialImagePath(edition), ...SOCIAL_IMAGE_SIZE, alt: edition.title };
}

/** A session's own poster first; the edition card stays as a fallback for platforms that reject its size. */
export function posterImages(edition: Edition, poster: string | null, alt: string): SocialImage[] | undefined {
  return poster ? [{ url: poster, alt }, editionSocialImage(edition)] : undefined;
}

interface SocialOptions {
  /** Whose social card to use. Pages outside an edition use the current one. */
  edition?: Edition;
  /** Overrides the edition's card, e.g. with a session poster. */
  images?: SocialImage[];
  /** The full title, when `<title> | <edition>` does not fit (e.g. an edition's home page). */
  fullTitle?: string;
}

/**
 * Complete metadata for an indexable page. Next merges metadata per top-level key, so a page that sets `openGraph`
 * or `twitter` at all replaces the root layout's object; this always sets every field of both. The title is
 * `<title> | WSS` for the current edition and `<title> | 8th WSS` for an archive, and social cards use the same.
 */
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  { edition = CURRENT_EDITION, images, fullTitle }: SocialOptions = {},
): Metadata {
  const socialImages = images ?? [editionSocialImage(edition)];
  const suffix = isCurrentEdition(edition) ? SITE_SHORT_NAME : edition.label;
  const documentTitle = fullTitle ?? `${title} | ${suffix}`;
  return {
    title: { absolute: documentTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      title: documentTitle,
      description,
      url: path,
      images: socialImages,
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title: documentTitle,
      description,
      images: socialImages.map(({ url, alt }) => ({ url, alt })),
    },
  };
}

/**
 * Metadata of a page within an edition (`path` is edition-relative, e.g. `/seminars`). The canonical URL carries the
 * edition prefix, and archived editions name themselves in the title and description, so no two editions compete
 * for the same snippet.
 */
export function editionPageMetadata(
  edition: Edition,
  title: string,
  description: string,
  path: string,
  images?: SocialImage[],
): Metadata {
  if (isCurrentEdition(edition)) return pageMetadata(title, description, path, { edition, images });
  return pageMetadata(title, summarize(`${edition.label}: ${description}`, description), editionHref(edition, path), {
    edition,
    images,
  });
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
  const metadata = editionPageMetadata(
    edition,
    title,
    summarize(subEvent.descriptionHtml, section.description),
    `${section.path}/${subEvent.id}`,
    posterImages(edition, subEvent.poster ?? subEvent.thumbnail, subEvent.name),
  );
  return { ...metadata, openGraph: { ...metadata.openGraph, type: 'article' } };
}

/** Nothing is prerendered at build: each detail page renders on its first request, then ISR keeps it cached. */
export function noStaticParams(): { id: string }[] {
  return [];
}
