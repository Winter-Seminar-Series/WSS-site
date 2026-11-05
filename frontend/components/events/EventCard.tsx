import { CalendarX2, ImageOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { PendingHint } from '@/components/navigation/PendingHint';
import { blurProps } from '@/lib/images';

interface Props {
  href: string;
  title: string;
  thumbnail: string | null;
  thumbnailBlur?: string | null;
  meta: ReactNode;
  footer: ReactNode;
  /** The first row of a list loads eagerly; every other card is lazy (see `EAGER_LIST_ITEMS`). */
  eager?: boolean;
}

export function EventCard({ href, title, thumbnail, thumbnailBlur, meta, footer, eager }: Props) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-line-soft transition-[transform,box-shadow] duration-300 ease-snap hover:-translate-y-1 hover:shadow-lift has-focus-visible:-translate-y-1 has-focus-visible:shadow-lift">
      <div className="relative aspect-3/2 overflow-hidden bg-brand-soft">
        {thumbnail ? (
          <Image
            src={thumbnail}
            // The thumbnail is the session's poster (title and speaker): worth describing, also for image search.
            alt={title}
            fill
            loading={eager ? 'eager' : 'lazy'}
            {...blurProps(thumbnailBlur)}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-snap group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-brand-muted">
            <ImageOff className="size-10" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex grow flex-col gap-3 p-5 md:p-6">
        <div className="text-sm">{meta}</div>
        <h2 className="line-clamp-3 text-xl leading-snug font-bold tracking-tight text-ink">
          {/* The stretched link makes the whole card clickable while keeping one accessible link name. */}
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {title}
            <PendingHint variant="bar" />
          </Link>
        </h2>
        <div className="mt-auto border-t border-line-soft pt-4">{footer}</div>
      </div>
    </article>
  );
}

export function EventGrid({ children }: { children: ReactNode }) {
  return (
    <ul className="mx-auto grid max-w-300 grid-cols-1 gap-5 px-4 py-12 sm:grid-cols-2 md:gap-6 md:px-6 md:py-16 lg:grid-cols-3">
      {children}
    </ul>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-20 text-center md:py-28">
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand">
        <CalendarX2 className="size-7" aria-hidden />
      </span>
      <p className="mt-6 text-xl font-bold text-ink">{children}</p>
    </div>
  );
}
