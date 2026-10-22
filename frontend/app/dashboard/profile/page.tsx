import type { Metadata } from 'next';

import { getProfile } from '@/api/profile.api';
import { PasswordForm } from '@/app/dashboard/profile/_components/PasswordForm';
import { ProfileForm } from '@/app/dashboard/profile/_components/ProfileForm';
import { withAuth } from '@/lib/auth-guard';

export const metadata: Metadata = { title: 'Profile' };

export default async function ProfilePage() {
  const profile = await withAuth(getProfile, '/dashboard/profile');

  return (
    <div className="flex flex-col gap-12">
      <ProfileForm profile={profile} />
      <hr className="border-line" />
      <PasswordForm />
    </div>
  );
}
