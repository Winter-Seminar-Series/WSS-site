'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';
import { Gender, Grade, IntroductionMethod, Profile } from '../../types';
import { fetchJsonWithAuth } from '../fetch';
import { joinIssueMessages } from '../../error';

type ProfileResponse = Profile & { email: string };

export async function fetchEmailAndProfile() {
  noStore();

  const url = `${process.env.API_ORIGIN}/api/profile/`;

  const { email, ...profile } = await fetchJsonWithAuth<ProfileResponse>(url);

  return { email, profile };
}

const FormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  nationalCode: z.string().optional(),
  phoneNumber: z.string().trim().regex(/(\+\d{1,3}|0)\d{10}/, "Phone number must match +989123456789 or 09123456789 format"),
  city: z.string().optional(),
  birthDate: z.date().optional(),
  gender: z.nativeEnum(Gender).optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  job: z.string().optional(),
  isOpenToWork: z.boolean().optional(),
  fieldsOfInterest: z.string().optional(),
  grade: z.nativeEnum(Grade).optional(),
  introductionMethod: z.nativeEnum(IntroductionMethod).optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

type FormInput = z.infer<typeof FormSchema>;

async function callUpdateProfileAPI(input: FormInput) {
  const url = `${process.env.API_ORIGIN}/api/profile/`;

  const body = input;

  return await fetchJsonWithAuth<ProfileResponse>(url, body, { method: 'PATCH' });
}

export async function updateProfile(formData: FormData) {
  noStore();

  const input = FormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!input.success) {
    throw Error(joinIssueMessages(input.error))
  }

  await callUpdateProfileAPI(input);
}
