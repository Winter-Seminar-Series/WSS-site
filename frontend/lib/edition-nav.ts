import type { EditionNav, EditionNavItem } from '@/lib/edition-switch';
import { CURRENT_EDITION, EDITIONS, PAGE_LABELS, editionHref, editionPages } from '@/lib/editions';
import type { Edition } from '@/lib/editions';

function navItem(edition: Edition): EditionNavItem {
  return { slug: edition.slug, label: edition.label, homeHref: editionHref(edition), pages: editionPages(edition) };
}

export function editionNav(edition: Edition = CURRENT_EDITION): EditionNav {
  return {
    edition: navItem(edition),
    isCurrent: edition.slug === CURRENT_EDITION.slug,
    links: edition.nav.map((page) => ({ href: editionHref(edition, `/${page}`), label: PAGE_LABELS[page] })),
    editions: EDITIONS.map(navItem),
  };
}
