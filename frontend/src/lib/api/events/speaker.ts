import { convertMarkdownToHTML } from '../../markdown';
import { Speaker } from '../../types';
import { fetchJson } from '../fetch';

export async function fetchSpeakerById(id: number) {
  const url = `${process.env.API_ORIGIN}/api/speaker/${id}/`;

  const speakerResponse = await fetchJson<Speaker>(url);

  const description = await convertMarkdownToHTML(speakerResponse.description);

  const speaker: Speaker = {
    ...speakerResponse,
    description,
  };

  return speaker;
}
