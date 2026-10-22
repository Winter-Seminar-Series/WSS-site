import type { Metadata } from 'next';

import { SubEventList } from '@/components/events/SubEventViews';
import { editionStaticParams, resolveEdition } from '@/lib/edition-route';
import { subEventListMetadata } from '@/lib/metadata';

export const revalidate = 900;

export const generateStaticParams = editionStaticParams('seminars');

export async function generateMetadata({ params }: PageProps<'/[edition]/seminars'>): Promise<Metadata> {
  return subEventListMetadata(await resolveEdition(params, 'seminars'), 'seminar');
}

export default async function Page({ params }: PageProps<'/[edition]/seminars'>) {
  return <SubEventList edition={await resolveEdition(params, 'seminars')} kind="seminar" />;
}
