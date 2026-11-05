import Image from 'next/image';

import { isCurrentEdition } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { fitWithin } from '@/lib/images';
import { SPEAKER_INSTITUTIONS } from '@/lib/site';
import { Marquee } from '@/ui/Marquee';

// Columns per number of stats, so every row is full (the grid's gaps are its dividers; an empty cell would show).
/** Institution logos fit this box (px). */
const INSTITUTION_BOX = { width: 64, height: 52 };

const COLUMNS: Record<number, string> = {
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
};

/** The edition in numbers, then where its speakers come from. Sits right under the hero. */
export function Highlights({ edition }: { edition: Edition }) {
  const title = isCurrentEdition(edition) ? 'The series so far' : `The ${edition.label} in numbers`;
  const columns = COLUMNS[edition.stats.length] ?? 'grid-cols-1 sm:grid-cols-2';

  return (
    <section aria-labelledby="highlights" className="pt-6 pb-4 md:pb-8">
      <div className="mx-auto max-w-300 px-4 md:px-6">
        <h2 id="highlights" className="sr-only">
          {title}
        </h2>
        <dl className={`reveal grid gap-px overflow-hidden rounded-3xl bg-line-soft ring-1 ring-line-soft ${columns}`}>
          {edition.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1 bg-surface p-5 md:p-6">
              <dt className="text-sm font-medium text-muted">{stat.label}</dt>
              <dd className="text-3xl font-extrabold tracking-[-0.04em] text-ink tabular-nums md:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-14 text-center text-[0.9375rem] font-semibold text-muted">Speakers have joined us from</p>
      </div>
      <div className="mt-6">
        <Marquee label="Institutions our speakers come from" durationSeconds={SPEAKER_INSTITUTIONS.length * 3.75}>
          {SPEAKER_INSTITUTIONS.map((institution) => {
            const size = fitWithin(institution, INSTITUTION_BOX);
            return (
              <li key={institution.name} className="flex shrink-0 items-center px-6 md:px-9">
                <a
                  href={institution.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={institution.name}
                  className="block rounded-md"
                >
                  <Image
                    src={institution.src}
                    alt={institution.name}
                    {...size}
                    style={size}
                    className="object-contain opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                </a>
              </li>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}
