import type { ZodError } from 'zod';

import { isHttpError } from '@/services/http';

export interface FormState {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string[]>;
  /** Submitted values, echoed back so a failed submit does not wipe the form (React resets it after an action). */
  values?: Record<string, string>;
}

export function formValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === 'string' && !key.startsWith('$ACTION') && !/password|token/i.test(key)) values[key] = value;
  });
  return values;
}

export function firstIssue(error: ZodError): string {
  return error.issues[0]?.message ?? 'Please check the form and try again.';
}

/** Keep all field errors; an object-level issue stays visible in the form summary. */
export function validationState(error: ZodError, formData?: FormData): FormState {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === 'string' && field !== 'token') (fieldErrors[field] ??= []).push(issue.message);
  }
  return {
    error:
      error.issues.find((issue) => issue.path.length === 0 || issue.path[0] === 'token')?.message ??
      'Please correct the highlighted fields.',
    fieldErrors,
    ...(formData ? { values: formValues(formData) } : {}),
  };
}

const API_FIELDS: Record<string, string> = {
  old_password: 'currentPassword',
  new_password: 'password',
  image: 'poster',
};

/** Django uses nested snake_case paths; the form controls use camelCase names. */
export function formError(error: unknown, formData?: FormData): FormState {
  const fieldErrors: Record<string, string[]> = {};
  const globalErrors: string[] = [];
  if (isHttpError(error, 400)) {
    for (const issue of error.errors) {
      if (!issue.attr || issue.attr.includes('non_field_errors') || issue.attr === 'token') {
        globalErrors.push(issue.detail);
        continue;
      }
      const attr = issue.attr.replace(/^user\./, '');
      const field = API_FIELDS[attr] ?? attr.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
      (fieldErrors[field] ??= []).push(issue.detail);
    }
  }
  return {
    error: globalErrors.join(' ') || errorMessage(error),
    ...(Object.keys(fieldErrors).length ? { fieldErrors } : {}),
    ...(formData ? { values: formValues(formData) } : {}),
  };
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
