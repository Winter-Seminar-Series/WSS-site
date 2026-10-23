import type { Metadata } from 'next';

import { SubEventList } from '@/components/events/SubEventViews';
import { editionStaticParams, resolveEdition } from '@/lib/edition-route';
import { subEventListMetadata } from '@/lib/metadata';

export const revalidate = 900;

export const generateStaticParams = editionStaticParams();

export async function generateMetadata({ params }: PageProps<'/[edition]/lab-talks'>): Promise<Metadata> {
  return subEventListMetadata(await resolveEdition(params, 'lab-talks'), 'lab-talk');
}

export default async function Page({ params }: PageProps<'/[edition]/lab-talks'>) {
  return <SubEventList edition={await resolveEdition(params, 'lab-talks')} kind="lab-talk" />;
}
