import type { Metadata } from 'next';

import { getAttendanceModes, getWorkshops } from '@/api/events.api';
import { getParticipations } from '@/api/participation.api';
import { getProfile, isProfileComplete } from '@/api/profile.api';
import { RegisterForm } from '@/app/dashboard/register/_components/RegisterForm';
import { withAuth } from '@/lib/auth-guard';

export const metadata: Metadata = { title: 'Registration' };

export default async function RegisterPage() {
  const [participations, workshops, modes, profile] = await withAuth(
    () => Promise.all([getParticipations(), getWorkshops(), getAttendanceModes(), getProfile()]),
    '/dashboard/register',
  );

  return (
    <RegisterForm
      modes={modes}
      workshops={workshops}
      paidPlanIds={participations.map((participation) => participation.planId)}
      nationalCode={profile.nationalCode}
      isProfileComplete={isProfileComplete(profile)}
    />
  );
}
