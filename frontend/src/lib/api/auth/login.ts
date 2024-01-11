'use server';

import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';
import { FetchError, fetchJson } from '../fetch';
import { getSession } from '../session';
import { parseJWT } from '../../auth';

type LoginResponse = {
  access: string;
  refresh: string;
};

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

async function callLoginAPI(email: string, password: string) {
  const url = `${process.env.API_ORIGIN}/api/sign-in/`;

  const body = { email, password };

  return await fetchJson<LoginResponse>(url, body, {
    method: 'POST',
  });
}

async function callRefreshAPI(refresh: string) {
  const url = `${process.env.API_ORIGIN}/api/sign-in/refresh/`;

  const body = { refresh };

  return await fetchJson<LoginResponse>(url, body, {
    method: 'POST',
  });
}

async function saveLoginToSession(data: LoginResponse) {
  const parsedRefreshToken = parseJWT(data.refresh);
  const expiresAtUnixSecond = parsedRefreshToken.exp;
  const expiresAtUnixMilliSecond = expiresAtUnixSecond * 1000;

  const session = await getSession();
  session.isLoggedIn = true;
  session.accessToken = data.access;
  session.refreshToken = data.refresh;
  session.expiresAt = expiresAtUnixMilliSecond;
  await session.save();
}

export default async function login(formData: FormData) {
  noStore();

  const { email, password } = FormSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  const data = await callLoginAPI(email, password);

  await saveLoginToSession(data);

  redirect('/dashboard/profile');
}

export async function refresh() {
  noStore();

  const session = await getSession();

  if (!session.refreshToken) {
    throw new Error('Not already signed in.');
  }

  try {
    const data = await callRefreshAPI(session.refreshToken);
    await saveLoginToSession(data);
  } catch (error) {
    if (error instanceof FetchError && error.data.status === 401) {
      redirect('/login');
    } else {
      throw error;
    }
  }
}
