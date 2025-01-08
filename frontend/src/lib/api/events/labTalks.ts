import { removeDuplicateID } from '../../collections';
import { convertTimeToDate } from '../../date';
import { convertMarkdownToHTML } from '../../markdown';
import { LabTalk } from '../../types';
import { fetchJson } from '../fetch';

type LabTalkResponse = {
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

export async function fetchLabTalks() {
  const url = `${process.env.API_ORIGIN}/api/lab-talk/${process.env.WSS_ORDER}/`;
  const response = await fetchJson<LabTalkResponse>(url);

  const labTalks: LabTalk[] = await Promise.all(
    response.reverse().map(async (labTalkResponse) => {
      const description = await convertMarkdownToHTML(
        labTalkResponse.subEvent.description,
      );
      const startingTime = convertTimeToDate(
        labTalkResponse.subEvent.startingTime,
      );
      const endingTime = convertTimeToDate(labTalkResponse.subEvent.endingTime);
      const date = new Date(labTalkResponse.subEvent.date);

      return {
        ...labTalkResponse.subEvent,
        speaker: labTalkResponse.speaker,
        description,
        startingTime,
        endingTime,
        date,
      };
    }),
  );

  return labTalks;
}

export async function fetchLabTalkSpeakers() {
  const labTalks = await fetchLabTalks();
  return removeDuplicateID(labTalks.map((labTalk) => labTalk.speaker));
}
