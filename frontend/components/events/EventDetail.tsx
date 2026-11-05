import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { SpeakerPhoto } from '@/components/events/SpeakerPhoto';
import { SpeakerProfile } from '@/components/events/SpeakerProfile';
import { PageHero } from '@/components/layout/PageHero';
import { blurProps } from '@/lib/images';
import type { Speaker } from '@/types/event.type';
import { RichText } from '@/ui/RichText';

interface Props {
  title: string;
  /** The listing this page belongs to, linked above the title. */
  back: { href: string; label: string };
  meta: ReactNode;
  poster: string | null;
  posterBlur?: string | null;
  /** Call to action in the side card, e.g. the session link. */
  action?: ReactNode;
  descriptionHtml: string;
  speakers: Speaker[];
  /** Extra sections between the abstract and the presenters (workshop modules). */
  children?: ReactNode;
  /** The edition's hero photo, behind the title. */
  image?: string;
}

export function EventDetail({
  title,
  back,
  meta,
  poster,
  posterBlur,
  action,
  descriptionHtml,
  speakers,
  children,
  image,
}: Props) {
  return (
    <>
      <PageHero
        image={image}
        title={title}
        context={
          <Link
            href={back.href}
            className="-ms-1 inline-flex min-h-11 items-center gap-1.5 rounded-full px-1 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {back.label}
          </Link>
        }
        lead={speakers.length > 0 && `With ${speakers.map((speaker) => speaker.name).join(', ')}`}
      />

      <div className="mx-auto grid max-w-300 gap-10 px-4 pt-6 pb-16 md:px-6 md:pb-24 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <aside className="lg:order-last">
          <div className="flex flex-col gap-5 rounded-3xl bg-canvas p-5 ring-1 ring-line-soft md:p-6 lg:sticky lg:top-[calc(var(--navbar-height)+1.5rem)]">
            <div className="text-[0.9375rem] [&>div]:flex-col [&>div]:items-start">{meta}</div>
            {speakers.length > 0 && (
              <ul className="flex flex-col gap-3 border-t border-line-soft pt-5">
                {speakers.map((speaker) => (
                  <li key={speaker.id} className="flex items-center gap-3">
                    <SpeakerPhoto speaker={speaker} size={44} className="rounded-full" ringClassName="ring-canvas" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-ink">{speaker.name}</span>
                      {speaker.organization && (
                        <span className="block truncate text-xs font-semibold text-brand-strong">
                          {speaker.organization}
                        </span>
                      )}
                      {speaker.role && <span className="block truncate text-xs text-muted">{speaker.role}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {action && <div className="flex flex-col [&>*]:w-full">{action}</div>}
          </div>
        </aside>

        <article className="flex min-w-0 flex-col gap-12">
          {poster && (
            <Image
              src={poster}
              alt={title}
              width={1200}
              height={675}
              preload
              {...blurProps(posterBlur)}
              sizes="(min-width: 1200px) 816px, 100vw"
              className="h-auto w-full rounded-3xl object-cover ring-1 ring-line-soft"
            />
          )}

          {descriptionHtml && (
            <section aria-labelledby="abstract" className="flex flex-col gap-4">
              <h2 id="abstract" className="text-3xl font-extrabold tracking-[-0.03em] text-ink">
                Abstract
              </h2>
              <RichText html={descriptionHtml} className="prose-lg text-ink/80" />
            </section>
          )}

          {children}

          {speakers.length > 0 && (
            <section aria-labelledby="presenters" className="flex flex-col gap-6">
              <h2 id="presenters" className="text-3xl font-extrabold tracking-[-0.03em] text-ink">
                {speakers.length > 1 ? 'About the presenters' : 'About the presenter'}
              </h2>
              {speakers.map((speaker) => (
                <SpeakerProfile key={speaker.id} speaker={speaker} />
              ))}
            </section>
          )}
        </article>
      </div>
    </>
  );
}
