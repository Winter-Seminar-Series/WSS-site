import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    dangerouslyAllowSVG: false,
    // Only our own bucket: an open allow-list lets /_next/image fetch attacker-chosen URLs (SSRF).
    remotePatterns: [{ protocol: 'https', hostname: 's3.ir-thr-at1.arvanstorage.ir', pathname: '/wss/**' }],
  },

  async redirects() {
    return [{ source: '/dashboard/posterSession', destination: '/dashboard/poster-session', permanent: true }];
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
