import type { Metadata } from 'next';

import { getPosterUrl } from '@/api/poster-session.api';
import { getProfile, isProfileComplete } from '@/api/profile.api';
import { PosterUploadForm } from '@/app/dashboard/poster-session/_components/PosterUploadForm';
import { withAuth } from '@/lib/auth-guard';
import { REGISTRATION } from '@/lib/dashboard';
import { Alert } from '@/ui/Alert';

export const metadata: Metadata = { title: 'Poster Session' };

export default async function PosterSessionDashboardPage() {
  const [profile, posterUrl] = await withAuth(
    () => Promise.all([getProfile(), getPosterUrl()]),
    '/dashboard/poster-session',
  );

  return (
    <div className="flex flex-col gap-6">
      {!isProfileComplete(profile) && <Alert tone="warning">Please complete your profile information first.</Alert>}
      <PosterUploadForm currentPosterUrl={posterUrl} open={REGISTRATION.posterSubmissionOpen} />
    </div>
  );
}
