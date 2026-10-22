'use server';

import { revalidatePath } from 'next/cache';

import { uploadPoster } from '@/api/poster-session.api';
import { getStreamLink } from '@/api/stream.api';
import { errorMessage } from '@/lib/form';
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
  if (!(file instanceof File) || file.size === 0) return { error: 'Choose a PDF to upload.' };
  if (file.type !== 'application/pdf') return { error: 'Posters must be PDF files.' };
  if (file.size > MAX_POSTER_BYTES) return { error: 'Posters must be 10MB or smaller.' };

  try {
    await uploadPoster(file, formData.get('replace') === 'true');
  } catch (error) {
    return { error: errorMessage(error) };
  }
  revalidatePath('/dashboard/poster-session');
  return { success: 'Poster uploaded.' };
}
