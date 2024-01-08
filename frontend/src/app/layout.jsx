import Script from 'next/script';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  display: 'swap',
  subsets: ['latin-ext'],
});

/**
 * @type {import('next').Metadata}
 */
export const metadata = {
  title: 'WSS',
  description: 'Winter Seminar Series',
  other: {
    'theme-color': '#342b4c',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.GA_TRACKING_ID}');
        `}
      </Script>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
