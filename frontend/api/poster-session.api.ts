import { httpGet, httpPost, httpPut, isHttpError } from '@/services/http';
import type { PosterImageResponse } from '@/types/participant.api.type';

/** URL of the participant's submitted poster for this edition, or null when they have not submitted one. */
export async function getPosterUrl(eventId: number): Promise<string | null> {
  try {
    const { image } = await httpGet<PosterImageResponse>(`/poster-session/${eventId}/image/`, { auth: true });
    return image;
  } catch (error) {
    if (isHttpError(error, 404)) return null;
    throw error;
  }
}

export function uploadPoster(eventId: number, file: File, replace: boolean): Promise<PosterImageResponse> {
  const body = new FormData();
  body.append('image', file);
  return replace
    ? httpPut<PosterImageResponse>(`/poster-session/${eventId}/image/`, body, { auth: true })
    : httpPost<PosterImageResponse>(`/poster-session/${eventId}/image/create/`, body, { auth: true });
}
