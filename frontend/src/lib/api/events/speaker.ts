import { convertMarkdownToHTML } from '../../markdown';
import { Speaker } from '../../types';
import { fetchJson } from '../fetch';
import { fetchRoundTableSpeakers } from './roundTable';
import { fetchSeminarSpeakers } from './seminar';
import { removeDuplicateID } from '../../collections';

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

export async function fetchAllSpeakers() {
  const roundTableSpeakers = await fetchRoundTableSpeakers();
  const seminarSpeakers = await fetchSeminarSpeakers();

  const allSpeakers = [...roundTableSpeakers, ...seminarSpeakers];

  return removeDuplicateID(allSpeakers);
}
