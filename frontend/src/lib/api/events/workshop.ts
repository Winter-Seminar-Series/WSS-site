import { convertTimeToDate } from '../../date';
import { Speaker } from '../../types';
import { fetchJson } from '../fetch';
import { fetchSpeakerById } from './speaker';

type WorkshopResponse = {
  id: number;
  price: number;
  name: string;
  image: string;
  description: string;
  sessions: {
    id: number;
    name: string;
    speaker: number;
    startingTime: string;
    endingTime: string;
    date: string;
    description: string;
  }[];
}[];

export async function fetchWorkshops() {
  const url = `${process.env.API_ORIGIN}/api/workshop/1/`;

  const response = await fetchJson<WorkshopResponse>(url);

  const workshops = await Promise.all(
    response.map(async (workshopResponse) => {
      const sessions = await Promise.all(
        workshopResponse.sessions.map(async (sessionResponse) => {
          const speaker = await fetchSpeakerById(sessionResponse.speaker);
          const startingTime = convertTimeToDate(sessionResponse.startingTime);
          const endingTime = convertTimeToDate(sessionResponse.endingTime);
          const date = new Date(sessionResponse.date);
          return {
            ...sessionResponse,
            speaker,
            startingTime,
            endingTime,
            date,
          };
        }),
        
      );
    }),
  );
}
