'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { Profile } from '../../types';
import { fetchJsonWithAuth } from '../fetch';

type ProfileResponse = Profile & { email: string };

export async function fetchEmailAndProfile() {
  noStore();

  const url = `${process.env.API_ORIGIN}/api/profile/`;

  const { email, ...profile }: { email: string } & Profile =
    await fetchJsonWithAuth<ProfileResponse>(url);

  return { email, profile };
}
