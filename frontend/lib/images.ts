/**
 * `next/image` quality for full-width photo backdrops (heroes and bands). The default 75 turns their dark, smooth
 * gradients into blotchy AVIF; 90 keeps them clean at a few dozen KB. Must be listed in `images.qualities`.
 */
export const BACKDROP_QUALITY = 100;

/** Spread onto `<Image>`: the blur placeholder (from `blurDataUrl` in `lib/blurhash.ts`) when there is one. */
export function blurProps(blurDataURL: string | null | undefined) {
  return blurDataURL ? ({ placeholder: 'blur', blurDataURL } as const) : {};
}

/**
 * Items of a listing whose image loads eagerly: the first row of the widest grid. They are not preloaded, because a
 * `<link rel="preload">` per card would queue ahead of the hero in the head, and on a phone only the first card is
 * on screen. The browser still requests them while parsing, right after the hero; the rest stay `lazy`.
 */
export const EAGER_LIST_ITEMS = 3;
