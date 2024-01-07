'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { formDataFromObject } from '../utils';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

async function callSignUpAPI(email: string, password: string) {
  const url = `${process.env.API_ORIGIN}/api/sign-up/`;

  const formData = formDataFromObject({ user: { email, password } });

  const response = await fetch(url, { method: 'POST', body: formData });

  if (!response.ok) throw new Error(response.statusText);
}

export default async function signUp(formData: FormData) {
  const { email, password, confirmPassword } = FormSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  if (password !== confirmPassword)
    throw new Error('Please repeat the password.');

  callSignUpAPI(email, password);

  redirect('/dashboard/profile');
}
