import 'react';

declare module 'react' {
  interface CSSProperties {
    /** CSS custom properties, e.g. the per-edition theme tokens. */
    [key: `--${string}`]: string | number | undefined;
  }
}
