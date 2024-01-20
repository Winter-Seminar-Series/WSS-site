'use server';

import { fetchEmailAndProfile } from '../../../lib/api/dashboard/profile';
import RegisterForm from './RegisterForm';

export default async function Profile() {
  const { email, profile } = await fetchEmailAndProfile();

  return <RegisterForm profile={profile} email={email} />;
}
