import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { Countdown } from '@/components/countdown/Countdown';
import { CURRENT_EDITION, isCurrentEdition } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { BACKDROP_QUALITY } from '@/lib/images';
import { LinkButton } from '@/ui/Button';

interface Props {
  edition: Edition;
}

/** The closing call to action: register for the current edition, or, on an archived one, go and see it. */
export function RegisterCta({ edition }: Props) {
  if (!isCurrentEdition(edition)) {
    return (
      <section aria-labelledby="register-cta" className="relative overflow-hidden bg-ink-deep py-16 text-white">
        <Image
          src={edition.bandImage}
          alt=""
          fill
          sizes="100vw"
          quality={BACKDROP_QUALITY}
          className="object-cover opacity-40"
        />
        <div className="relative mx-auto flex max-w-300 flex-col items-center justify-between gap-8 px-6 lg:flex-row">
          <div className="text-center lg:text-start">
            <p className="text-lg font-medium text-white/60 uppercase">You are browsing the {edition.label} archive</p>
            <h2 id="register-cta" className="text-3xl font-bold md:text-4xl">
              Join us at the {CURRENT_EDITION.title}
            </h2>
          </div>
          <LinkButton href="/" variant="light" size="lg">
            Visit the {CURRENT_EDITION.label}
            <ArrowRight className="size-5" aria-hidden />
          </LinkButton>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="register-cta" className="relative overflow-hidden bg-ink-deep py-16 text-white">
      <Image src="/images/cta.webp" alt="" fill sizes="100vw" quality={BACKDROP_QUALITY} className="object-cover" />
      <div className="relative mx-auto flex max-w-300 flex-col items-center justify-between gap-8 px-6 lg:flex-row">
        <div className="text-center lg:text-start">
          <p className="text-lg font-medium text-white/60 uppercase">Unlock the gateway to revelation</p>
          <h2 id="register-cta" className="text-3xl font-bold md:text-4xl">
            Sign Up and Secure Your Spot!
          </h2>
        </div>
        {edition.startsAt && <Countdown targetIso={edition.startsAt} />}
        <LinkButton href="/dashboard/register" variant="light" size="lg">
          Register Now
          <ArrowRight className="size-5" aria-hidden />
        </LinkButton>
      </div>
    </section>
  );
}
