import type { ZodError } from 'zod';

import { isHttpError } from '@/services/http';

export interface FormState {
  error?: string;
  success?: string;
  /** Submitted values, echoed back so a failed submit does not wipe the form (React resets it after an action). */
  values?: Record<string, string>;
}

export function formValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === 'string' && !key.startsWith('$ACTION') && !/password/i.test(key)) values[key] = value;
  });
  return values;
}

export function firstIssue(error: ZodError): string {
  return error.issues[0]?.message ?? 'Please check the form and try again.';
}

export function errorMessage(error: unknown): string {
  if (isHttpError(error)) {
    if (error.status === 401) return 'Your session has expired. Please log in again.';
    if (error.status >= 500) return 'The server is having trouble right now. Please try again in a moment.';
    return error.message;
  }
  return 'Something went wrong. Please check your connection and try again.';
}

/** Only same-origin paths: `?next=https://evil.example` must not turn login into an open redirect. */
export function safeRedirectPath(value: FormDataEntryValue | null, fallback: string): string {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : fallback;
}
