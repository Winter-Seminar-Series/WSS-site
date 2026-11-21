import { Award, CalendarDays, Clock3, Download, MapPin, Medal, Send, Trophy, Upload, UsersRound } from 'lucide-react';
import Image from 'next/image';

import { LinkButton, buttonClasses } from '@/ui/Button';
import { SectionHeading } from '@/ui/SectionHeading';

const SUBMISSION_HREF = '/dashboard/poster-session';
const VENUE_HREF = 'https://maps.app.goo.gl/A24SRLUYxWioobQw6';
const SESSION_HOURS = '14:00–15:30';

const AWARDS = [
  { name: 'First place', amount: 40, Icon: Trophy },
  { name: 'Second place', amount: 30, Icon: Medal },
  { name: 'Third place', amount: 15, Icon: Medal },
  { name: 'Audience Choice', amount: 15, Icon: UsersRound },
];

function PosterTemplateLink({ hero = false }: { hero?: boolean }) {
  return (
    <a
      href="https://s3.ir-thr-at1.arvanstorage.ir/wss/poster-zip/11th-WSS-Poster-Template.zip"
      className={`${hero ? buttonClasses('outline-light', 'lg') : buttonClasses('outline')} max-w-full`}
    >
      <Download aria-hidden className="size-4 shrink-0" />
      <span className="py-2 whitespace-normal">LaTeX poster template</span>
    </a>
  );
}

export function PosterSessionDetails() {
  return (
    <>
      <header className="bg-ink-deep text-white edge-bottom [&_:focus-visible]:outline-white">
        <div className="mx-auto grid max-w-300 items-center gap-9 px-4 pt-[calc(var(--navbar-height)+2.5rem)] pb-[calc(var(--edge-size)+2.5rem)] md:px-6 lg:grid-cols-2 lg:gap-12 lg:pt-[calc(var(--navbar-height)+4rem)]">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-brand-muted uppercase">11th Winter Seminar Series</p>
            <h1 className="mt-3 text-5xl leading-none font-extrabold tracking-[-0.045em] sm:text-6xl xl:text-7xl">
              Poster Session
            </h1>
            <p className="mt-5 text-xl font-bold text-brand-soft">Bring your research beyond the paper.</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/80">
              Share your work with students, researchers, and experts in computer science, data science, and
              engineering. Get feedback, discover what other groups are working on, and compete for{' '}
              <strong className="text-white">100 million Tomans in total prizes</strong>.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href={SUBMISSION_HREF} variant="light" size="lg">
                <Upload aria-hidden className="size-4" />
                Submit your poster
              </LinkButton>
              <PosterTemplateLink hero />
            </div>
          </div>
          <figure>
            <Image
              src="/images/programs/11th-poster-session-1.webp"
              alt="A presenter explains his research poster to a group of visitors"
              width={1280}
              height={853}
              preload
              sizes="(min-width: 1200px) 552px, (min-width: 1024px) 46vw, 94vw"
              className="w-full rounded-2xl border border-white/15"
            />
            <figcaption className="mt-2 text-sm text-white/75">Poster Session at the 10th WSS</figcaption>
          </figure>
        </div>
      </header>

      <div className="mx-auto max-w-300 px-4 md:px-6">
        <dl className="grid gap-5 border-b border-line py-7 sm:grid-cols-2 lg:grid-cols-3">
          <div className="grid grid-cols-[auto_1fr] gap-x-3">
            <CalendarDays aria-hidden className="row-span-2 size-5 text-brand-strong" />
            <dt className="text-sm font-bold text-muted">Date</dt>
            <dd className="mt-1 font-bold">
              <time dateTime="2026-12-17">Thursday, December 17, 2026</time>
              <span className="block text-sm font-medium text-muted">26 Azar 1405</span>
            </dd>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-3">
            <Clock3 aria-hidden className="row-span-2 size-5 text-brand-strong" />
            <dt className="text-sm font-bold text-muted">Time</dt>
            <dd className="mt-1 font-bold">
              {SESSION_HOURS}
              <span className="block text-sm font-medium text-muted">Iran Standard Time (UTC+3:30)</span>
            </dd>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-3">
            <MapPin aria-hidden className="row-span-2 size-5 text-brand-strong" />
            <dt className="text-sm font-bold text-muted">Venue</dt>
            <dd>
              <a
                href={VENUE_HREF}
                className="inline-flex min-h-11 flex-col justify-center font-bold text-brand-strong underline underline-offset-4"
              >
                Sharif University of Technology
                <span className="text-sm font-medium text-muted">Tehran, Iran</span>
              </a>
            </dd>
          </div>
        </dl>

        <section
          aria-labelledby="session-format"
          className="grid items-start gap-5 border-b border-line py-12 md:grid-cols-[2fr_3fr] md:gap-12 md:py-16"
        >
          <SectionHeading id="session-format" title="More than a poster display" />
          <div className="space-y-4 text-lg leading-relaxed text-muted [&_strong]:text-ink">
            <p>
              During this <strong>90-minute in-person session</strong>, selected posters will be displayed at the venue.
              Presenters will stand beside their work to talk with visitors and judges. It’s a chance to explain the
              ideas behind your research, get feedback from specialists, and introduce your work or research group to a
              wider audience.
            </p>
            <p>
              The session is open to <strong>undergraduate, master’s, and PhD students and researchers</strong> in
              computer science, data science, engineering, and related areas. Having a paper accepted at a recognized
              conference or journal is an advantage in the evaluation, but it is optional.
            </p>
          </div>
        </section>

        <section aria-labelledby="how-to-take-part" className="py-12 md:py-16">
          <SectionHeading id="how-to-take-part" title="How to take part" />
          <ol className="mt-7 grid gap-4 md:grid-cols-3">
            <li className="rounded-2xl border border-line bg-canvas p-5 md:p-6">
              <p className="text-sm font-bold text-brand-strong">
                By <time dateTime="2026-12-04">Friday, December 4, 2026</time> · 13 Azar 1405
              </p>
              <h3 className="mt-2 text-xl font-extrabold">1. Submit your poster</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Prepare your poster as a <strong className="text-ink">PDF</strong> and upload it for initial screening
                through the WSS registration dashboard.
              </p>
              <div className="mt-4">
                <PosterTemplateLink />
              </div>
            </li>
            <li className="rounded-2xl border border-line bg-canvas p-5 md:p-6">
              <p className="text-sm font-bold text-brand-strong">
                Results on <time dateTime="2026-12-08">Tuesday, December 8, 2026</time> · 17 Azar 1405
              </p>
              <h3 className="mt-2 text-xl font-extrabold">2. Initial review</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Specialists will review submissions in their respective fields for quality and relevance. Only selected
                posters advance to the on-site session.
              </p>
            </li>
            <li className="rounded-2xl border border-line bg-canvas p-5 md:p-6">
              <p className="text-sm font-bold text-brand-strong">
                <time dateTime="2026-12-17">Thursday, December 17, 2026</time> · 26 Azar 1405
              </p>
              <h3 className="mt-2 text-xl font-extrabold">3. Present your work</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Join us in person for the <strong className="text-ink">{SESSION_HOURS}</strong> session. Stand beside
                your poster to explain your work, answer questions, and discuss it with reviewers and attendees.
              </p>
            </li>
          </ol>

          <figure className="mt-8">
            <Image
              src="/images/programs/11th-poster-session-2.webp"
              alt="A poster presenter points to part of his poster while attendees listen"
              width={1280}
              height={853}
              sizes="(min-width: 1200px) 1152px, 94vw"
              className="w-full rounded-2xl object-cover md:aspect-[5/2] md:object-[center_40%]"
            />
            <figcaption className="mt-2 text-sm text-muted">Poster Session at the 10th WSS</figcaption>
          </figure>
        </section>
      </div>

      <section
        aria-labelledby="poster-awards"
        className="bg-ink-deep bg-radial-[at_50%_0%] from-brand/35 to-ink-deep to-70% text-white edge-y"
      >
        <div className="mx-auto max-w-300 px-4 py-[calc(var(--edge-size)+2rem)] md:px-6">
          <h2 id="poster-awards" className="text-center">
            <span className="block text-sm font-bold tracking-[0.16em] text-brand-muted uppercase">Awards</span>
            <span className="mt-2 block text-5xl leading-none font-extrabold tracking-[-0.045em] text-brand-soft sm:text-7xl">
              100 million
            </span>
            <span className="mt-2 block text-lg font-semibold text-white/85">Tomans in total prizes</span>
          </h2>

          <ul role="list" className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {AWARDS.map(({ name, amount, Icon }) => (
              <li
                key={name}
                className="group rounded-2xl border border-white/15 bg-white/8 p-3 first:border-brand-soft first:bg-brand-soft first:text-ink-deep last:border-brand-muted/45 last:bg-brand-muted/10 max-[359px]:px-2 sm:p-5"
              >
                <Icon aria-hidden className="size-6 text-brand-muted group-first:text-brand-strong" />
                <h3 className="mt-3 text-sm font-bold sm:text-base">{name}</h3>
                <p className="mt-2 leading-none">
                  <strong className="block text-4xl font-extrabold tracking-tight sm:text-5xl">{amount}</strong>
                  <span className="mt-1 block text-sm font-semibold">million Tomans</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-start gap-3 border-t border-white/20 pt-5 text-white/80">
            <Award aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-muted" />
            <p className="max-w-3xl leading-relaxed">
              The final rankings will be announced and prizes presented at the closing ceremony on the first day of WSS.
              <strong className="text-white"> All presenters will receive certificates.</strong>
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-300 px-4 pb-12 md:px-6 md:pb-16">
        <div className="grid gap-10 py-12 md:grid-cols-2 md:gap-12 md:py-16">
          <section aria-labelledby="poster-criteria">
            <SectionHeading id="poster-criteria" title="What will the judges look for?" />
            <p className="mt-4 leading-relaxed text-muted">
              After initial screening, reviewers with expertise in the relevant fields will evaluate selected posters in
              person.
            </p>
            <dl className="mt-5 space-y-3 border-l-2 border-brand-muted pl-4 text-muted">
              <div>
                <dt className="inline font-bold text-ink">Presentation quality. </dt>
                <dd className="inline">How clearly and effectively you explain your research.</dd>
              </div>
              <div>
                <dt className="inline font-bold text-ink">Poster quality. </dt>
                <dd className="inline">The design, readability, and informativeness of the poster.</dd>
              </div>
              <div>
                <dt className="inline font-bold text-ink">Publication quality. </dt>
                <dd className="inline">
                  Acceptance at a recognized conference or journal is an advantage, but it is optional.
                </dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="poster-preparation">
            <SectionHeading id="poster-preparation" title="Preparing your poster" />
            <p className="mt-4 leading-relaxed text-muted">
              Keep the design clear and readable so visitors can understand your work quickly and start a conversation.
            </p>
            <dl className="mt-4 divide-y divide-line rounded-2xl bg-canvas px-4">
              <div className="grid grid-cols-[5rem_1fr] gap-3 py-3">
                <dt className="font-bold">Size</dt>
                <dd className="text-muted">A1 (594 × 841 mm)</dd>
              </div>
              <div className="grid grid-cols-[5rem_1fr] gap-3 py-3">
                <dt className="font-bold">Text</dt>
                <dd className="text-muted">Use legible fonts and body text of at least 28 pt.</dd>
              </div>
              <div className="grid grid-cols-[5rem_1fr] gap-3 py-3">
                <dt className="font-bold">Language</dt>
                <dd className="text-muted">Persian or English. For Persian, consider Nazanin or Lotus.</dd>
              </div>
            </dl>
            <p className="mt-5 leading-relaxed text-muted">
              Prepare a <strong className="text-ink">5–10 minute overview</strong> highlighting what makes your research
              distinctive. Expect questions from specialists and other visitors, and be ready to give a shorter
              explanation.
            </p>
            <div className="mt-4 flex flex-col items-start gap-1">
              <PosterTemplateLink />
              <a
                href="https://blogs.lse.ac.uk/impactofsocialsciences/2018/05/11/how-to-design-an-award-winning-conference-poster/"
                className="inline-flex min-h-11 items-center font-bold text-brand-strong underline underline-offset-4"
              >
                Designing an Award-Winning Poster
              </a>
            </div>
          </section>
        </div>

        <section
          aria-labelledby="poster-contact"
          className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8"
        >
          <div>
            <h2 id="poster-contact" className="text-2xl font-extrabold tracking-tight">
              Contact
            </h2>
            <p className="mt-2 text-muted">
              Ask the WSS team about submissions, poster preparation, or on-site arrangements.
            </p>
          </div>
          <a href="https://t.me/wss_info" className={buttonClasses('outline')}>
            <Send aria-hidden className="size-4" />
            @wss_info on Telegram
          </a>
        </section>
      </div>
    </>
  );
}
