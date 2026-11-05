/**
 * `next/image` quality for full-width photo backdrops (heroes and bands). The default 75 turns their dark, smooth
 * gradients into blotchy AVIF; 90 keeps them clean at a few dozen KB. Must be listed in `images.qualities`.
 */
export const BACKDROP_QUALITY = 90;

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

/**
 * The size an image of `width`×`height` takes when fitted inside `box`. Pass it as both the props and the inline style:
 * the props keep the srcset to 1x/2x of that size, and the style pins the box, so rounding never skews the image.
 */
export function fitWithin(
  { width, height }: { width: number; height: number },
  box: { width: number; height: number },
): { width: number; height: number } {
  const scale = Math.min(box.width / width, box.height / height);
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}
