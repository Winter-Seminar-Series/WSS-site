import { removeDuplicateID } from '../../collections';
import { convertTimeToDate } from '../../date';
import { convertMarkdownToHTML } from '../../markdown';
import { Seminar } from '../../types';
import { fetchJson } from '../fetch';

type SeminarResponse = {
  subEvent: {
    id: number;
    name: string;
    description: string;
    startingTime: string;
    endingTime: string;
    date: string;
    poster: string;
    thumbnail: string;
  };
  speaker: {
    id: number;
    name: string;
    designation: string;
    description: string;
    image: string;
  };
}[];

export async function fetchSeminars() {
  const url = `${process.env.API_ORIGIN}/api/seminar/${process.env.WSS_ORDER}/`;

  const response = await fetchJson<SeminarResponse>(url);

  const seminars: Seminar[] = await Promise.all(
    response.reverse().map(async (seminarResponse) => {
      const description = await convertMarkdownToHTML(
        seminarResponse.subEvent.description,
      );
      const startingTime = convertTimeToDate(
        seminarResponse.subEvent.startingTime,
      );
      const endingTime = convertTimeToDate(seminarResponse.subEvent.endingTime);
      const date = new Date(seminarResponse.subEvent.date);

      return {
        ...seminarResponse.subEvent,
        speaker: seminarResponse.speaker,
        description,
        startingTime,
        endingTime,
        date,
      };
    }),
  );

  return seminars;
}

export async function fetchSeminarSpeakers() {
  const seminars = await fetchSeminars();

  return removeDuplicateID(seminars.map((seminar) => seminar.speaker));
}
