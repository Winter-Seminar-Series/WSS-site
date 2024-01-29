import { convertTimeToDate } from '../../date';
import { Speaker, Workshop, WorkshopSession } from '../../types';
import { fetchJson } from '../fetch';
import { fetchSpeakerById } from './speaker';

type WorkshopResponse = {
  id: number;
  price: number;
  workshop: {
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
  };
}[];

export async function fetchWorkshops() {
  const url = `${process.env.API_ORIGIN}/api/workshop/1/`;

  const response = await fetchJson<WorkshopResponse>(url);

  // @ts-ignore
  const workshops: Workshop[] = await Promise.all(
    response.map(async (workshopResponse) => {
      const sessions: WorkshopSession[] = await Promise.all(
        workshopResponse.workshop.sessions.map(async (sessionResponse) => {
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
      // @ts-ignore
      const startDate: Date = sessions.reduce((startDate, session) => {
        // @ts-ignore
        if (startDate === null || session.date < startDate) {
          return session.date;
        }
        return startDate;
      }, null);
      // @ts-ignore
      const endDate: Date = sessions.reduce((endDate, session) => {
        // @ts-ignore
        if (endDate === null || session.date > endDate) {
          return session.date;
        }
        return endDate;
      }, null);

      return {
        ...workshopResponse.workshop,
        id: workshopResponse.id,
        price: workshopResponse.price,
        sessions,
        startDate,
        endDate,
      };
    }),
  );

  return workshops;
}