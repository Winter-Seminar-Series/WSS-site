'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { formDataFromObject } from '../utils';
import fetchJson from '../fetchJson';
import { getSession } from '../session';

type LoginResponse = {
  access: string;
  refresh: string;
};

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

async function callLoginAPI(email: string, password: string) {
  const url = 'http://127.0.0.1:8000/api/sign-in/';

  const formData = formDataFromObject({ email, password });

  return await fetchJson<LoginResponse>(url, {
    method: 'POST',
    body: formData,
  });
}

async function callRefreshAPI(refresh: string) {
  const url = 'http://127.0.0.1:8000/api/sign-in/refresh/';

  const formData = formDataFromObject({ refresh });

  return await fetchJson<LoginResponse>(url, {
    method: 'POST',
    body: formData,
  });
}

async function saveLoginToSession(data: LoginResponse) {
  const session = await getSession();
  session.isLoggedIn = true;
  session.accessToken = data.access;
  session.refreshToken = data.refresh;
  await session.save();
}

export default async function login(formData: FormData) {
  const { email, password } = FormSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  const data = await callLoginAPI(email, password);

  await saveLoginToSession(data);

  redirect('/dashboard/profile');
}

export async function refresh() {
  const session = await getSession();

  if (!session.refreshToken) {
    throw new Error('Not already signed in.');
  }

  const data = await callRefreshAPI(session.refreshToken);

  await saveLoginToSession(data);
}
