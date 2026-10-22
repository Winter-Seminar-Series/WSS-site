import Image from 'next/image';
import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar variant="solid" />
      <main id="main" className="flex min-h-dvh pt-(--navbar-height)">
        <div className="w-full px-6 py-16 md:w-1/2 md:px-10 lg:px-20">
          <div className="mx-auto max-w-lg">{children}</div>
        </div>
        <div className="relative hidden md:block md:w-1/2" aria-hidden>
          <Image src="/images/auth.webp" alt="" fill priority sizes="50vw" className="object-cover" />
        </div>
      </main>
      <Footer />
    </>
  );
}
