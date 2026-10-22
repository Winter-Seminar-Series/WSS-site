import type { CSSProperties } from 'react';

import type { Edition } from '@/lib/editions';

function mix(color: string, percent: number, other: 'black' | 'white'): string {
  return `color-mix(in oklab, ${color} ${percent}%, ${other})`;
}

/**
 * Overrides the `@theme` colour tokens of app/globals.css for one edition. Tailwind utilities read the tokens as
 * CSS variables, so setting them on a wrapper re-themes everything inside it with no extra CSS shipped.
 */
export function editionThemeStyle({ theme }: Edition): CSSProperties | undefined {
  if (!theme) return undefined;
  return {
    '--color-brand': theme.brand,
    '--color-brand-strong': theme.brandStrong ?? mix(theme.brand, 80, 'black'),
    '--color-brand-soft': theme.brandSoft ?? mix(theme.brand, 12, 'white'),
    '--color-brand-muted': theme.brandMuted ?? mix(theme.brand, 50, 'white'),
    '--color-accent': theme.accent ?? theme.brand,
    '--color-ink-deep': theme.inkDeep,
  };
}

/** The browser UI colour (`<meta name="theme-color">`) of an edition. */
export const DEFAULT_THEME_COLOR = '#a45e9f';

export function editionThemeColor({ theme }: Edition): string {
  return theme?.brand ?? DEFAULT_THEME_COLOR;
}
