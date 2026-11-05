import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { editionHref, hasPage } from '@/lib/editions';
import type { Edition, EditionPage } from '@/lib/editions';
import { LinkButton } from '@/ui/Button';
import { SectionHeading } from '@/ui/SectionHeading';

interface Program {
  title: string;
  overline: string;
  /** Where "Explore" leads, when the edition has that page. */
  page: EditionPage;
  image: string;
  description: string;
  facts: string[];
}

const PROGRAMS: Program[] = [
  {
    title: 'Seminars',
    overline: 'A two-day journey of discovery and learning',
    page: 'seminars',
    image: '/images/programs/seminars.jpg',
    description:
      'The seminars comprise a two-day event where speakers present their research and ideas, sharing their findings and teaching related topics. Each day of the event features different speakers and topics, providing participants with a diverse range of perspectives and knowledge.',
    facts: ['Two days', 'Research talks and tutorials', 'New speakers each day'],
  },
  {
    title: 'Round Tables',
    overline: 'A deep dive into expert-led discussions',
    page: 'round-tables',
    image: '/images/programs/round-tables.jpg',
    description:
      "During the event, we host round table discussions on specific topics, inviting experts in the field to share their insights and engage with participants' concerns. Please note that the round tables are conducted in Persian.",
    facts: ['Expert panels', 'Questions from the audience', 'Held in Persian'],
  },
  {
    title: 'Poster Sessions',
    overline: 'Exploring education at the core',
    page: 'poster-session',
    image: '/images/programs/poster-session.jpg',
    description:
      'A series of poster sessions where participants present and discuss their ideas, research findings, or technical projects. These sessions are held in person, providing an interactive platform for knowledge sharing, receiving feedback, and fostering collaboration in various fields of computer science and engineering.',
    facts: ['Held in person', 'Feedback on your work', 'All fields of computer science'],
  },
];

interface Props {
  /** Programs link to the edition's own pages, where it has them. */
  edition: Edition;
  showMoreLink?: boolean;
}

export function Programs({ edition, showMoreLink = true }: Props) {
  return (
    <section aria-labelledby="programs" className="py-16 md:py-24">
      <div className="mx-auto max-w-300 px-4 md:px-6">
        <SectionHeading
          id="programs"
          title="Programs"
          lead="Explore the realm of computer science: talks, discussions and research, side by side."
          action={
            showMoreLink && (
              <LinkButton href={editionHref(edition, '/about')} variant="outline">
                More about WSS
                <ArrowRight className="size-4" aria-hidden />
              </LinkButton>
            )
          }
        />

        <div className="mt-12 flex flex-col gap-16 md:mt-16 md:gap-24">
          {PROGRAMS.map((program, index) => {
            const href = hasPage(edition, program.page) ? editionHref(edition, `/${program.page}`) : null;
            return (
              <article
                key={program.title}
                aria-labelledby={`program-${program.page}`}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20"
              >
                <div className={`reveal-image relative ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                  <Image
                    src={program.image}
                    alt={program.title}
                    width={1280}
                    height={853}
                    sizes="(min-width: 1200px) 560px, (min-width: 768px) 48vw, 100vw"
                    className="aspect-4/3 w-full rounded-3xl object-cover"
                  />
                </div>

                <div className="reveal">
                  <p className="text-[0.9375rem] font-semibold text-brand-strong">{program.overline}</p>
                  <h3
                    id={`program-${program.page}`}
                    className="mt-2 text-4xl font-extrabold tracking-[-0.035em] text-ink md:text-5xl"
                  >
                    {program.title}
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-ink/75">{program.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${program.title} at a glance`}>
                    {program.facts.map((fact) => (
                      <li
                        key={fact}
                        className="rounded-full bg-brand-soft px-3.5 py-1.5 text-sm font-semibold text-brand-strong"
                      >
                        {fact}
                      </li>
                    ))}
                  </ul>
                  {href && (
                    <Link
                      href={href}
                      className="group mt-8 inline-flex min-h-11 items-center gap-2 font-bold text-ink underline-offset-4 hover:underline"
                    >
                      Explore {program.title.toLowerCase()}
                      <ArrowRight
                        className="size-4 transition-transform duration-300 ease-snap group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
