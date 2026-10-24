import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import type { ReactNode } from 'react';

import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { JsonLd } from '@/components/seo/JsonLd';
import { editionThemeColor } from '@/lib/edition-theme';
import { CURRENT_EDITION } from '@/lib/editions';
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME, SITE_URL, TWITTER_HANDLE } from '@/lib/site';
import { SOCIAL_IMAGE_SIZE, socialImagePath } from '@/lib/social-image';
import { organizationJsonLd, websiteJsonLd } from '@/lib/structured-data';

import './globals.css';

// Latin only: one preloaded font file on the critical path. The site is English; the rare latin-ext glyph in a
// speaker's name falls back to the system font for that character.
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const SOCIAL_IMAGE = { url: socialImagePath(CURRENT_EDITION), ...SOCIAL_IMAGE_SIZE, alt: CURRENT_EDITION.title };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} (${SITE_SHORT_NAME}) — Sharif University of Technology`,
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Winter Seminar Series',
    'WSS',
    'Sharif University of Technology',
    'computer science',
    'computer engineering',
    'seminar',
    'artificial intelligence',
    'conference Iran',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: '/',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  formatDetection: { telephone: false },
  verification: { google: 'g_eIz7L9m4UwuKt54QHvgIOweN0bGxix0WDFMoP92H4' },
};

export const viewport: Viewport = {
  themeColor: editionThemeColor(CURRENT_EDITION),
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        {/* The bar sits in <body>, outside the edition wrapper, so it uses the default brand token. */}
        <NextTopLoader color="var(--color-brand)" height={3} showSpinner={false} shadow={false} />
        {children}
        <JsonLd data={[websiteJsonLd, organizationJsonLd]} />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
