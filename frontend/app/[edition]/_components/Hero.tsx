import { CalendarDays, MapPin } from 'lucide-react';
import Image from 'next/image';

import { Countdown } from '@/components/countdown/Countdown';
import type { Edition } from '@/lib/editions';
import { BACKDROP_QUALITY } from '@/lib/images';
import { SPEAKER_INSTITUTIONS, VENUE } from '@/lib/site';

export function Hero({ edition }: { edition: Edition }) {
  return (
    <section aria-labelledby="hero-title">
      <div className="relative bg-ink-deep pt-(--navbar-height) pb-56 text-white">
        <Image
          src={edition.heroImage}
          alt=""
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          quality={BACKDROP_QUALITY}
          className="object-cover"
        />
        <div className="relative mx-auto flex max-w-300 flex-col gap-12 px-6 pt-8 lg:flex-row lg:items-start lg:justify-between lg:pt-16">
          <div className="max-w-2xl">
            <h1
              id="hero-title"
              className="text-5xl leading-tight font-bold tracking-tight md:text-7xl lg:text-[96px]/[1]"
            >
              {edition.title}
            </h1>
            <p className="mt-6 text-xl font-semibold md:text-2xl">{edition.tagline}</p>
            <ul className="mt-5 flex flex-col gap-3 text-white/80 sm:flex-row sm:gap-8 lg:flex-col lg:gap-2 lg:text-xl">
              <li className="flex items-center gap-2">
                <MapPin className="size-6 shrink-0" aria-hidden />
                {VENUE.name} - {VENUE.city}, {VENUE.country}
              </li>
              <li className="flex items-center gap-2">
                <CalendarDays className="size-6 shrink-0" aria-hidden />
                <time dateTime={edition.startDate}>{edition.dateRange}</time>
              </li>
            </ul>
            {edition.startsAt && (
              <div className="mt-10">
                <Countdown targetIso={edition.startsAt} size="lg" />
              </div>
            )}
          </div>

          <dl className="grid shrink-0 grid-cols-2 gap-x-12 gap-y-6 lg:text-end">
            {edition.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-sm text-white/80 lg:text-base">{stat.label}.</dt>
                <dd className="text-4xl font-bold tracking-tight lg:text-6xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="relative mx-4 -mt-36 mb-24 rounded-2xl bg-surface px-6 py-10 text-center shadow-card md:mx-auto md:w-4/5 md:max-w-300 md:px-12">
        <h2 className="text-lg font-medium tracking-wide text-ink uppercase md:text-xl">
          Presentations from 15+ top level companies and universities
        </h2>
        <ul className="mt-8 grid grid-cols-4 items-center gap-6 md:grid-cols-8 md:gap-x-12">
          {SPEAKER_INSTITUTIONS.map((institution) => (
            <li key={institution.name} className="flex justify-center">
              <a href={institution.href} target="_blank" rel="noopener noreferrer" aria-label={institution.name}>
                <Image
                  src={institution.src}
                  alt={institution.name}
                  // Rendered within 64×56; size the request to that box so 1x/2x stay small.
                  width={Math.round(Math.min(64, (56 * institution.width) / institution.height))}
                  height={Math.round(Math.min(56, (64 * institution.height) / institution.width))}
                  className="h-auto max-h-14 w-full max-w-16 object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
