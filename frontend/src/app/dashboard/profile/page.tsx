'use server';

import { fetchEmailAndProfile } from '../../../lib/api/dashboard/profile';
import ProfileForm from './ProfileForm';

export default async function Profile() {
  const { email, profile } = await fetchEmailAndProfile();

  return <ProfileForm profile={profile} email={email} />;
}
