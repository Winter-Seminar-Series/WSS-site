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
  title: 'Winter Sponsor Series',
  description: 'Winter Sponsor Series',
  other: {
    'theme-color': '#A45E9F',
  },
};

export const revalidate = 3600;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/*Open Graph Meta Tags */}
        <meta property="og:title" content="Winter Sponsor Series" />
        <meta
          property="og:description"
          content="The Winter Sponsor Series (WSS) has been established to bring together successful Iranians from around the world and build a professional community focused on computer science and engineering topics. Over the years, this seminar has grown to become one of the premier events at the Sharif University of Technology. WSS is open to anyone who works in or is interested in computer science topics and seeks to share and express their ideas and research."
        />
        <meta
          property="og:image"
          content="https://wss-sharif.com/preview.png"
        />
        <meta property="og:url" content="https://wss-sharif.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fa_IR" />

        {/*Twitter Meta Tags */}
        <meta name="twitter:site" content="WSS" />
        <meta
          name="twitter:card"
          content="https://wss-sharif.com/preview.png"
        />
        <meta name="twitter:title" content="Winter Sponsor Series" />
        <meta
          name="twitter:description"
          content="The Winter Sponsor Series (WSS) has been established to bring together successful Iranians from around the world and build a professional community focused on computer science and engineering topics. Over the years, this seminar has grown to become one of the premier events at the Sharif University of Technology. WSS is open to anyone who works in or is interested in computer science topics and seeks to share and express their ideas and research."
        />
        <meta
          name="twitter:image"
          content="https://wss-sharif.com/preview.png"
        />
        <meta name="twitter:url" content="https://wss-sharif.com/" />
      </head>
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
