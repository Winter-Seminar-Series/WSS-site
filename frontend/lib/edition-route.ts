import { notFound } from 'next/navigation';

import { EDITIONS, findEdition, hasPage } from '@/lib/editions';
import type { Edition, EditionPage } from '@/lib/editions';

/**
 * Pages are not prerendered. `next build` never calls the API, so a prerendered page would be an empty shell that
 * the first visitor gets (stale-while-revalidate) and only the second sees filled in. With no params at build, the
 * first request renders with real data and ISR caches it for `revalidate` seconds; `resolveEdition` 404s the rest.
 */
export function editionStaticParams(): () => { edition: string }[] {
  return () => [];
}

/** The edition of a route, or a 404 when the slug is unknown or the edition has no such page. */
export async function resolveEdition(params: Promise<{ edition: string }>, page?: EditionPage): Promise<Edition> {
  const edition = findEdition((await params).edition);
  if (!edition || (page && !hasPage(edition, page))) notFound();
  return edition;
}
