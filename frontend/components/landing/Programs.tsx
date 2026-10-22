import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { LinkButton } from '@/ui/Button';
import { SectionHeading } from '@/ui/SectionHeading';

const PROGRAMS = [
  {
    title: 'Seminars',
    overline: 'A two-day journey of discovery and learning',
    image: '/images/programs/seminars.jpg',
    description:
      'The seminars comprise a two-day event where speakers present their research and ideas, sharing their findings and teaching related topics. Each day of the event features different speakers and topics, providing participants with a diverse range of perspectives and knowledge.',
  },
  {
    title: 'Round Tables',
    overline: 'A deep dive into expert-led discussions',
    image: '/images/programs/round-tables.jpg',
    description:
      "During the event, we host round table discussions on specific topics, inviting experts in the field to share their insights and engage with participants' concerns. Please note that the round tables are conducted in Persian.",
  },
  {
    title: 'Poster Sessions',
    overline: 'Exploring education at the core',
    image: '/images/programs/poster-session.jpg',
    description:
      'A series of poster sessions where participants present and discuss their ideas, research findings, or technical projects. These sessions are held in person, providing an interactive platform for knowledge sharing, receiving feedback, and fostering collaboration in various fields of computer science and engineering.',
  },
];

export function Programs({ showMoreLink = true }: { showMoreLink?: boolean }) {
  return (
    <section aria-labelledby="programs" className="relative overflow-hidden px-6 py-16">
      <div className="mx-auto max-w-250">
        <SectionHeading
          id="programs"
          overline="Explore the realm of Computer Science"
          title="Programs"
          align="center"
        />
        <div className="mt-16 flex flex-col gap-16 md:gap-20">
          {PROGRAMS.map((program, index) => (
            <article
              key={program.title}
              className={`flex flex-col items-center gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              <Image
                src={program.image}
                alt={program.title}
                width={1280}
                height={853}
                sizes="(min-width: 768px) 384px, 100vw"
                className="aspect-4/3 w-full max-w-sm shrink-0 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium tracking-wide text-muted uppercase">{program.overline}</p>
                <h3 className="mt-1 text-4xl font-bold text-ink md:text-5xl">{program.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted">{program.description}</p>
              </div>
            </article>
          ))}
        </div>
        {showMoreLink && (
          <div className="mt-20 flex justify-center">
            <LinkButton href="/about" size="lg">
              More About WSS
              <ArrowRight className="size-5" aria-hidden />
            </LinkButton>
          </div>
        )}
      </div>
    </section>
  );
}
