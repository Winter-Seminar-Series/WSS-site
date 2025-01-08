import { convertTimeToDate } from '../../date';
import { convertMarkdownToHTML } from '../../markdown';
import { RoundTable } from '../../types';
import { fetchJson } from '../fetch';

type RoundTableResponse = {
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
  speakers: {
    id: number;
    name: string;
    designation: string;
    description: string;
    image: string;
  }[];
}[];

export async function fetchRoundTables() {
  const url = `${process.env.API_ORIGIN}/api/round-table/${process.env.WSS_ORDER}/`;

  const response = await fetchJson<RoundTableResponse>(url);

  const roundTables: RoundTable[] = await Promise.all(
    response.map(async (roundTableResponse) => {
      const description = await convertMarkdownToHTML(
        roundTableResponse.subEvent.description,
      );
      const startingTime = convertTimeToDate(
        roundTableResponse.subEvent.startingTime,
      );
      const endingTime = convertTimeToDate(
        roundTableResponse.subEvent.endingTime,
      );
      const date = new Date(roundTableResponse.subEvent.date);

      return {
        ...roundTableResponse.subEvent,
        speakers: roundTableResponse.speakers,
        description,
        startingTime,
        endingTime,
        date,
      };
    }),
  );

  return roundTables;
}
