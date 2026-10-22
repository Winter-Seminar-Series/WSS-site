'use client';

import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** False until mounted: the server cannot know the visitor's clock, so it renders zeros. */
  ready: boolean;
}

const ZERO: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0, ready: false };

function remaining(target: number): Countdown {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    ready: true,
  };
}

export function useCountdown(targetIso: string): Countdown {
  const [time, setTime] = useState<Countdown>(ZERO);

  // Subscribes to the wall clock — an external system, which is what effects are for.
  useEffect(() => {
    const target = Date.parse(targetIso);
    const tick = () => setTime(remaining(target));
    tick();
    if (target <= Date.now()) return;
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [targetIso]);

  return time;
}
