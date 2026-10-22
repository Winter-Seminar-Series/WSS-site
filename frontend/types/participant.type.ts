import type { Gender, Grade } from '@/types/participant.api.type';

export interface Profile {
  email: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  city: string;
  birthDate: string;
  gender: Gender;
  university: string;
  major: string;
  job: string;
  isOpenToWork: boolean;
  fieldsOfInterest: string;
  grade: Grade;
  introductionMethod: string;
  linkedin: string;
  github: string;
}

export interface Participation {
  planId: number;
  licenseKey: string | null;
}

export interface Certificate {
  id: number;
  plan: string;
  /** ISO date. */
  date: string;
  fileId: string;
}

export interface StreamEvent {
  id: number;
  title: string;
  descriptionHtml: string;
  /** ISO timestamp. */
  startsAt: string;
  /** Started as of when the list was loaded. */
  live: boolean;
}

export interface VideoLicense {
  title: string;
  licenseKey: string;
}

/** Shared result type for Server Actions: expected failures are values, not throws. */
export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };
