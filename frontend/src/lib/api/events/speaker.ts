import { Speaker } from '../../types';
import { fetchJsonWithAuth } from '../fetch';

export async function fetchSpeakerById(id: number) {
  const url = `${process.env.API_ORIGIN}/api/speaker/${id}/`;

  return await fetchJsonWithAuth<Speaker>(url);
}
