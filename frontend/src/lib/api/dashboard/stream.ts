'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';
import { convertMarkdownToHTML } from '../../markdown';
import { StreamEvent } from '../../types';
import { fetchJsonWithAuth } from '../fetch';
import { cleanInput } from '../../error';

type StreamEventResponse = {
  id: number;
  room: {
    roomId: number;
    name: string;
    title: string;
  };
  plan: number;
  title: string;
  description: string;
  startingTime: string;
  duration: string;
}[];

export async function fetchStreamEvents() {
  const url = `${process.env.API_ORIGIN}/api/skyroom/list/`;

  const response = await fetchJsonWithAuth<StreamEventResponse>(url);

  const streamEvents: StreamEvent[] = await Promise.all(
    response.map(async (eventResponse) => {
      const description = await convertMarkdownToHTML(
        eventResponse.description,
      );
      const startingTime = new Date(eventResponse.startingTime);

      return { ...eventResponse, description, startingTime };
    }),
  );

  // @ts-ignore
  streamEvents.sort((a, b) => a.startingTime - b.startingTime);

  return streamEvents;
}

type AttendStreamResponse = {
  id: number;
  link: string;
};

async function callAttendSeminarAPI(id: number) {
  const url = `${process.env.API_ORIGIN}/api/skyroom/link/${id}/`;

  const { link } = await fetchJsonWithAuth<AttendStreamResponse>(url);

  return link;
}

const FormSchema = z.object({
  id: z.number(),
});

type FormInput = z.infer<typeof FormSchema>;

export async function attendStream(input: FormInput) {
  noStore();

  const { cleanedInput, errorMessage } = cleanInput(FormSchema, input);
  if (errorMessage) {
    return { error: errorMessage };
  }

  const { id } = cleanedInput;

  try {
    const link = await callAttendSeminarAPI(id);
    return { link };
  } catch (error) {
    return { error: 'Something wrong happened. Please try again later.' };
  }
}
