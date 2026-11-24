import type { Metadata } from 'next';

import { getCv } from '@/api/cv.api';
import { CvPanel } from '@/app/dashboard/cv/_components/CvPanel';
import { withAuth } from '@/lib/auth-guard';
import { REGISTRATION } from '@/lib/dashboard';
import { CURRENT_EDITION } from '@/lib/editions';

export const metadata: Metadata = { title: 'CV' };

export default async function CvDashboardPage() {
  // Only the current edition's CV: one sent to an earlier edition is never shown or reused here.
  const cv = await withAuth(() => getCv(CURRENT_EDITION.eventId), '/dashboard/cv');

  return <CvPanel cv={cv} editionLabel={CURRENT_EDITION.label} open={REGISTRATION.cvSubmissionOpen} />;
}
