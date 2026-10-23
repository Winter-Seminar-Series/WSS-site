import type { Metadata } from 'next';

import { SubEventList } from '@/components/events/SubEventViews';
import { editionStaticParams, resolveEdition } from '@/lib/edition-route';
import { subEventListMetadata } from '@/lib/metadata';

export const revalidate = 900;

export const generateStaticParams = editionStaticParams();

export async function generateMetadata({ params }: PageProps<'/[edition]/round-tables'>): Promise<Metadata> {
  return subEventListMetadata(await resolveEdition(params, 'round-tables'), 'round-table');
}

export default async function Page({ params }: PageProps<'/[edition]/round-tables'>) {
  return <SubEventList edition={await resolveEdition(params, 'round-tables')} kind="round-table" />;
}
