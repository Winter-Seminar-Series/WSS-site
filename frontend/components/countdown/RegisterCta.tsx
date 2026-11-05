import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { EdgeLines } from '@/components/brand/EdgeLines';
import { Countdown } from '@/components/countdown/Countdown';
import { AccountLink } from '@/components/navigation/AccountLink';
import { CURRENT_EDITION, isCurrentEdition, isUpcoming } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { BACKDROP_QUALITY } from '@/lib/images';
import { LinkButton } from '@/ui/Button';

interface Props {
  edition: Edition;
}

/**
 * The closing call to action. Before the current edition starts: register, with the countdown. Between editions:
 * create an account for the next one. On an archived edition: go to the current one.
 */
export function RegisterCta({ edition }: Props) {
  const current = isCurrentEdition(edition);
  const upcoming = current && isUpcoming(edition);

  const copy = !current
    ? {
        title: `Join us at the ${CURRENT_EDITION.title}`,
        lead: `You are browsing the ${edition.label} archive.`,
        href: '/',
        label: `Visit the ${CURRENT_EDITION.label}`,
      }
    : upcoming
      ? {
          title: 'Save your seat',
          lead: `Register for the ${edition.label}, in person or online.`,
          href: '/dashboard/register',
          label: 'Register now',
        }
      : {
          title: 'See you next winter',
          lead: 'Create an account now and you are ready to register the day the next edition opens.',
          href: '/signup',
          label: 'Create an account',
        };

  return (
    // The footer always follows: its canvas colour shows between the points of the lower edge.
    <div className="bg-[linear-gradient(transparent_calc(100%_-_var(--edge-size)),var(--color-canvas)_0)]">
      <section
        aria-labelledby="register-cta"
        className="relative isolate overflow-hidden bg-ink-deep text-white edge-y [&_:focus-visible]:outline-white"
      >
        <Image
          src={current ? '/images/cta.webp' : edition.bandImage}
          alt=""
          fill
          sizes="100vw"
          quality={BACKDROP_QUALITY}
          className="-z-10 object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink-deep via-ink-deep/80 to-ink-deep/30" />
        <EdgeLines side="top" />

        <div className="reveal mx-auto flex max-w-300 flex-col gap-8 px-4 pt-24 pb-24 md:px-6 md:pt-36 md:pb-36 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 id="register-cta" className="text-4xl font-extrabold tracking-[-0.035em] md:text-6xl">
              {copy.title}
            </h2>
            <p className="mt-4 text-lg text-white/80">{copy.lead}</p>
            {copy.href === '/signup' ? (
              <AccountLink
                signedOut={{ href: copy.href, label: copy.label }}
                variant="light"
                size="lg"
                className="mt-8 w-full sm:w-auto"
              />
            ) : (
              <LinkButton href={copy.href} variant="light" size="lg" className="mt-8 w-full sm:w-auto">
                {copy.label}
                <ArrowRight className="size-5" aria-hidden />
              </LinkButton>
            )}
          </div>
          {upcoming && edition.startsAt && <Countdown targetIso={edition.startsAt} />}
        </div>
        <EdgeLines />
      </section>
    </div>
  );
}
