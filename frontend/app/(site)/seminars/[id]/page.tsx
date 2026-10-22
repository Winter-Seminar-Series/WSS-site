import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SubEventPage } from '@/components/events/SubEventViews';
import { parseId, subEventMetadata, subEventStaticParams } from '@/lib/metadata';

export const revalidate = 900;

export function generateStaticParams(): Promise<{ id: string }[]> {
  return subEventStaticParams('seminar');
}

export async function generateMetadata({ params }: PageProps<'/seminars/[id]'>): Promise<Metadata> {
  return subEventMetadata('seminar', (await params).id);
}

export default async function Page({ params }: PageProps<'/seminars/[id]'>) {
  const id = parseId((await params).id);
  if (!id) notFound();
  return <SubEventPage kind="seminar" id={id} />;
}
