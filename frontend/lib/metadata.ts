import type { Metadata } from 'next';

import { getSubEvent } from '@/api/events.api';
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

/** Private pages: keep them out of search results and link previews. */
export const PRIVATE_PAGE: Metadata = { robots: { index: false, follow: false } };

export function parseId(value: string): number | null {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export function subEventListMetadata(kind: SubEventKind): Metadata {
  const section = SUB_EVENT_SECTIONS[kind];
  return pageMetadata(section.title, section.description, section.path);
}

export async function subEventMetadata(kind: SubEventKind, rawId: string): Promise<Metadata> {
  const id = parseId(rawId);
  const subEvent = id ? await getSubEvent(kind, id) : null;
  if (!subEvent) return { title: 'Not found', ...PRIVATE_PAGE };

  const section = SUB_EVENT_SECTIONS[kind];
  const speakers = subEvent.speakers.map((speaker) => speaker.name).join(', ');
  const title = speakers ? `${subEvent.name} — ${speakers}` : subEvent.name;
  const image = subEvent.poster ?? subEvent.thumbnail;
  return {
    ...pageMetadata(title, summarize(subEvent.descriptionHtml, section.description), `${section.path}/${subEvent.id}`),
    openGraph: {
      type: 'article',
      title,
      url: `${section.path}/${subEvent.id}`,
      description: summarize(subEvent.descriptionHtml, section.description),
      ...(image ? { images: [{ url: image, alt: subEvent.name }] } : {}),
    },
    twitter: image ? { card: 'summary_large_image', images: [image] } : undefined,
  };
}

/** Nothing is prerendered at build: each detail page renders on its first request, then ISR keeps it cached. */
export function noStaticParams(): { id: string }[] {
  return [];
}
