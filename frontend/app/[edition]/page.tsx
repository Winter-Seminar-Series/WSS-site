import type { Metadata } from 'next';

import { Hero } from '@/app/[edition]/_components/Hero';
import { SpeakersSection } from '@/app/[edition]/_components/SpeakersSection';
import { StaffSection } from '@/app/[edition]/_components/StaffSection';
import { RegisterCta } from '@/components/countdown/RegisterCta';
import { Programs } from '@/components/landing/Programs';
import { JsonLd } from '@/components/seo/JsonLd';
import { editionStaticParams, resolveEdition } from '@/lib/edition-route';
import { editionHref, isCurrentEdition } from '@/lib/editions';
import { pageMetadata } from '@/lib/metadata';
import { SITE_DESCRIPTION } from '@/lib/site';
import { editionJsonLd } from '@/lib/structured-data';

export const revalidate = 900;

export const generateStaticParams = editionStaticParams();

export async function generateMetadata({ params }: PageProps<'/[edition]'>): Promise<Metadata> {
  const edition = await resolveEdition(params);
  // The current edition's home is the site's home: it keeps the root layout's title and description.
  if (isCurrentEdition(edition)) return { alternates: { canonical: '/' } };
  return {
    ...pageMetadata(edition.title, `${edition.title}, ${edition.dateRange}. ${SITE_DESCRIPTION}`, editionHref(edition)),
    title: { absolute: `${edition.title} (${edition.label}) — Sharif University of Technology` },
  };
}

export default async function HomePage({ params }: PageProps<'/[edition]'>) {
  const edition = await resolveEdition(params);

  return (
    <>
      <JsonLd data={editionJsonLd(edition)} />
      <Hero edition={edition} />
      <Programs aboutHref={editionHref(edition, '/about')} />
      <SpeakersSection edition={edition} />
      <StaffSection edition={edition} />
      <RegisterCta edition={edition} />
    </>
  );
}
