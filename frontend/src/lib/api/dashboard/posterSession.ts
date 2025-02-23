'use server';
import { fetchJsonWithAuth } from '../fetch';

type PosterSessionImageResponse = { image: string };

export async function getPosterSessionImage() {
  const url = `${process.env.API_ORIGIN}/api/poster-session/image/`;
  const response = await fetchJsonWithAuth<PosterSessionImageResponse>(url);
  return response;
}
