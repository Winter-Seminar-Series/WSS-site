import { httpGet, httpPost, httpPut, isHttpError } from '@/services/http';
import type { PosterImageResponse } from '@/types/participant.api.type';

/** URL of the participant's submitted poster, or null when they have not submitted one. */
export async function getPosterUrl(): Promise<string | null> {
  try {
    const { image } = await httpGet<PosterImageResponse>('/poster-session/image/', { auth: true });
    return image;
  } catch (error) {
    if (isHttpError(error, 404)) return null;
    throw error;
  }
}

export function uploadPoster(file: File, replace: boolean): Promise<PosterImageResponse> {
  const body = new FormData();
  body.append('image', file);
  return replace
    ? httpPut<PosterImageResponse>('/poster-session/image/', body, { auth: true })
    : httpPost<PosterImageResponse>('/poster-session/image/create/', body, { auth: true });
}
