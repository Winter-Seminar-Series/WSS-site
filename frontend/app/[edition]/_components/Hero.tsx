import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import Image from 'next/image';

import { EdgeLines } from '@/components/brand/EdgeLines';
import { Countdown } from '@/components/countdown/Countdown';
import { AccountLink } from '@/components/navigation/AccountLink';
import { CURRENT_EDITION, editionHref, hasPage, isCurrentEdition } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { BACKDROP_QUALITY } from '@/lib/images';
import { VENUE } from '@/lib/site';
import { LinkButton } from '@/ui/Button';

interface Props {
  edition: Edition;
  /** Doors not open yet: show the countdown and send visitors to registration. */
  upcoming: boolean;
}

/** "10th Winter Seminar Series" → ["10th", "Winter Seminar Series"]: two lines that rise one after the other. */
function titleLines(title: string): string[] {
  const [ordinal = '', ...rest] = title.split(' ');
  return rest.length > 0 ? [ordinal, rest.join(' ')] : [title];
}

export function Hero({ edition, upcoming }: Props) {
  const current = isCurrentEdition(edition);
  const lines = titleLines(edition.title);
  const explore = hasPage(edition, 'seminars') ? editionHref(edition, '/seminars') : editionHref(edition, '/about');

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[80svh] flex-col overflow-hidden bg-ink-deep edge-bottom [&_:focus-visible]:outline-white"
    >
      <div className="parallax absolute inset-0 -z-10">
        <Image
          src={edition.heroImage}
          alt=""
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          quality={BACKDROP_QUALITY}
          className="object-cover motion-safe:animate-settle"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-deep via-ink-deep/45 to-ink-deep/25" />

      {/* A size container: from sm the title is sized to its width (in `cqi`), so its long line always fits. */}
      <div className="@container mx-auto flex w-full max-w-300 grow flex-col justify-end px-4 pt-[calc(var(--navbar-height)+3rem)] pb-28 text-white md:px-6 md:pb-40">
        <ul className="flex flex-wrap gap-2 text-sm font-semibold motion-safe:animate-rise">
          <li className="flex min-h-9 items-center gap-2 rounded-full bg-white/12 px-3.5 ring-1 ring-white/20 backdrop-blur-md">
            <CalendarDays className="size-4 shrink-0" aria-hidden />
            <time dateTime={edition.startDate}>{edition.dateRange}</time>
          </li>
          <li className="flex min-h-9 items-center gap-2 rounded-full bg-white/12 px-3.5 ring-1 ring-white/20 backdrop-blur-md">
            <MapPin className="size-4 shrink-0" aria-hidden />
            {VENUE.name}, {VENUE.city}
          </li>
        </ul>

        {/* Phones let the title wrap at a headline size. From sm, 9.7cqi: "Winter Seminar Series" is 10em wide, so it fills the line. */}
        <h1
          id="hero-title"
          className="mt-6 text-[clamp(3rem,13vw,4.5rem)] leading-[0.92] font-extrabold tracking-[-0.045em] sm:text-[min(7.5rem,9.7cqi)] sm:whitespace-nowrap"
        >
          {lines.map((line, index) => (
            <span
              key={line}
              className="block motion-safe:animate-rise"
              style={{ animationDelay: `${120 + index * 110}ms` }}
            >
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-lg font-medium text-white/85 motion-safe:animate-rise motion-safe:[animation-delay:360ms] md:text-2xl">
              {edition.tagline}
            </p>

            <div className="mt-9 flex flex-col gap-3 motion-safe:animate-rise motion-safe:[animation-delay:460ms] sm:flex-row">
              {current && upcoming ? (
                <LinkButton href="/dashboard/register" variant="light" size="lg">
                  Register now
                  <ArrowRight className="size-5" aria-hidden />
                </LinkButton>
              ) : (
                <LinkButton href={explore} variant="light" size="lg">
                  Explore the talks
                  <ArrowRight className="size-5" aria-hidden />
                </LinkButton>
              )}
              {current ? (
                upcoming ? (
                  <LinkButton href={explore} variant="outline-light" size="lg">
                    Explore the talks
                  </LinkButton>
                ) : (
                  <AccountLink
                    signedOut={{ href: '/signup', label: 'Create an account' }}
                    variant="outline-light"
                    size="lg"
                  />
                )
              ) : (
                <LinkButton href="/" variant="outline-light" size="lg">
                  Visit the {CURRENT_EDITION.label}
                </LinkButton>
              )}
            </div>
          </div>

          {upcoming && edition.startsAt && (
            <div className="motion-safe:animate-rise motion-safe:[animation-delay:560ms]">
              <p className="mb-3 text-sm font-semibold text-white/75">Doors open in</p>
              <Countdown targetIso={edition.startsAt} size="lg" />
            </div>
          )}
        </div>
      </div>

      <EdgeLines />
    </section>
  );
}
