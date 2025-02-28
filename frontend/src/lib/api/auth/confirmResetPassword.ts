'use server';

import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';
import { fetchJson } from '../fetch';
import { getSession } from '../session';
import { cleanFormData, getAPIErrorMessage } from '../../error';

const FormSchema = z.object({
  email: z.string().email('Email is in invalid format.'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long.'),
  confirmPassword: z.string(),
});

const url = `${process.env.API_ORIGIN}/api/password-reset/`;

async function callConfirmResetPasswordAPI(
  email: string,
  password: string,
  token: string,
) {
  const body = { email, password, token };

  return await fetchJson(url, body, { method: 'PUT' });
}

export default async function confirmResetPassword(
  formData: FormData,
  token: string,
) {
  noStore();

  const { cleanedInput, errorMessage } = cleanFormData(FormSchema, formData);
  if (errorMessage) {
    return { error: errorMessage };
  }

  const { email, password, confirmPassword } = cleanedInput;

  if (errorMessage) {
    return { error: errorMessage };
  }

  if (password !== confirmPassword)
    return { error: 'Please repeat the password.' };

  try {
    await callConfirmResetPasswordAPI(email, password, token);
  } catch (error) {
    return { error: getAPIErrorMessage(error) };
  }

  redirect('/login');
}
