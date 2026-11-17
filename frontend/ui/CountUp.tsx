'use client';

import { useEffect, useRef } from 'react';

interface Props {
  /** A figure with optional text around it, such as `4500+`. Anything without digits is shown as is. */
  value: string;
}

const COUNT_MILLISECONDS = 1600;
const FIGURE = /^(\D*)(\d+)(\D*)$/;

/**
 * Counts up to `value` the first time it is mostly on screen. The server renders the final figure, so crawlers,
 * link previews and visitors without JavaScript get the real number, and users who prefer reduced motion keep it.
 * The text is written straight to the node: a count in React state would re-render sixty times a second.
 */
export function CountUp({ value }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    const parts = FIGURE.exec(value);
    if (!node || !parts || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const [, before = '', digits = '', after = ''] = parts;
    const target = Number(digits);
    const show = (current: number) => {
      node.textContent = `${before}${Math.round(current)}${after}`;
    };

    let frame = 0;
    let start: number | undefined;
    const step = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / COUNT_MILLISECONDS, 1);
      show(target * (1 - (1 - progress) ** 3));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    // Start from zero while the figure is still off screen, so scrolling it in never shows the final value first.
    show(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      show(target);
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
