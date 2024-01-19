'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Gender, Grade, IntroductionMethod, Profile } from '../../types';
import { fetchJsonWithAuth } from '../fetch';
import { joinIssueMessages, cleanInput } from '../../error';

type ProfileResponse = Profile & { email: string };

export async function fetchEmailAndProfile() {
  noStore();

  const url = `${process.env.API_ORIGIN}/api/profile/`;

  const { email, ...profile } = await fetchJsonWithAuth<ProfileResponse>(url);

  return { email, profile };
}

const FormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.'),
  lastName: z.string().trim().min(1, 'Last name is required.'),
  nationalCode: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
  phoneNumber: z
    .string()
    .trim()
    .regex(
      /^(\+\d{1,3}|0)\d{10}$/,
      'Phone number must match +989123456789 or 09123456789 format.',
    ),
  city: z.string().optional(),
  birthDate: z.coerce
    .date()
    .transform((date) => date.toISOString().split('T')[0])
    .optional(),
  gender: z.nativeEnum(Gender).optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  job: z.string().optional(),
  isOpenToWork: z.coerce.boolean().optional(),
  fieldsOfInterest: z.string().optional(),
  grade: z.nativeEnum(Grade).optional(),
  introductionMethod: z.nativeEnum(IntroductionMethod).optional(),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
});

type FormInput = z.infer<typeof FormSchema>;

async function callUpdateProfileAPI(input: FormInput) {
  const url = `${process.env.API_ORIGIN}/api/profile/`;

  const body = input;

  return await fetchJsonWithAuth<ProfileResponse>(url, body, {
    method: 'PATCH',
  });
}

export async function updateProfile(formData: FormData) {
  noStore();

  const { cleanedInput, errorMessage } = cleanInput(FormSchema, formData);
  if (errorMessage) {
    return { error: errorMessage };
  }

  await callUpdateProfileAPI(cleanedInput);

  revalidatePath('/dashboard/profile');
}
