'use server';

import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';
import { fetchJson } from '../fetch';

const FormSchema = z.object({
  email: z.string().email('Email is in invalid format.'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long.'),
  confirmPassword: z.string(),
});

async function callSignUpAPI(email: string, password: string) {
  const url = `${process.env.API_ORIGIN}/api/sign-up/`;

  const body = { user: { email, password } };

  return await fetchJson(url, body, { method: 'POST' });
}

export default async function signUp(formData: FormData) {
  noStore();

  const { email, password, confirmPassword } = FormSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  if (password !== confirmPassword)
    throw new Error('Please repeat the password.');

  await callSignUpAPI(email, password);

  redirect('/login');
}
