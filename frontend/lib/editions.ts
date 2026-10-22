import type { LogoLink } from './site';

/*
 * Every edition of the series, served by this one app. The current edition lives at the root (`/seminars`), every
 * other one under its own prefix (`/8th/seminars`), so each page of each edition has its own indexable URL.
 *
 * The routes are `app/[edition]/…`; `next.config.ts` rewrites the current edition's unprefixed URLs onto them and
 * redirects its prefixed URLs back to the root. Keep this module free of `@/` imports: next.config.ts imports it.
 *
 * Launching a new edition: add it at the top of EDITIONS. The previous one moves to its prefix automatically.
 */

export type EditionPage =
  'seminars' | 'round-tables' | 'lab-talks' | 'workshops' | 'poster-session' | 'timeline' | 'about' | 'advisors';

/**
 * Colours that differ per edition. The rest of the brand scale (strong, soft, muted, accent) is derived from
 * `brand` unless given. `brand` carries white button text, so keep it at 4.5:1 contrast against white or more.
 */
export interface EditionTheme {
  brand: string;
  inkDeep: string;
  brandStrong?: string;
  brandSoft?: string;
  brandMuted?: string;
  accent?: string;
}

export interface Edition {
  /** URL prefix and route param: `8th` → `/8th/seminars`. */
  slug: string;
  /** `core_event.id` in the API. Not the edition number: the ids were assigned newest first. */
  eventId: number;
  label: string;
  title: string;
  tagline: string;
  dateRange: string;
  startDate: string;
  endDate: string;
  /** Doors-open instant, ISO with offset. Set only while the countdown is meaningful. */
  startsAt?: string;
  /** In order: the menu, and the pages that exist for this edition (others 404). */
  nav: EditionPage[];
  /** Pages that exist but stay out of the menu. */
  hiddenPages?: EditionPage[];
  stats: { value: string; label: string }[];
  sponsors: LogoLink[];
  /** `undefined` keeps the default tokens of app/globals.css. */
  theme?: EditionTheme;
  heroImage: string;
  /** Background of the speakers band and the closing call to action. */
  bandImage: string;
  timelineImages?: { day: string; src: string }[];
}

const ARCHIVE_TAGLINE = 'Advanced Topics in Computer Science and Engineering';
const ARCHIVE_NAV: EditionPage[] = ['seminars', 'round-tables', 'lab-talks', 'workshops', 'about'];
const ARCHIVE_NAV_WITHOUT_LAB_TALKS: EditionPage[] = ['seminars', 'round-tables', 'workshops', 'about'];

function archiveImages(slug: string): Pick<Edition, 'heroImage' | 'bandImage'> {
  const image = `/images/editions/${slug}-hero.webp`;
  return { heroImage: image, bandImage: image };
}

const SPONSORS = {
  divar: { name: 'Divar', href: 'https://divar.ir/', src: '/images/partners/divar.svg', width: 61, height: 36 },
  quera: { name: 'Quera', href: 'https://quera.org/', src: '/images/partners/quera.svg', width: 109, height: 20 },
  ramzinex: {
    name: 'Ramzinex',
    href: 'https://ramzinex.com/',
    src: '/images/partners/ramzinex.webp',
    width: 400,
    height: 214,
  },
  tapsell: {
    name: 'Tapsell',
    href: 'https://tapsell.com/',
    src: '/images/partners/tapsell.svg',
    width: 1466,
    height: 257,
  },
} satisfies Record<string, LogoLink>;

/** Newest first. The first entry is the current edition. */
export const EDITIONS: readonly [Edition, ...Edition[]] = [
  {
    slug: '10th',
    eventId: 10,
    label: '10th WSS',
    title: '10th Winter Seminar Series',
    tagline: 'Building Bridges at the Edge of Knowledge',
    dateRange: 'April 10th, 2025 - April 11th, 2025',
    startDate: '2025-04-10',
    endDate: '2025-04-11',
    // Doors open at 09:00 Tehran time (UTC+03:30).
    startsAt: '2025-04-10T09:00:00+03:30',
    nav: ['seminars', 'round-tables', 'poster-session', 'timeline', 'about'],
    hiddenPages: ['lab-talks', 'workshops', 'advisors'],
    stats: [
      { value: '46+', label: 'Workshops in all series' },
      { value: '4500+', label: 'Participants in all series' },
      { value: '38+', label: 'Poster sessions in all series' },
      { value: '250+', label: 'Presentations in all series' },
      { value: '8+', label: 'Lab talks in all series' },
      { value: '19+', label: 'Round tables in all series' },
    ],
    sponsors: [
      SPONSORS.ramzinex,
      { name: 'Goldika', href: 'https://goldika.ir/', src: '/images/partners/goldika.webp', width: 400, height: 111 },
      {
        name: 'Yektanet',
        href: 'https://yektanet.com/',
        src: '/images/partners/yektanet.svg',
        width: 276,
        height: 101,
      },
      { name: 'Pardis AI', href: 'https://aipardis.ir/', src: '/images/partners/pardis.webp', width: 300, height: 229 },
      SPONSORS.quera,
    ],
    heroImage: '/images/hero.webp',
    bandImage: '/images/speakers-bg.webp',
    timelineImages: [
      { day: 'First Day', src: 'https://s3.ir-thr-at1.arvanstorage.ir/wss/10th-WSS-timeline1-v2' },
      { day: 'Second Day', src: 'https://s3.ir-thr-at1.arvanstorage.ir/wss/10th-WSS-timeline2-v2' },
    ],
  },
  {
    slug: '9th',
    eventId: 1,
    label: '9th WSS',
    title: '9th Winter Seminar Series',
    tagline: ARCHIVE_TAGLINE,
    dateRange: 'February 28th, 2024 - March 3rd, 2024',
    startDate: '2024-02-28',
    endDate: '2024-03-03',
    nav: ARCHIVE_NAV_WITHOUT_LAB_TALKS,
    stats: [
      { value: '1600+', label: 'Participants' },
      { value: '42+', label: 'Presentations' },
      { value: '18+', label: 'Workshop sessions' },
      { value: '16+', label: 'Poster sessions and round tables' },
    ],
    sponsors: [
      SPONSORS.divar,
      SPONSORS.quera,
      SPONSORS.ramzinex,
      {
        name: 'Cafe Bazaar',
        href: 'https://cafebazaar.ir/',
        src: '/images/partners/bazaar.svg',
        width: 101,
        height: 40,
      },
      { name: 'Irancell', href: 'https://irancell.ir/', src: '/images/partners/irancell.svg', width: 300, height: 150 },
    ],
    theme: { brand: '#8a5f88', inkDeep: '#342b4c', brandSoft: '#ebe8f2' },
    ...archiveImages('9th'),
  },
  {
    slug: '8th',
    eventId: 2,
    label: '8th WSS',
    title: '8th Winter Seminar Series',
    tagline: ARCHIVE_TAGLINE,
    dateRange: 'April 6th, 2023 - April 9th, 2023',
    startDate: '2023-04-06',
    endDate: '2023-04-09',
    nav: ARCHIVE_NAV,
    stats: [
      { value: '1100+', label: 'Participants' },
      { value: '29+', label: 'Presentations' },
      { value: '21+', label: 'Poster sessions and round tables' },
      { value: '7+', label: 'Workshop sessions and lab talks' },
    ],
    sponsors: [
      SPONSORS.divar,
      SPONSORS.quera,
      { name: 'Flightio', href: 'https://flightio.com/', src: '/images/partners/flightio.svg', width: 241, height: 67 },
      { name: 'Part AI', href: 'https://partdp.ai/', src: '/images/partners/part-ai.svg', width: 145, height: 103 },
    ],
    theme: { brand: '#52727b', inkDeep: '#052848' },
    ...archiveImages('8th'),
  },
  {
    slug: '7th',
    eventId: 3,
    label: '7th WSS',
    title: '7th Winter Seminar Series',
    tagline: ARCHIVE_TAGLINE,
    dateRange: 'February 24th, 2022 - February 27th, 2022',
    startDate: '2022-02-24',
    endDate: '2022-02-27',
    nav: ARCHIVE_NAV,
    stats: [
      { value: '900+', label: 'Participants' },
      { value: '22+', label: 'Presentations' },
      { value: '4+', label: 'Round tables' },
      { value: '4+', label: 'Lab talks' },
    ],
    sponsors: [SPONSORS.tapsell],
    theme: { brand: '#0300ad', inkDeep: '#02005e' },
    ...archiveImages('7th'),
  },
  {
    slug: '6th',
    eventId: 4,
    label: '6th WSS',
    title: '6th Winter Seminar Series',
    tagline: ARCHIVE_TAGLINE,
    dateRange: 'December 31st, 2020 - January 3rd, 2021',
    startDate: '2020-12-31',
    endDate: '2021-01-03',
    nav: ARCHIVE_NAV_WITHOUT_LAB_TALKS,
    stats: [
      { value: '519+', label: 'Participants' },
      { value: '28+', label: 'Presentations' },
      { value: '6+', label: 'Workshop sessions' },
      { value: '4+', label: 'Round tables' },
    ],
    sponsors: [],
    theme: { brand: '#7b5ba6', inkDeep: '#020d29' },
    ...archiveImages('6th'),
  },
  {
    slug: '5th',
    eventId: 5,
    label: '5th WSS',
    title: '5th Winter Seminar Series',
    tagline: ARCHIVE_TAGLINE,
    dateRange: 'January 2nd, 2020 - January 3rd, 2020',
    startDate: '2020-01-02',
    endDate: '2020-01-03',
    nav: ARCHIVE_NAV,
    stats: [
      { value: '428+', label: 'Participants' },
      { value: '26+', label: 'Presentations' },
      { value: '10+', label: 'Round tables and poster sessions' },
      { value: '7+', label: 'Workshop sessions' },
    ],
    sponsors: [
      { name: 'Fanap', href: 'https://www.fanaptech.ir/', src: '/images/partners/fanap.webp', width: 356, height: 141 },
    ],
    theme: { brand: '#017f29', inkDeep: '#05391e' },
    ...archiveImages('5th'),
  },
  {
    slug: '4th',
    eventId: 6,
    label: '4th WSS',
    title: '4th Winter Seminar Series',
    tagline: ARCHIVE_TAGLINE,
    dateRange: 'December 26th, 2018 - December 27th, 2018',
    startDate: '2018-12-26',
    endDate: '2018-12-27',
    nav: ARCHIVE_NAV,
    stats: [
      { value: '360+', label: 'Participants' },
      { value: '28+', label: 'Presentations' },
      { value: '2+', label: 'Round tables' },
      { value: '5+', label: 'Workshop sessions' },
    ],
    sponsors: [
      { name: 'Tosan', href: 'https://www.tosan.com/', src: '/images/partners/tosan.svg', width: 709, height: 171 },
    ],
    theme: { brand: '#0e6790', inkDeep: '#032c3f' },
    ...archiveImages('4th'),
  },
  {
    slug: '3rd',
    eventId: 7,
    label: '3rd WSS',
    title: '3rd Winter Seminar Series',
    tagline: ARCHIVE_TAGLINE,
    dateRange: 'December 27th, 2017 - December 28th, 2017',
    startDate: '2017-12-27',
    endDate: '2017-12-28',
    nav: ARCHIVE_NAV,
    stats: [
      { value: '300+', label: 'Participants' },
      { value: '27+', label: 'Presentations' },
      { value: '7+', label: 'Workshop sessions' },
    ],
    sponsors: [
      { name: 'Sahab', href: 'https://www.sahab.ir/', src: '/images/partners/sahab.webp', width: 400, height: 115 },
      { name: 'Pushe', href: 'https://pushe.co/', src: '/images/partners/pushe.svg', width: 77, height: 14 },
    ],
    theme: { brand: '#0e6790', inkDeep: '#2d3542' },
    ...archiveImages('3rd'),
  },
];

export const CURRENT_EDITION: Edition = EDITIONS[0];

export function findEdition(slug: string): Edition | undefined {
  return EDITIONS.find((edition) => edition.slug === slug);
}

export function isCurrentEdition(edition: Edition): boolean {
  return edition.slug === CURRENT_EDITION.slug;
}

export function hasPage(edition: Edition, page: EditionPage): boolean {
  return edition.nav.includes(page) || (edition.hiddenPages?.includes(page) ?? false);
}

/** Every page of an edition, menu first. */
export function editionPages(edition: Edition): EditionPage[] {
  return [...edition.nav, ...(edition.hiddenPages ?? [])];
}

/** The public URL path of `path` (absolute, e.g. `/seminars/12`) within an edition. */
export function editionHref(edition: Pick<Edition, 'slug'>, path = '/'): string {
  if (edition.slug === CURRENT_EDITION.slug) return path;
  return path === '/' ? `/${edition.slug}` : `/${edition.slug}${path}`;
}

export const PAGE_LABELS: Record<EditionPage, string> = {
  seminars: 'Seminars',
  'round-tables': 'Round Tables',
  'lab-talks': 'Lab Talks',
  workshops: 'Workshops',
  'poster-session': 'Poster Session',
  timeline: 'Timeline',
  about: 'About Us',
  advisors: 'Advisors',
};
