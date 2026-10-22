'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { changePassword, confirmPasswordReset, requestPasswordReset, signIn, signUp } from '@/api/auth.api';
import { errorMessage, firstIssue, formValues, safeRedirectPath } from '@/lib/form';
import type { FormState } from '@/lib/form';
import { isHttpError } from '@/services/http';
import { clearSession, saveTokens } from '@/services/session';

const email = z.string().trim().toLowerCase().email('Please enter a valid email address.');
// Mirrors the API's Django password validators; it also rejects common and all-numeric passwords.
const password = z.string().min(8, 'Password must be at least 8 characters long.');

// Not `password`: accounts created before the 8-character minimum must still be able to sign in.
const loginSchema = z.object({ email, password: z.string().min(1, 'Enter your password.') });

const newPasswordSchema = z
  .object({ email, password, confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, { message: 'Passwords do not match.' });

export async function loginAction(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error), values: formValues(formData) };

  try {
    await saveTokens(await signIn(parsed.data.email, parsed.data.password));
  } catch (error) {
    // A 401 here means wrong credentials, not an expired session (errorMessage's reading of 401).
    const message = isHttpError(error, 401) ? 'Incorrect email or password.' : errorMessage(error);
    return { error: message, values: formValues(formData) };
  }
  redirect(safeRedirectPath(formData.get('next'), '/dashboard/profile'));
}

export async function signUpAction(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = newPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error), values: formValues(formData) };

  try {
    await signUp(parsed.data.email, parsed.data.password);
    await saveTokens(await signIn(parsed.data.email, parsed.data.password));
  } catch (error) {
    return { error: errorMessage(error), values: formValues(formData) };
  }
  redirect('/dashboard/profile');
}

export async function requestPasswordResetAction(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = z.object({ email }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error), values: formValues(formData) };

  try {
    await requestPasswordReset(parsed.data.email);
  } catch (error) {
    return { error: errorMessage(error), values: formValues(formData) };
  }
  return { success: 'Check your inbox — we sent you a link to reset your password.' };
}

export async function confirmPasswordResetAction(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = newPasswordSchema.and(z.object({ token: z.string().min(1) })).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error), values: formValues(formData) };

  try {
    await confirmPasswordReset(parsed.data.email, parsed.data.password, parsed.data.token);
  } catch (error) {
    return { error: errorMessage(error), values: formValues(formData) };
  }
  redirect('/login?reset=1');
}

export async function changePasswordAction(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = z
    .object({
      currentPassword: z.string().min(1, 'Enter your current password.'),
      password,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, { message: 'New passwords do not match.' })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };

  try {
    await changePassword(parsed.data.currentPassword, parsed.data.password);
  } catch (error) {
    return { error: errorMessage(error) };
  }
  return { success: 'Password changed.' };
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect('/');
}
