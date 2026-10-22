'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { updateNationalCode, updateProfile } from '@/api/profile.api';
import { toLatinDigits } from '@/lib/digits';
import { errorMessage, firstIssue, formValues } from '@/lib/form';
import type { FormState } from '@/lib/form';

const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((value) => value ?? '');

const nationalCode = z
  .string()
  .trim()
  .transform(toLatinDigits)
  .pipe(z.string().regex(/^\d{10}$/, 'National code must be 10 digits.'));

const profileSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.'),
  lastName: z.string().trim().min(1, 'Last name is required.'),
  phoneNumber: z
    .string()
    .trim()
    .transform(toLatinDigits)
    .pipe(z.string().regex(/^(\+\d{1,3}|0)\d{10}$/, 'Phone number must look like 09123456789 or +989123456789.')),
  nationalCode: z
    .union([nationalCode, z.literal('')])
    .optional()
    .transform((value) => value ?? ''),
  city: optionalText,
  birthDate: z
    .string()
    .optional()
    .refine((value) => !value || !Number.isNaN(Date.parse(value)), 'Birth date is invalid.')
    .transform((value) => value ?? ''),
  gender: z.enum(['M', 'F', 'O']).default('O'),
  university: optionalText,
  major: optionalText,
  job: optionalText,
  isOpenToWork: z
    .string()
    .optional()
    .transform((value) => value === 'on'),
  fieldsOfInterest: optionalText,
  grade: z.enum(['B', 'M', 'P']).default('B'),
  introductionMethod: optionalText,
  linkedin: optionalText,
  github: optionalText,
});

function revalidateDashboard(): void {
  revalidatePath('/dashboard', 'layout');
}

export async function updateProfileAction(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error), values: formValues(formData) };

  try {
    await updateProfile(parsed.data);
  } catch (error) {
    return { error: errorMessage(error), values: formValues(formData) };
  }
  revalidateDashboard();
  return { success: 'Profile updated.' };
}

export async function updateNationalCodeAction(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = z.object({ nationalCode }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error), values: formValues(formData) };

  try {
    await updateNationalCode(parsed.data.nationalCode);
  } catch (error) {
    return { error: errorMessage(error), values: formValues(formData) };
  }
  revalidateDashboard();
  return { success: 'National code saved.', values: { nationalCode: parsed.data.nationalCode } };
}
