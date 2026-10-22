import { markdownToHtml } from '@/lib/markdown';
import { httpGet } from '@/services/http';
import type { StreamEvent } from '@/types/participant.type';
import type { StreamEventResponse, StreamLinkResponse } from '@/types/stream.api.type';

export async function getStreamEvents(): Promise<StreamEvent[]> {
  const response = await httpGet<StreamEventResponse[]>('/skyroom/list/', { auth: true });
  const now = Date.now();
  const events = await Promise.all(
    response.map(async (event) => ({
      id: event.id,
      title: event.title,
      descriptionHtml: await markdownToHtml(event.description),
      startsAt: event.starting_time,
      live: Date.parse(event.starting_time) <= now,
    })),
  );
  return events.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export async function getStreamLink(eventId: number): Promise<string> {
  const { link } = await httpGet<StreamLinkResponse>(`/skyroom/link/${eventId}/`, { auth: true });
  return link;
}
