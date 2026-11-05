interface Props {
  /** The patterned edge (`edge-bottom`, `edge-top`, `edge-start`) these lines sit in. */
  side?: 'bottom' | 'top' | 'start';
  /** Colour of the hairlines. */
  className?: string;
}

const PLACEMENT = {
  bottom: 'edge-lines-bottom inset-x-0 bottom-0',
  top: 'edge-lines-top inset-x-0 top-0',
  start: 'edge-lines-start inset-y-0 left-0',
} as const;

/**
 * The woven W and V's inner hairlines, drawn inside a band's patterned edge so its points read as the logo's weave. Place
 * it in the band that carries the matching `edge-*` utility: that mask trims the lines to the band's silhouette.
 */
export function EdgeLines({ side = 'bottom', className = 'text-white/30' }: Props) {
  return <div aria-hidden className={`edge-lines pointer-events-none absolute z-1 ${PLACEMENT[side]} ${className}`} />;
}
