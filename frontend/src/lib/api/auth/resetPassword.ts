'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import fetchJson from '../fetchJson';
import { getSession } from '../session';

const FormSchema = z.object({
  email: z.string().email(),
});

const url = `${process.env.API_ORIGIN}/api/password-reset/`;

async function callResetPasswordAPI(email: string) {
  const body = { email };

  return await fetchJson(url, { method: 'POST', body: JSON.stringify(body) });
}

export default async function resetPassword(formData: FormData) {
  const { email } = FormSchema.parse(Object.fromEntries(formData.entries()));

  await callResetPasswordAPI(email);

  redirect('/login');
}
