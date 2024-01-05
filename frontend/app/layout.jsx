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
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
