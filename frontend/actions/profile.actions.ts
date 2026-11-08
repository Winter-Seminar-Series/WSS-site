'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { updateNationalCode, updateProfile } from '@/api/profile.api';
import { toLatinDigits } from '@/lib/digits';
import { formError, validationState } from '@/lib/form';
import type { FormState } from '@/lib/form';

const optionalText = z
  .string()
  .trim()
  .max(100, 'Use 100 characters or fewer.')
  .optional()
  .transform((value) => value ?? '');

const nationalCode = z
  .string()
  .trim()
  .transform(toLatinDigits)
  .pipe(z.string().regex(/^[0-9]{8,10}$/, 'Enter an 8–10 digit national code.'))
  .transform((value) => value.padStart(10, '0'))
  .refine((value) => {
    if (/^([0-9])\1{9}$/.test(value)) return false;
    const remainder = [...value.slice(0, 9)].reduce((sum, digit, index) => sum + Number(digit) * (10 - index), 0) % 11;
    return Number(value[9]) === (remainder < 2 ? remainder : 11 - remainder);
  }, 'National code is not valid.');

const profileSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.').max(100, 'Use 100 characters or fewer.'),
  lastName: z.string().trim().min(1, 'Last name is required.').max(100, 'Use 100 characters or fewer.'),
  phoneNumber: z
    .string()
    .trim()
    .transform(toLatinDigits)
    .pipe(
      z
        .string()
        .max(15, 'Use 15 characters or fewer.')
        .regex(/^(\+[0-9]{1,3}|0)[0-9]{10}$/, 'Phone number must look like 09123456789 or +989123456789.'),
    ),
  nationalCode: z
    .union([nationalCode, z.literal('')])
    .optional()
    .transform((value) => value ?? ''),
  city: optionalText,
  birthDate: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;
      if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) return false;
      const date = new Date(`${value}T00:00:00Z`);
      return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
    }, 'Enter a valid birth date.')
    .refine((value) => !value || value <= new Date().toISOString().slice(0, 10), 'Birth date cannot be in the future.')
    .transform((value) => value ?? ''),
  gender: z.enum(['M', 'F', 'O']).default('O'),
  university: optionalText,
  major: optionalText,
  job: optionalText,
  isOpenToWork: z
    .string()
    .optional()
    .transform((value) => value === 'on'),
  fieldsOfInterest: z
    .string()
    .trim()
    .optional()
    .transform((value) => value ?? ''),
  grade: z.enum(['B', 'M', 'P']).default('B'),
  introductionMethod: z
    .string()
    .trim()
    .optional()
    .transform((value) => value ?? ''),
  linkedin: optionalText,
  github: optionalText,
});

function revalidateDashboard(): void {
  revalidatePath('/dashboard', 'layout');
}

export async function updateProfileAction(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error, formData);

  try {
    await updateProfile(parsed.data);
  } catch (error) {
    return formError(error, formData);
  }
  revalidateDashboard();
  return { success: 'Profile updated.' };
}

export async function updateNationalCodeAction(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = z.object({ nationalCode }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error, formData);

  try {
    await updateNationalCode(parsed.data.nationalCode);
  } catch (error) {
    return formError(error, formData);
  }
  revalidateDashboard();
  return { success: 'National code saved.', values: { nationalCode: parsed.data.nationalCode } };
}
