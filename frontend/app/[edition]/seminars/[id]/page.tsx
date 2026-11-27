import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SubEventPage } from '@/components/events/SubEventViews';
import { resolveEdition } from '@/lib/edition-route';
import { noStaticParams, parseId, subEventMetadata } from '@/lib/metadata';

// Temporarily dynamic while the data cache is off (PUBLIC_DATA_CACHE in services/http.ts); was `revalidate = 900`.
export const dynamic = 'force-dynamic';

export const generateStaticParams = noStaticParams;

export async function generateMetadata({ params }: PageProps<'/[edition]/seminars/[id]'>): Promise<Metadata> {
  return subEventMetadata(await resolveEdition(params, 'seminars'), 'seminar', (await params).id);
}

export default async function Page({ params }: PageProps<'/[edition]/seminars/[id]'>) {
  const edition = await resolveEdition(params, 'seminars');
  const id = parseId((await params).id);
  if (!id) notFound();
  return <SubEventPage edition={edition} kind="seminar" id={id} />;
}
