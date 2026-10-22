import type { SubEventKind } from '@/types/event.type';

interface SubEventSection {
  path: string;
  title: string;
  overline: string;
  description: string;
  empty: string;
}

export const SUB_EVENT_SECTIONS: Record<SubEventKind, SubEventSection> = {
  seminar: {
    path: '/seminars',
    title: 'Seminars',
    overline: 'Exploring Boundaries',
    description:
      'Two days of talks by leading researchers on the latest advances in computer science and engineering at the Winter Seminar Series.',
    empty: 'Seminars for this edition will be announced soon.',
  },
  'round-table': {
    path: '/round-tables',
    title: 'Round Tables',
    overline: 'Collaborative Insights in Computer Science',
    description:
      'Expert-led round table discussions on focused topics in computer science and the tech industry, held in Persian.',
    empty: 'Round tables for this edition will be announced soon.',
  },
  'lab-talk': {
    path: '/lab-talks',
    title: 'Lab Talks',
    overline: 'Inside the Research Labs',
    description: 'Researchers introduce their labs, ongoing projects and open positions.',
    empty: 'Lab talks for this edition will be announced soon.',
  },
};
