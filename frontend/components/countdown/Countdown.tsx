'use client';

import { useCountdown } from '@/hooks/useCountdown';

interface Props {
  targetIso: string;
  size?: 'md' | 'lg';
}

const UNITS = ['days', 'hours', 'minutes', 'seconds'] as const;

export function Countdown({ targetIso, size = 'md' }: Props) {
  const time = useCountdown(targetIso);
  const large = size === 'lg';

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={`${time.days} days, ${time.hours} hours and ${time.minutes} minutes to go`}
      className={`flex items-start text-white ${large ? 'gap-3 lg:gap-6' : 'gap-2'}`}
    >
      {UNITS.map((unit, index) => (
        <div key={unit} className={`flex items-start ${large ? 'gap-3 lg:gap-6' : 'gap-2'}`}>
          {index > 0 && (
            <span className={`font-bold ${large ? 'pt-2 text-2xl lg:text-5xl' : 'pt-1.5 text-2xl'}`} aria-hidden>
              :
            </span>
          )}
          <div className="flex flex-col items-center gap-2">
            <span
              className={`rounded-lg border border-white/30 text-center font-bold tabular-nums ${
                large ? 'min-w-14 px-3 py-2 text-xl lg:min-w-24 lg:text-5xl' : 'min-w-12 px-2 py-1.5 text-2xl'
              }`}
              suppressHydrationWarning
            >
              {String(time[unit]).padStart(2, '0')}
            </span>
            <span className={`uppercase ${large ? 'text-xs lg:text-base' : 'text-xs font-light'}`}>{unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
