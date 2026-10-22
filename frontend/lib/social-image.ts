import type { Edition } from '@/lib/editions';

/** The size every social card is rendered at; what Open Graph and X recommend for large previews. */
export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/** The edition's social card, rendered once at build by app/og/[edition]/route.tsx. */
export function socialImagePath(edition: Pick<Edition, 'slug'>): string {
  return `/og/${edition.slug}`;
}
