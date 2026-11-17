import type { CSSProperties } from 'react';

import type { Edition } from '@/lib/editions';

function mix(color: string, percent: number, other: 'black' | 'white'): string {
  return `color-mix(in oklab, ${color} ${percent}%, ${other})`;
}

/**
 * Overrides the `@theme` colour tokens of app/globals.css for one edition. Tailwind utilities read the tokens as
 * CSS variables, so setting them on a wrapper re-themes everything inside it with no extra CSS shipped.
 */
export function editionThemeStyle({ theme }: Edition): CSSProperties {
  return {
    '--color-brand': theme?.brand ?? DEFAULT_THEME.brand,
    '--color-brand-strong': theme ? (theme.brandStrong ?? mix(theme.brand, 80, 'black')) : '#864a82',
    '--color-brand-soft': theme ? (theme.brandSoft ?? mix(theme.brand, 12, 'white')) : '#ebe8f2',
    '--color-brand-muted': theme ? (theme.brandMuted ?? mix(theme.brand, 50, 'white')) : '#c4a7c3',
    '--color-accent': theme?.accent ?? theme?.brand ?? '#9d6d9b',
    '--color-ink-deep': theme?.inkDeep ?? DEFAULT_THEME.inkDeep,
    // Archives reset neutral tokens too, rather than inheriting the current edition's palette from <body>.
    '--color-ink': theme?.ink ?? '#1f2b3d',
    '--color-muted': theme?.muted ?? '#696879',
    '--color-line': theme?.line ?? 'rgb(138 137 152 / 0.3)',
    '--color-line-soft': theme?.lineSoft ?? 'rgb(201 201 207 / 0.4)',
    '--color-canvas': theme?.canvas ?? '#f6f6f9',
    '--color-surface': theme?.surface ?? '#ffffff',
    '--color-surface-hover': theme?.surfaceHover ?? '#ececf1',
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
