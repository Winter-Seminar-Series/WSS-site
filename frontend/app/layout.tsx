import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';

import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME, SITE_URL } from '@/lib/site';
import { organizationJsonLd } from '@/lib/structured-data';

import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-manrope',
});

const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

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
    images: [{ url: '/og.png', width: 428, height: 428, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary',
    site: '@wss_sut',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#a45e9f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        {children}
        <JsonLd data={organizationJsonLd} />
        {GA_TRACKING_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_TRACKING_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
