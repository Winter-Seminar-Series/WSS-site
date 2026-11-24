'use server';

import { revalidatePath } from 'next/cache';

import { deleteCv, uploadCv } from '@/api/cv.api';
import { uploadPoster } from '@/api/poster-session.api';
import { getStreamLink } from '@/api/stream.api';
import { MAX_CV_BYTES } from '@/lib/dashboard';
import { CURRENT_EDITION } from '@/lib/editions';
import { errorMessage, formError } from '@/lib/form';
import type { FormState } from '@/lib/form';
import type { ActionResult } from '@/types/participant.type';

const MAX_POSTER_BYTES = 10 * 1024 * 1024;

export async function streamLinkAction(eventId: number): Promise<ActionResult<string>> {
  if (!Number.isInteger(eventId) || eventId <= 0) return { ok: false, error: 'Unknown stream.' };
  try {
    return { ok: true, data: await getStreamLink(eventId) };
  } catch (error) {
    return { ok: false, error: errorMessage(error) };
  }
}

export async function uploadPosterAction(_state: FormState, formData: FormData): Promise<FormState> {
  const file = formData.get('poster');
  const invalidPoster = (message: string): FormState => ({ error: message, fieldErrors: { poster: [message] } });
  if (!(file instanceof File) || file.size === 0) return invalidPoster('Choose a PDF to upload.');
  if (file.type !== 'application/pdf') return invalidPoster('Posters must be PDF files.');
  if (file.size > MAX_POSTER_BYTES) return invalidPoster('Posters must be 10MB or smaller.');

  if (new TextDecoder().decode(await file.slice(0, 4).arrayBuffer()) !== '%PDF')
    return invalidPoster('Choose a valid PDF file.');

  try {
    await uploadPoster(CURRENT_EDITION.eventId, file, formData.get('replace') === 'true');
  } catch (error) {
    return formError(error);
  }
  revalidatePath('/dashboard/poster-session');
  return { success: 'Poster uploaded.' };
}

/**
 * The CV tab's one action, so its forms share one result and only the latest message shows. `intent=delete` withdraws
 * the CV; anything else uploads or replaces it. The edition is always the current one: a CV belongs to the edition it
 * was sent to and is never reused.
 */
export async function cvAction(_state: FormState, formData: FormData): Promise<FormState> {
  return formData.get('intent') === 'delete' ? removeCv() : saveCv(formData);
}

async function saveCv(formData: FormData): Promise<FormState> {
  const file = formData.get('file');
  const invalid = (message: string): FormState => ({ error: message, fieldErrors: { file: [message] } });
  if (!(file instanceof File) || file.size === 0) return invalid('Choose a PDF to upload.');
  // The extension is what the API checks; some browsers send no type for a PDF.
  if (!file.name.toLowerCase().endsWith('.pdf')) return invalid('Your CV must be a PDF file.');
  if (file.size > MAX_CV_BYTES) return invalid('Your CV must be 5 MB or smaller.');
  if (new TextDecoder().decode(await file.slice(0, 5).arrayBuffer()) !== '%PDF-')
    return invalid('Choose a valid PDF file.');

  try {
    await uploadCv(CURRENT_EDITION.eventId, file);
  } catch (error) {
    return formError(error);
  }
  revalidatePath('/dashboard/cv');
  return { success: 'Your CV has been saved.' };
}

async function removeCv(): Promise<FormState> {
  try {
    await deleteCv(CURRENT_EDITION.eventId);
  } catch (error) {
    return { error: errorMessage(error) };
  }
  revalidatePath('/dashboard/cv');
  return { success: 'Your CV has been removed.' };
}
