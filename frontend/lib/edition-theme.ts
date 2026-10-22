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

/** The defaults of app/globals.css, for editions without a `theme`. */
const DEFAULT_THEME = { brand: '#a45e9f', inkDeep: '#342b4c' } as const;

/** The two colours that identify an edition outside the page (theme-color, social images). */
export function editionColors({ theme }: Edition): { brand: string; inkDeep: string } {
  return { brand: theme?.brand ?? DEFAULT_THEME.brand, inkDeep: theme?.inkDeep ?? DEFAULT_THEME.inkDeep };
}

/** The browser UI colour (`<meta name="theme-color">`) of an edition. */
export function editionThemeColor(edition: Edition): string {
  return editionColors(edition).brand;
}
