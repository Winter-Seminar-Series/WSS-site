import type { Metadata } from 'next';

import { getStaffTeams } from '@/api/staff.api';
import { RegisterCta } from '@/components/countdown/RegisterCta';
import { Programs } from '@/components/landing/Programs';
import { PageHero } from '@/components/layout/PageHero';
import { TeamSection } from '@/components/people/TeamSection';
import { editionStaticParams, resolveEdition } from '@/lib/edition-route';
import { editionHref } from '@/lib/editions';
import { editionPageMetadata } from '@/lib/metadata';
import { FOUNDED_YEAR } from '@/lib/site';
import { SectionHeading } from '@/ui/SectionHeading';

export const revalidate = 900;

export const generateStaticParams = editionStaticParams('about');

export async function generateMetadata({ params }: PageProps<'/[edition]/about'>): Promise<Metadata> {
  return editionPageMetadata(
    await resolveEdition(params, 'about'),
    'About Us',
    'The story of the Winter Seminar Series, organised by the Student Scientific Chapter of Sharif University of Technology, and the team behind it.',
    '/about',
  );
}

// Fixed at build/revalidate time like everything else on the page.
const YEARS_RUNNING = new Date().getFullYear() - FOUNDED_YEAR;

export default async function AboutPage({ params }: PageProps<'/[edition]/about'>) {
  const edition = await resolveEdition(params, 'about');
  const teams = await getStaffTeams(edition.eventId);

  return (
    <>
      <PageHero overline="Discover Our Story" title="About Us">
        <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-muted">
          <p>
            The Winter Seminar Series (WSS) has been established to bridge the gap between leading experts and the
            global academic community, fostering a professional environment focused on the latest advancements in
            computer science and engineering. Over the past decade, this event has evolved into one of the premier
            events at Sharif University of Technology. WSS is an inclusive platform open to students, researchers, and
            professionals worldwide who are interested in sharing their research and exploring the future of technology.
          </p>
          <p>
            WSS was initiated {YEARS_RUNNING} years ago by the Students Scientific Chapter (SSC) within the Computer
            Engineering Department at Sharif University of Technology as a global effort to connect visionaries and
            researchers. Currently, WSS is held as a two-day event where distinguished speakers present their
            cutting-edge findings, while also conducting deep-dives into emerging technical topics and teaching
            fundamental concepts to a diverse audience.
          </p>
          <p>
            The event comprises high-level presentations and interactive roundtable discussions covering a broad
            spectrum of science and engineering fields. Beyond knowledge sharing, WSS is dedicated to empowering the
            next generation; we aim to guide participants in navigating their academic paths and choosing their
            specialized research fields. It provides a unique space for researchers to discover new horizons, exchange
            innovative ideas, and build lasting professional networks in the global computer science and engineering
            landscape.
          </p>
        </div>
      </PageHero>

      <div className="pt-12">
        <Programs aboutHref={editionHref(edition, '/about')} showMoreLink={false} />
      </div>

      {teams.length > 0 && (
        <section aria-labelledby="staff" className="scroll-mt-(--navbar-height)">
          <div className="px-6 pt-16 pb-14">
            <SectionHeading id="staff" overline="The heartbeat of the event" title="Staff Members" align="center" />
          </div>
          {teams.map((team) => (
            <TeamSection key={team.id} name={team.name} members={team.members} />
          ))}
        </section>
      )}

      <RegisterCta edition={edition} />
    </>
  );
}
