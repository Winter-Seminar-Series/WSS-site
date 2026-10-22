import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { Countdown } from '@/components/countdown/Countdown';
import { CURRENT_EDITION } from '@/lib/site';
import { LinkButton } from '@/ui/Button';

export function RegisterCta() {
  return (
    <section aria-labelledby="register-cta" className="relative overflow-hidden bg-ink-deep py-16 text-white">
      <Image src="/images/cta.webp" alt="" fill sizes="100vw" className="object-cover" />
      <div className="relative mx-auto flex max-w-300 flex-col items-center justify-between gap-8 px-6 lg:flex-row">
        <div className="text-center lg:text-start">
          <p className="text-lg font-medium text-white/60 uppercase">Unlock the gateway to revelation</p>
          <h2 id="register-cta" className="text-3xl font-bold md:text-4xl">
            Sign Up and Secure Your Spot!
          </h2>
        </div>
        <Countdown targetIso={CURRENT_EDITION.startsAt} />
        <LinkButton href="/dashboard/register" variant="light" size="lg">
          Register Now
          <ArrowRight className="size-5" aria-hidden />
        </LinkButton>
      </div>
    </section>
  );
}
