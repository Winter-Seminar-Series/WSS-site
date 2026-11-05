import type { Metadata } from 'next';
import { Suspense } from 'react';
import type { ReactNode } from 'react';

import { DashboardSidebar, DashboardTabBar, DashboardTitle } from '@/app/dashboard/_components/DashboardTabs';
import { RegistrationBadge } from '@/app/dashboard/_components/RegistrationBadge';
import { Navbar } from '@/components/layout/Navbar';
import { RegistrationBadgeSkeleton } from '@/components/skeletons/DashboardSkeletons';
import { editionNav } from '@/lib/edition-nav';
import { PRIVATE_PAGE } from '@/lib/metadata';
import { DashboardProviders } from '@/providers/DashboardProviders';

export const metadata: Metadata = {
  title: { default: 'Dashboard', template: '%s | Dashboard | WSS' },
  ...PRIVATE_PAGE,
};

/*
 * An app shell: sidebar on tablets and up, a bottom tab bar on phones, the tab's content on a grey canvas. It renders
 * at once and streams the rest: the registration badge behind its own boundary, and each tab behind its loading.tsx.
 * Nothing here awaits the API, so switching tabs never waits on the badge.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProviders>
      <Navbar variant="solid" nav={editionNav()} />
      <div className="min-h-dvh bg-canvas pt-(--navbar-height)">
        <div className="mx-auto max-w-300 px-4 pt-6 pb-[calc(var(--tabbar-height)+2rem)] md:grid md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8 md:px-6 md:pt-10 md:pb-20 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden md:block">
            <DashboardSidebar />
          </aside>
          <main id="main" className="min-w-0">
            <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between md:mb-8">
              <DashboardTitle />
              <Suspense fallback={<RegistrationBadgeSkeleton />}>
                <RegistrationBadge />
              </Suspense>
            </header>
            {children}
          </main>
        </div>
        <DashboardTabBar />
      </div>
    </DashboardProviders>
  );
}
