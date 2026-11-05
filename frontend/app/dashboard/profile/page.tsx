import { LogOut } from 'lucide-react';
import type { Metadata } from 'next';

import { logoutAction } from '@/actions/auth.actions';
import { getProfile } from '@/api/profile.api';
import { PasswordForm } from '@/app/dashboard/profile/_components/PasswordForm';
import { ProfileForm } from '@/app/dashboard/profile/_components/ProfileForm';
import { withAuth } from '@/lib/auth-guard';
import { Button } from '@/ui/Button';

export const metadata: Metadata = { title: 'Profile' };

export default async function ProfilePage() {
  const profile = await withAuth(getProfile, '/dashboard/profile');

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <ProfileForm profile={profile} />
      <PasswordForm />
      {/* Phones also log out from the tab bar's More sheet, larger screens from the sidebar; people look here first. */}
      <form action={logoutAction} className="md:hidden">
        <Button type="submit" variant="outline" size="lg" className="w-full text-danger">
          <LogOut className="size-5" aria-hidden />
          Log out
        </Button>
      </form>
    </div>
  );
}
