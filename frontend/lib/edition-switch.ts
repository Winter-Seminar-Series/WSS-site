import type { NavLink } from '@/lib/site';

/*
 * Client-safe: the navbar imports this, so it must not import the edition registry (lib/editions.ts) itself.
 */

/** What the client navbar needs to know about the editions: plain, serialisable, and nothing more. */
export interface EditionNavItem {
  slug: string;
  label: string;
  homeHref: string;
  /** First path segments this edition serves, e.g. `seminars`. */
  pages: string[];
}

/** One entry of the edition switcher. */
export interface EditionLink extends NavLink {
  current: boolean;
}

export interface EditionNav {
  edition: EditionNavItem;
  isCurrent: boolean;
  links: NavLink[];
  editions: EditionNavItem[];
}

/**
 * Where switching to `target` from `pathname` leads: the same section if `target` has it, else its home. Detail
 * pages map to their section, since ids belong to one edition.
 */
export function switchEditionHref(pathname: string, from: EditionNavItem, target: EditionNavItem): string {
  const local = from.homeHref === '/' ? pathname : pathname.slice(from.homeHref.length);
  const section = local.split('/')[1] ?? '';
  if (!target.pages.includes(section)) return target.homeHref;
  return target.homeHref === '/' ? `/${section}` : `${target.homeHref}/${section}`;
}
