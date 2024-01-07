'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import fetchJson from '../fetchJson';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

async function callSignUpAPI(email: string, password: string) {
  const url = `${process.env.API_ORIGIN}/api/sign-up/`;

  const body = { user: { email, password } };

  return await fetchJson(url, { method: 'POST', body: JSON.stringify(body) });
}

export default async function signUp(formData: FormData) {
  const { email, password, confirmPassword } = FormSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  if (password !== confirmPassword)
    throw new Error('Please repeat the password.');

  await callSignUpAPI(email, password);

  redirect('/login');
}
