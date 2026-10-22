import { Hero } from '@/app/(site)/_components/Hero';
import { SpeakersSection } from '@/app/(site)/_components/SpeakersSection';
import { StaffSection } from '@/app/(site)/_components/StaffSection';
import { RegisterCta } from '@/components/countdown/RegisterCta';
import { Programs } from '@/components/landing/Programs';
import { JsonLd } from '@/components/seo/JsonLd';
import { editionJsonLd } from '@/lib/structured-data';

export const revalidate = 900;

export default function HomePage() {
  return (
    <>
      <JsonLd data={editionJsonLd} />
      <Hero />
      <Programs />
      <SpeakersSection />
      <StaffSection />
      <RegisterCta />
    </>
  );
}
