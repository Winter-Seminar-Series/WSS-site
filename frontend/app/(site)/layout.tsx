import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar variant="overlay" />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
