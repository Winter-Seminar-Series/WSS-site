import type { Metadata } from 'next';

import { SubEventList } from '@/components/events/SubEventViews';
import { editionStaticParams, resolveEdition } from '@/lib/edition-route';
import { subEventListMetadata } from '@/lib/metadata';

// Temporarily dynamic while the data cache is off (PUBLIC_DATA_CACHE in services/http.ts); was `revalidate = 900`.
export const dynamic = 'force-dynamic';

export const generateStaticParams = editionStaticParams();

export async function generateMetadata({ params }: PageProps<'/[edition]/seminars'>): Promise<Metadata> {
  return subEventListMetadata(await resolveEdition(params, 'seminars'), 'seminar');
}

export default async function Page({ params }: PageProps<'/[edition]/seminars'>) {
  return <SubEventList edition={await resolveEdition(params, 'seminars')} kind="seminar" />;
}
