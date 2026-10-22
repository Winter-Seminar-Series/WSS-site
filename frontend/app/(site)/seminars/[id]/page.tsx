import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SubEventPage } from '@/components/events/SubEventViews';
import { noStaticParams, parseId, subEventMetadata } from '@/lib/metadata';

export const revalidate = 900;

export const generateStaticParams = noStaticParams;

export async function generateMetadata({ params }: PageProps<'/seminars/[id]'>): Promise<Metadata> {
  return subEventMetadata('seminar', (await params).id);
}

export default async function Page({ params }: PageProps<'/seminars/[id]'>) {
  const id = parseId((await params).id);
  if (!id) notFound();
  return <SubEventPage kind="seminar" id={id} />;
}
