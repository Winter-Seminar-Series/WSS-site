import Image from 'next/image';
import type { ReactNode } from 'react';

import { SpeakerProfile } from '@/components/events/SpeakerProfile';
import { HeroBand } from '@/components/layout/HeroBand';
import { blurProps } from '@/lib/images';
import type { Speaker } from '@/types/event.type';
import { RichText } from '@/ui/RichText';

interface Props {
  title: string;
  meta: ReactNode;
  poster: string | null;
  posterBlur?: string | null;
  descriptionHtml: string;
  speakers: Speaker[];
  /** Extra sections between the abstract and the presenters (workshop modules). */
  children?: ReactNode;
  /** Background of the band behind the navbar, see HeroBand. */
  image?: string;
}

export function EventDetail({ title, meta, poster, posterBlur, descriptionHtml, speakers, children, image }: Props) {
  return (
    <>
      <HeroBand image={image} />
      <article className="relative mx-auto -mt-48 max-w-300 px-4 pb-16 md:-mt-64 md:px-6">
        <div className="flex flex-col gap-10 rounded-2xl bg-surface px-6 py-10 shadow-card md:px-20 md:py-14">
          <header className="flex flex-col gap-3">
            <div className="text-base md:text-lg">{meta}</div>
            <h1 className="text-3xl leading-tight font-semibold text-ink md:text-5xl">{title}</h1>
          </header>

          {poster && (
            <Image
              src={poster}
              alt={title}
              width={1200}
              height={675}
              priority
              {...blurProps(posterBlur)}
              sizes="(min-width: 1200px) 1040px, 100vw"
              className="h-auto w-full rounded-2xl object-cover"
            />
          )}

          {descriptionHtml && (
            <section aria-labelledby="abstract" className="flex flex-col gap-3">
              <h2 id="abstract" className="text-3xl font-semibold text-ink">
                Abstract
              </h2>
              <RichText html={descriptionHtml} className="text-muted" />
            </section>
          )}

          {children}

          {speakers.length > 0 && (
            <section aria-labelledby="presenters" className="flex flex-col gap-8">
              <h2 id="presenters" className="text-3xl font-semibold text-ink">
                {speakers.length > 1 ? 'Presenters' : 'Presenter'}
              </h2>
              {speakers.map((speaker) => (
                <SpeakerProfile key={speaker.id} speaker={speaker} />
              ))}
            </section>
          )}
        </div>
      </article>
    </>
  );
}
