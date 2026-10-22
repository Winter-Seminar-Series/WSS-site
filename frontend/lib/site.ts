export const SITE_URL = process.env.NEXT_PUBLIC_ORIGIN ?? 'https://wss-sharif.com';
export const SITE_NAME = 'Winter Seminar Series';
export const SITE_SHORT_NAME = 'WSS';
export const SITE_DESCRIPTION =
  'The Winter Seminar Series (WSS) brings together leading Iranian researchers from around the world for two days of seminars, round tables and poster sessions on computer science and engineering at Sharif University of Technology.';

/** The edition the site currently promotes. Change these together when a new edition launches. */
export const CURRENT_EDITION = {
  ordinal: '10th',
  title: '10th Winter Seminar Series',
  tagline: 'Building Bridges at the Edge of Knowledge',
  dateRange: 'April 10th, 2025 - April 11th, 2025',
  startDate: '2025-04-10',
  endDate: '2025-04-11',
  // Doors open at 09:00 Tehran time (UTC+03:30).
  startsAt: '2025-04-10T09:00:00+03:30',
  timelineImages: [
    { day: 'First Day', src: 'https://s3.ir-thr-at1.arvanstorage.ir/wss/10th-WSS-timeline1-v2' },
    { day: 'Second Day', src: 'https://s3.ir-thr-at1.arvanstorage.ir/wss/10th-WSS-timeline2-v2' },
  ],
} as const;

export const VENUE = {
  name: 'Sharif University of Technology',
  city: 'Tehran',
  country: 'Iran',
  street: 'Azadi Street',
  mapUrl: 'https://maps.app.goo.gl/oGLAVseFLrysarjG6',
} as const;

export const CONTACT = {
  email: 'wss.sharif@gmail.com',
  phone: '+9802166165781',
  phoneLabel: '+98 (021) 66 16 57 81',
} as const;

export const FOUNDED_YEAR = 2015;

/** LinkedIn organisation id used for "Add certificate to profile". */
export const LINKEDIN_ORGANIZATION_ID = 30138631;

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/seminars', label: 'Seminars' },
  { href: '/round-tables', label: 'Round Tables' },
  { href: '/poster-session', label: 'Poster Session' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/about', label: 'About Us' },
];

export const PAST_EDITIONS: NavLink[] = [
  { label: '9th WSS', href: 'https://9th.wss-sharif.com' },
  { label: '8th WSS', href: 'https://8th.wss-sharif.com' },
  { label: '7th WSS', href: 'https://7th.wss-sharif.com' },
  { label: '6th WSS', href: 'https://6th.wss-sharif.com' },
  { label: '5th WSS', href: 'https://5th.wss-sharif.com' },
  { label: '4th WSS', href: 'https://4th.wss-sharif.com' },
  { label: '3rd WSS', href: 'https://3rd.wss-sharif.com' },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Telegram', href: 'https://t.me/WSS_SUT', icon: '/images/socials/telegram.svg' },
  { label: 'Instagram', href: 'https://www.instagram.com/wss_sut', icon: '/images/socials/instagram.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/wss-sut/', icon: '/images/socials/linkedin.svg' },
  { label: 'YouTube', href: 'https://www.youtube.com/@WSS-SUT', icon: '/images/socials/youtube.svg' },
  { label: 'X (Twitter)', href: 'https://twitter.com/wss_sut', icon: '/images/socials/twitter.svg' },
];

export interface LogoLink {
  name: string;
  href: string;
  src: string;
  width: number;
  height: number;
}

export const PARTNERS: LogoLink[] = [
  {
    name: 'Sharif University of Technology',
    href: 'https://www.sharif.edu/',
    src: '/images/partners/sut.svg',
    width: 60,
    height: 60,
  },
  {
    name: "Students' Scientific Chapter",
    href: 'https://t.me/ssc_public',
    src: '/images/partners/ssc.webp',
    width: 190,
    height: 92,
  },
  { name: 'Ramzinex', href: 'https://ramzinex.com/', src: '/images/partners/ramzinex.webp', width: 400, height: 214 },
  { name: 'Goldika', href: 'https://goldika.ir/', src: '/images/partners/goldika.webp', width: 400, height: 111 },
  { name: 'Yektanet', href: 'https://yektanet.com/', src: '/images/partners/yektanet.svg', width: 276, height: 101 },
  { name: 'Pardis AI', href: 'https://aipardis.ir/', src: '/images/partners/pardis.webp', width: 300, height: 229 },
  { name: 'Quera', href: 'https://quera.org/', src: '/images/partners/quera.svg', width: 109, height: 20 },
];

/** Where past speakers come from — shown as a trust strip under the hero. */
export const SPEAKER_INSTITUTIONS: LogoLink[] = [
  { name: 'Apple', href: 'https://www.apple.com', src: '/images/institutions/apple.png', width: 196, height: 196 },
  {
    name: 'University of Edinburgh',
    href: 'https://www.ed.ac.uk',
    src: '/images/institutions/edinburgh.png',
    width: 228,
    height: 227,
  },
  { name: 'EPFL', href: 'https://www.epfl.ch/en/', src: '/images/institutions/epfl.png', width: 328, height: 96 },
  {
    name: 'University of Georgia',
    href: 'https://www.uga.edu',
    src: '/images/institutions/georgia.png',
    width: 194,
    height: 194,
  },
  { name: 'Google', href: 'https://www.google.com', src: '/images/institutions/google.png', width: 166, height: 166 },
  {
    name: 'University of London',
    href: 'https://www.london.ac.uk',
    src: '/images/institutions/london.png',
    width: 312,
    height: 114,
  },
  {
    name: 'Sharif University of Technology',
    href: 'https://www.sharif.edu',
    src: '/images/institutions/sharif.png',
    width: 204,
    height: 204,
  },
  {
    name: 'University of Maryland',
    href: 'https://umd.edu',
    src: '/images/institutions/maryland.png',
    width: 202,
    height: 202,
  },
  {
    name: 'Microsoft',
    href: 'https://www.microsoft.com',
    src: '/images/institutions/microsoft.png',
    width: 228,
    height: 260,
  },
  { name: 'MIT', href: 'https://www.mit.edu', src: '/images/institutions/mit.png', width: 242, height: 140 },
  { name: 'OpenAI', href: 'https://openai.com', src: '/images/institutions/openai.png', width: 184, height: 176 },
  {
    name: 'Princeton University',
    href: 'https://www.princeton.edu',
    src: '/images/institutions/princeton.png',
    width: 238,
    height: 267,
  },
  {
    name: 'Stanford University',
    href: 'https://www.stanford.edu',
    src: '/images/institutions/stanford.png',
    width: 220,
    height: 226,
  },
  {
    name: 'University of Pennsylvania',
    href: 'https://www.upenn.edu',
    src: '/images/institutions/upenn.png',
    width: 216,
    height: 187,
  },
  {
    name: 'University of Waterloo',
    href: 'https://uwaterloo.ca',
    src: '/images/institutions/waterloo.png',
    width: 192,
    height: 192,
  },
  {
    name: 'University of California',
    href: 'https://www.universityofcalifornia.edu',
    src: '/images/institutions/california.png',
    width: 202,
    height: 206,
  },
];

export const STATS = [
  { value: '46+', label: 'Workshops in all series' },
  { value: '4500+', label: 'Participants in all series' },
  { value: '38+', label: 'Poster sessions in all series' },
  { value: '250+', label: 'Presentations in all series' },
  { value: '8+', label: 'Lab talks in all series' },
  { value: '19+', label: 'Round tables in all series' },
] as const;
