import { notFound } from 'next/navigation';

import { EDITIONS, findEdition, hasPage } from '@/lib/editions';
import type { Edition, EditionPage } from '@/lib/editions';

/**
 * The editions a page is prerendered for (as a shell, see services/http.ts): all of them for the home page, else
 * only those that have the page. Anything else renders on demand and 404s in `resolveEdition`.
 */
export function editionStaticParams(page?: EditionPage): () => { edition: string }[] {
  return () =>
    EDITIONS.filter((edition) => !page || hasPage(edition, page)).map((edition) => ({ edition: edition.slug }));
}

/** The edition of a route, or a 404 when the slug is unknown or the edition has no such page. */
export async function resolveEdition(params: Promise<{ edition: string }>, page?: EditionPage): Promise<Edition> {
  const edition = findEdition((await params).edition);
  if (!edition || (page && !hasPage(edition, page))) notFound();
  return edition;
}
