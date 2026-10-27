import type { Metadata } from 'next';

import { getAttendanceModes, getWorkshops } from '@/api/events.api';
import { getAddonHoldings, getParticipations } from '@/api/participation.api';
import { getProfile, isProfileComplete } from '@/api/profile.api';
import { RegisterForm } from '@/app/dashboard/register/_components/RegisterForm';
import { withAuth } from '@/lib/auth-guard';
import { CURRENT_EDITION } from '@/lib/editions';

export const metadata: Metadata = { title: 'Registration' };

export default async function RegisterPage() {
  const [participations, heldAddons, workshops, modes, profile] = await withAuth(
    () =>
      Promise.all([
        getParticipations(),
        getAddonHoldings(),
        getWorkshops(CURRENT_EDITION.eventId),
        getAttendanceModes(CURRENT_EDITION.eventId),
        getProfile(),
      ]),
    '/dashboard/register',
  );

  return (
    <RegisterForm
      modes={modes}
      workshops={workshops}
      paidPlanIds={participations.map((participation) => participation.planId)}
      heldAddons={heldAddons}
      nationalCode={profile.nationalCode}
      isProfileComplete={isProfileComplete(profile)}
    />
  );
}
