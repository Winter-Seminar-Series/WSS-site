'use client';

import { useCountdown } from '@/hooks/useCountdown';

interface Props {
  targetIso: string;
  size?: 'md' | 'lg';
}

const UNITS = ['days', 'hours', 'minutes', 'seconds'] as const;

/** Time left until `targetIso`, on a dark background. Renders nothing once the moment has passed. */
export function Countdown({ targetIso, size = 'md' }: Props) {
  const time = useCountdown(targetIso);
  const large = size === 'lg';
  if (time.ready && time.days + time.hours + time.minutes + time.seconds === 0) return null;

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={`${time.days} days, ${time.hours} hours and ${time.minutes} minutes to go`}
      className={`grid grid-cols-4 text-white ${large ? 'gap-2 sm:gap-3' : 'gap-2'}`}
    >
      {UNITS.map((unit) => (
        <div
          key={unit}
          className={`flex flex-col items-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-md ${
            large ? 'min-w-17 px-2 py-3 sm:min-w-22 sm:py-4' : 'min-w-15 px-2 py-2.5'
          }`}
        >
          <span
            className={`font-extrabold tracking-tight tabular-nums ${large ? 'text-3xl sm:text-5xl' : 'text-2xl'}`}
            suppressHydrationWarning
          >
            {String(time[unit]).padStart(2, '0')}
          </span>
          <span className="mt-1 text-xs font-medium text-white/70 capitalize">{unit}</span>
        </div>
      ))}
    </div>
  );
}
