import type { Metadata } from 'next';

import { RegisterCta } from '@/components/countdown/RegisterCta';
import { PageHero } from '@/components/layout/PageHero';
import { TeamSection } from '@/components/people/TeamSection';
import { pageMetadata } from '@/lib/metadata';
import type { StaffMember } from '@/types/event.type';

export const metadata: Metadata = pageMetadata(
  'Scientific Advisors',
  'The scientific advisors guiding the Winter Seminar Series.',
  '/advisors',
);

const ADVISORS: StaffMember[] = [
  {
    id: 5,
    name: 'Ehsaneddin Asgari',
    designation: 'Research Scientist @ Qatar Computing Research Institute',
    image: '/images/advisors/asgari.webp',
  },
  { id: 4, name: 'Solmaz Salimi', designation: 'Postdoctoral Fellow @ Eurecom', image: '/images/advisors/salimi.jpg' },
  {
    id: 1,
    name: 'Hamid R. Rabiee',
    designation: 'Professor @ Sharif University of Technology',
    image: '/images/advisors/rabiee.jpg',
  },
  {
    id: 2,
    name: 'Mohammad Hossein Rohban',
    designation: 'Assistant Professor @ Sharif University of Technology',
    image: '/images/advisors/rohban.webp',
  },
];

export default function AdvisorsPage() {
  return (
    <>
      <PageHero overline="Our Guides" title="Scientific Advisors" />
      <div className="pt-16">
        <TeamSection name="Scientific Advisors" members={ADVISORS} preserveOrder />
      </div>
      <RegisterCta />
    </>
  );
}
