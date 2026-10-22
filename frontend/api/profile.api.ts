import { httpGet, httpPatch, httpPut } from '@/services/http';
import type { ProfileResponse, ProfileUpdateRequest } from '@/types/participant.api.type';
import type { Profile } from '@/types/participant.type';

function toProfile(response: ProfileResponse): Profile {
  return {
    email: response.email,
    firstName: response.first_name,
    lastName: response.last_name,
    nationalCode: response.national_code,
    phoneNumber: response.phone_number,
    city: response.city,
    birthDate: response.birth_date ?? '',
    gender: response.gender,
    university: response.university,
    major: response.major,
    job: response.job,
    isOpenToWork: response.is_open_to_work,
    fieldsOfInterest: response.fields_of_interest,
    grade: response.grade,
    introductionMethod: response.introduction_method,
    linkedin: response.linkedin,
    github: response.github,
  };
}

export async function getProfile(): Promise<Profile> {
  return toProfile(await httpGet<ProfileResponse>('/profile/', { auth: true }));
}

export type ProfileUpdate = Omit<Profile, 'email'>;

export async function updateProfile(profile: ProfileUpdate): Promise<Profile> {
  const body: ProfileUpdateRequest = {
    first_name: profile.firstName,
    last_name: profile.lastName,
    national_code: profile.nationalCode,
    phone_number: profile.phoneNumber,
    city: profile.city,
    birth_date: profile.birthDate || null,
    gender: profile.gender,
    university: profile.university,
    major: profile.major,
    job: profile.job,
    is_open_to_work: profile.isOpenToWork,
    fields_of_interest: profile.fieldsOfInterest,
    grade: profile.grade,
    introduction_method: profile.introductionMethod,
    linkedin: profile.linkedin,
    github: profile.github,
  };
  return toProfile(await httpPut<ProfileResponse>('/profile/', body, { auth: true }));
}

export async function updateNationalCode(nationalCode: string): Promise<Profile> {
  return toProfile(await httpPatch<ProfileResponse>('/profile/', { national_code: nationalCode }, { auth: true }));
}

export function isProfileComplete(profile: Profile): boolean {
  return Boolean(profile.firstName && profile.lastName && profile.phoneNumber);
}
