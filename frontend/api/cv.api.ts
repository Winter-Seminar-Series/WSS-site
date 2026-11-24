import { httpDelete, httpGet, httpPut, isHttpError } from '@/services/http';
import type { CvResponse } from '@/types/participant.api.type';
import type { Cv } from '@/types/participant.type';

/*
 * The participant's CV, always for one edition. Callers pass the edition explicitly (CURRENT_EDITION.eventId), so a
 * CV uploaded to one edition is never read, replaced or deleted from another.
 */

const cvPath = (eventId: number) => `/cv/${eventId}/`;

function toCv(response: CvResponse): Cv {
  return { fileName: response.file_name, size: response.size, updatedAt: response.updated_at };
}

/** The CV uploaded to this edition, or null when there is none. */
export async function getCv(eventId: number): Promise<Cv | null> {
  try {
    return toCv(await httpGet<CvResponse>(cvPath(eventId), { auth: true }));
  } catch (error) {
    if (isHttpError(error, 404)) return null;
    throw error;
  }
}

/** A freshly signed download URL for this edition's CV, or null when there is none. */
export async function getCvFileUrl(eventId: number): Promise<string | null> {
  try {
    return (await httpGet<CvResponse>(cvPath(eventId), { auth: true })).file;
  } catch (error) {
    if (isHttpError(error, 404)) return null;
    throw error;
  }
}

/** Uploads or replaces this edition's CV. */
export async function uploadCv(eventId: number, file: File): Promise<Cv> {
  const body = new FormData();
  body.append('file', file);
  return toCv(await httpPut<CvResponse>(cvPath(eventId), body, { auth: true }));
}

/** Withdraws this edition's CV. Already gone counts as done. */
export async function deleteCv(eventId: number): Promise<void> {
  try {
    await httpDelete(cvPath(eventId), { auth: true });
  } catch (error) {
    if (!isHttpError(error, 404)) throw error;
  }
}
