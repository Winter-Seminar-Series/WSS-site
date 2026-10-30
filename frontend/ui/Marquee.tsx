import type { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Seconds per full loop; scale with the number of items so speed stays constant. */
  durationSeconds?: number;
  label: string;
}

/**
 * Pure-CSS infinite scroller: the track holds the items twice and slides by half its width. No JS, no layout reads,
 * pauses on hover/focus, and stops entirely for users who prefer reduced motion. The second copy is `inert`, so
 * links inside it never take keyboard focus.
 */
export function Marquee({ children, durationSeconds = 60, label }: Props) {
  const style = { '--marquee-duration': `${durationSeconds}s` } as CSSProperties;
  return (
    <div
      role="region"
      aria-label={label}
      className="group overflow-hidden mask-x-from-90% mask-x-to-100% motion-reduce:overflow-x-auto"
    >
      <div
        className="flex w-max animate-marquee group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]"
        style={style}
      >
        <ul className="flex shrink-0">{children}</ul>
        <ul className="flex shrink-0 motion-reduce:hidden" aria-hidden inert>
          {children}
        </ul>
      </div>
    </div>
  );
}
