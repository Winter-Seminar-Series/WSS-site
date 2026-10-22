import type { Metadata } from 'next';

import { SubEventList } from '@/components/events/SubEventViews';
import { subEventListMetadata } from '@/lib/metadata';

export const revalidate = 900;

export const metadata: Metadata = subEventListMetadata('seminar');

export default function Page() {
  return <SubEventList kind="seminar" />;
}
