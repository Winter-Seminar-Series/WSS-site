import type { MetadataRoute } from 'next';

import { getSubEvents, getWorkshops } from '@/api/events.api';
import { EDITIONS, editionHref, editionPages, hasPage, isCurrentEdition } from '@/lib/editions';
import type { Edition, EditionPage } from '@/lib/editions';
import { SITE_URL } from '@/lib/site';
import { SUB_EVENT_SECTIONS } from '@/lib/sub-events';
import type { SubEventKind } from '@/types/event.type';

export const dynamic = 'force-dynamic';

const PAGE_PRIORITY: Record<EditionPage, number> = {
  seminars: 0.9,
  'round-tables': 0.8,
  workshops: 0.7,
  'poster-session': 0.7,
  timeline: 0.6,
  'lab-talks': 0.8,
  about: 0.9,
  advisors: 0.85,
};

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency'];

const SUB_EVENT_PAGES: [SubEventKind, EditionPage][] = [
  ['seminar', 'seminars'],
  ['round-table', 'round-tables'],
  ['lab-talk', 'lab-talks'],
];

/** Archived editions no longer change, and rank below the current one. */
const ARCHIVE_PRIORITY_FACTOR = 0.5;

/**
 * The API signs bucket URLs (`?AWSAccessKeyId=…&Signature=…&Expires=…`). In the sitemap that breaks the XML (Next does
 * not escape the `&` in `<image:loc>`), exposes the key id, and goes stale when `Expires` passes. The bucket serves
 * the same object publicly without the query.
 */
function publicImageUrl(image: string): string {
  const url = new URL(image);
  url.search = '';
  url.hash = '';
  return url.href;
}

/** A detail page of a listing: its edition-relative path and its poster, for the image sitemap. */
interface ListedPage {
  path: string;
  image: string | null;
}

type Listing = [EditionPage, () => Promise<ListedPage[]>];

/** Detail pages of each listing of an edition (`/seminars/12`, …); `null` when the API could not be reached. */
async function listedPages(edition: Edition): Promise<Map<EditionPage, ListedPage[] | null>> {
  const listings: Listing[] = [
    ...SUB_EVENT_PAGES.map(([kind, page]): Listing => [
      page,
      async () =>
        (await getSubEvents(edition.eventId, kind)).map((subEvent) => ({
          path: `${SUB_EVENT_SECTIONS[kind].path}/${subEvent.id}`,
          image: subEvent.poster ?? subEvent.thumbnail,
        })),
    ]),
    [
      'workshops',
      async () =>
        (await getWorkshops(edition.eventId)).map((workshop) => ({
          path: `/workshops/${workshop.id}`,
          image: workshop.poster ?? workshop.thumbnail,
        })),
    ],
  ];
  const available = listings.filter(([page]) => hasPage(edition, page));
  // The sitemap must never fail because one section is unavailable: list what we can.
  const results = await Promise.allSettled(available.map(([, load]) => load()));
  return new Map(
    available.map(([page], index) => {
      const result = results[index];
      return [page, result?.status === 'fulfilled' ? result.value : null];
    }),
  );
}

async function editionEntries(edition: Edition): Promise<MetadataRoute.Sitemap> {
  const current = isCurrentEdition(edition);
  const factor = current ? 1 : ARCHIVE_PRIORITY_FACTOR;
  const changeFrequency: ChangeFrequency = current ? 'weekly' : 'yearly';
  const detailFrequency: ChangeFrequency = current ? 'monthly' : 'yearly';
  const url = (path: string) => `${SITE_URL}${editionHref(edition, path)}`;
  const listed = await listedPages(edition);

  // An archived edition's empty listing is noindex (lib/metadata.ts emptySectionRobots), so it stays out too.
  const pages = editionPages(edition).filter((page) => current || listed.get(page)?.length !== 0);
  return [
    { url: url('/'), changeFrequency, priority: factor },
    ...pages.map((page) => ({ url: url(`/${page}`), changeFrequency, priority: PAGE_PRIORITY[page] * factor })),
    ...[...listed.values()].flatMap((details) =>
      (details ?? []).map(({ path, image }) => ({
        url: url(path),
        changeFrequency: detailFrequency,
        priority: 0.6 * factor,
        ...(image ? { images: [publicImageUrl(image)] } : {}),
      })),
    ),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const editions = await Promise.all(EDITIONS.map(editionEntries));
  return [...editions.flat(), { url: `${SITE_URL}/signup`, changeFrequency: 'monthly', priority: 0.5 }];
}
