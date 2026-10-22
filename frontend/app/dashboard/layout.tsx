import { CircleCheck } from 'lucide-react';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { getAttendanceModes } from '@/api/events.api';
import { getParticipations } from '@/api/participation.api';
import { DashboardTabs } from '@/app/dashboard/_components/DashboardTabs';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { PageHero } from '@/components/layout/PageHero';
import { withAuth } from '@/lib/auth-guard';
import { editionNav } from '@/lib/edition-nav';
import { CURRENT_EDITION } from '@/lib/editions';
import { PRIVATE_PAGE } from '@/lib/metadata';
import { DashboardProviders } from '@/providers/DashboardProviders';

export const metadata: Metadata = {
  title: { default: 'Dashboard', template: '%s | Dashboard | WSS' },
  ...PRIVATE_PAGE,
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const [participations, modes] = await withAuth(
    () => Promise.all([getParticipations(), getAttendanceModes(CURRENT_EDITION.eventId)]),
    '/dashboard/profile',
  );
  const paidPlanIds = new Set(participations.map((participation) => participation.planId));
  const registeredMode = modes.find((mode) => paidPlanIds.has(mode.id));

  return (
    <DashboardProviders>
      <Navbar variant="overlay" nav={editionNav()} />
      <main id="main" className="pb-16">
        <PageHero
          overline="Welcome back"
          title="Dashboard"
          aside={
            <p
              className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium md:px-6 md:py-4 md:text-base ${
                registeredMode ? 'bg-success-soft text-success' : 'bg-canvas text-ink'
              }`}
            >
              {registeredMode && <CircleCheck className="size-5" aria-hidden />}
              {registeredMode ? `Registered: ${registeredMode.name}` : 'Not registered yet'}
            </p>
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
