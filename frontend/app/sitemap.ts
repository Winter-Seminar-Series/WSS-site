import type { MetadataRoute } from 'next';

import { getSubEvents, getWorkshops } from '@/api/events.api';
import { SITE_URL } from '@/lib/site';
import { SUB_EVENT_SECTIONS } from '@/lib/sub-events';
import type { SubEventKind } from '@/types/event.type';

export const revalidate = 3600;

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/seminars', priority: 0.9 },
  { path: '/round-tables', priority: 0.8 },
  { path: '/workshops', priority: 0.7 },
  { path: '/lab-talks', priority: 0.6 },
  { path: '/poster-session', priority: 0.7 },
  { path: '/timeline', priority: 0.7 },
  { path: '/about', priority: 0.6 },
  { path: '/advisors', priority: 0.4 },
  { path: '/signup', priority: 0.5 },
];

const SUB_EVENT_KINDS: SubEventKind[] = ['seminar', 'round-table', 'lab-talk'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'weekly',
    priority,
  }));

  // The sitemap must never fail because one section is unavailable: list what we can.
  const sections = await Promise.allSettled([
    ...SUB_EVENT_KINDS.map(async (kind) =>
      (await getSubEvents(kind)).map((subEvent) => `${SUB_EVENT_SECTIONS[kind].path}/${subEvent.id}`),
    ),
    getWorkshops().then((workshops) => workshops.map((workshop) => `/workshops/${workshop.id}`)),
  ]);
  for (const section of sections) {
    if (section.status !== 'fulfilled') continue;
    for (const path of section.value) {
      entries.push({ url: `${SITE_URL}${path}`, changeFrequency: 'monthly', priority: 0.6 });
    }
  }
  return entries;
}
