import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { PendingHint } from '@/components/navigation/PendingHint';

interface Props {
  href: string;
  title: string;
  thumbnail: string | null;
  meta: ReactNode;
  footer: ReactNode;
  /** Above-the-fold cards load eagerly. */
  priority?: boolean;
}

export function EventCard({ href, title, thumbnail, meta, footer, priority }: Props) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line-soft bg-surface transition-shadow hover:shadow-card">
      <div className="relative aspect-3/2 overflow-hidden bg-brand-soft">
        {thumbnail ? (
          <Image
            src={thumbnail}
            // The thumbnail is the session's poster (title and speaker): worth describing, also for image search.
            alt={title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-brand-muted">
            <ImageOff className="size-10" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex grow flex-col gap-3 p-5">
        <div className="text-sm">{meta}</div>
        <h2 className="line-clamp-2 text-xl font-semibold text-ink">
          {/* The stretched link makes the whole card clickable while keeping one accessible link name. */}
          <Link href={href} className="after:absolute after:inset-0">
            {title}
            <PendingHint variant="bar" />
          </Link>
        </h2>
        <div className="mt-auto pt-2">{footer}</div>
      </div>
    </article>
  );
}

export function EventGrid({ children }: { children: ReactNode }) {
  return (
    <ul className="mx-auto grid max-w-300 grid-cols-1 gap-6 px-4 py-14 sm:grid-cols-2 md:px-6 lg:grid-cols-3">
      {children}
    </ul>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="mx-auto max-w-300 px-6 py-20 text-center text-xl font-semibold text-muted">{children}</p>;
}
