'use server';

import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';
import { fetchJson } from '../fetch';
import { getSession } from '../session';
import { throwErrorIfParseUnsuccessful } from '../../error';

const FormSchema = z.object({
  email: z.string().email('Email is in invalid format.'),
});

const url = `${process.env.API_ORIGIN}/api/password-reset/`;

async function callResetPasswordAPI(email: string) {
  const body = { email };

  return await fetchJson(url, body, { method: 'POST' });
}

export default async function resetPassword(formData: FormData) {
  noStore();

  const input = FormSchema.safeParse(Object.fromEntries(formData.entries()));

  throwErrorIfParseUnsuccessful(input);

  const { email } = input.data;

  await callResetPasswordAPI(email);

  redirect('/login');
}
