import type { NextConfig } from 'next';

import { CURRENT_EDITION, editionPages } from './lib/editions';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    // 75 is the default; 90 is for full-width photo backdrops only (lib/images.ts).
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    dangerouslyAllowSVG: false,
    // Only our own bucket: an open allow-list lets /_next/image fetch attacker-chosen URLs (SSRF).
    remotePatterns: [{ protocol: 'https', hostname: 's3.ir-thr-at1.arvanstorage.ir', pathname: '/wss/**' }],
  },

  async redirects() {
    return [
      { source: '/dashboard/posterSession', destination: '/dashboard/poster-session', permanent: true },
      // The current edition has one URL: the unprefixed one. Temporary, because the prefixed URL becomes the
      // canonical one the day the next edition launches.
      { source: `/${CURRENT_EDITION.slug}/:path*`, destination: '/:path*', permanent: false },
    ];
  },

  /*
   * Editions (lib/editions.ts): the routes are `app/[edition]/…`. The current edition's pages are served at the
   * root by rewriting them onto its slug; archived editions are reached by their prefix directly. Only the current
   * edition's own pages are rewritten, so `/login`, `/dashboard`, files and metadata routes are untouched.
   */
  async rewrites() {
    const slug = CURRENT_EDITION.slug;
    return {
      beforeFiles: [
        { source: '/', destination: `/${slug}` },
        ...editionPages(CURRENT_EDITION).map((page) => ({
          source: `/${page}/:path*`,
          destination: `/${slug}/${page}/:path*`,
        })),
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ];
  },

  // The social cards read the edition heroes and fonts from disk (app/og/[edition]/route.tsx).
  outputFileTracingIncludes: { '/og/[edition]': ['./assets/fonts/**/*', './public/images/**/*hero.jpg'] },

  // Caps ISR stale-while-revalidate. Must stay above the largest `revalidate` in the app (currently 900).
  expireTime: 3600,

  experimental: {
    optimizePackageImports: ['lucide-react', '@tanstack/react-query', 'motion'],
    serverActions: {
      // nginx proxies to the container by its compose service name.
      allowedOrigins: ['wss-sharif.com', 'frontend:3000'],
    },
  },

  compiler: {
    removeConsole: isDev ? false : { exclude: ['error', 'warn'] },
  },
};

export default nextConfig;
