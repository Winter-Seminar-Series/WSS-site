import type { Metadata } from 'next';
import { Suspense } from 'react';
import type { ReactNode } from 'react';

import { DashboardTabs } from '@/app/dashboard/_components/DashboardTabs';
import { RegistrationBadge } from '@/app/dashboard/_components/RegistrationBadge';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { PageHero } from '@/components/layout/PageHero';
import { RegistrationBadgeSkeleton } from '@/components/skeletons/DashboardSkeletons';
import { editionNav } from '@/lib/edition-nav';
import { PRIVATE_PAGE } from '@/lib/metadata';
import { DashboardProviders } from '@/providers/DashboardProviders';

export const metadata: Metadata = {
  title: { default: 'Dashboard', template: '%s | Dashboard | WSS' },
  ...PRIVATE_PAGE,
};

/*
 * Renders at once (navbar, hero, tabs) and streams the rest: the registration badge behind its own boundary, and
 * each tab behind its loading.tsx. Nothing here awaits the API, so switching tabs never waits on the badge.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProviders>
      <Navbar variant="overlay" nav={editionNav()} />
      <main id="main" className="pb-16">
        <PageHero
          overline="Welcome back"
          title="Dashboard"
          aside={
            <Suspense fallback={<RegistrationBadgeSkeleton />}>
              <RegistrationBadge />
            </Suspense>
          }
        >
          <div className="mt-8 flex flex-col gap-8">
            <DashboardTabs />
            {children}
          </div>
        </PageHero>
      </main>
      <Footer />
    </DashboardProviders>
  );
}
