import { Speaker } from '../../types';
import { fetchJson } from '../fetch';

export async function fetchSpeakerById(id: number) {
  const url = `${process.env.API_ORIGIN}/api/speaker/${id}/`;

  return await fetchJson<Speaker>(url);
}
