import { uniqueById } from '@/lib/collections';
import { markdownToHtml } from '@/lib/markdown';
import { EVENT_ID, httpGet } from '@/services/http';
import type { AttendanceMode, Speaker, SubEvent, SubEventKind, Workshop } from '@/types/event.type';
import type {
  ParticipationPlanResponse,
  RoundTableResponse,
  SingleSpeakerSubEventResponse,
  SpeakerResponse,
  SubEventResponse,
} from '@/types/events.api.type';

export const EVENTS_TAG = 'events';

/** The API prices in Rial; the site shows Toman. */
const RIAL_PER_TOMAN = 10;

const SUB_EVENT_ENDPOINTS: Record<SubEventKind, string> = {
  seminar: 'seminar',
  'round-table': 'round-table',
  'lab-talk': 'lab-talk',
};

async function toSpeaker(speaker: SpeakerResponse): Promise<Speaker> {
  return {
    id: speaker.id,
    name: speaker.name,
    designation: speaker.designation,
    bioHtml: await markdownToHtml(speaker.description),
    image: speaker.image,
  };
}

async function toSubEvent(
  kind: SubEventKind,
  subEvent: SubEventResponse,
  speakers: SpeakerResponse[],
): Promise<SubEvent> {
  return {
    id: subEvent.id,
    kind,
    name: subEvent.name,
    descriptionHtml: await markdownToHtml(subEvent.description),
    date: subEvent.date,
    startTime: subEvent.starting_time,
    endTime: subEvent.ending_time,
    poster: subEvent.poster,
    thumbnail: subEvent.thumbnail,
    speakers: await Promise.all(speakers.map(toSpeaker)),
  };
}

export async function getSubEvents(kind: SubEventKind): Promise<SubEvent[]> {
  const path = `/${SUB_EVENT_ENDPOINTS[kind]}/${EVENT_ID}/`;
  if (kind === 'round-table') {
    const response = await httpGet<RoundTableResponse[]>(path, { tags: [EVENTS_TAG] });
    return Promise.all(response.map((item) => toSubEvent(kind, item.sub_event, item.speakers)));
  }
  const response = await httpGet<SingleSpeakerSubEventResponse[]>(path, { tags: [EVENTS_TAG] });
  return Promise.all(response.map((item) => toSubEvent(kind, item.sub_event, [item.speaker])));
}

export async function getSubEvent(kind: SubEventKind, id: number): Promise<SubEvent | null> {
  const subEvents = await getSubEvents(kind);
  return subEvents.find((subEvent) => subEvent.id === id) ?? null;
}

/** Everyone presenting at a seminar or round table this edition — the landing page's speaker strip. */
export async function getEditionSpeakers(): Promise<Speaker[]> {
  const [seminars, roundTables] = await Promise.all([getSubEvents('seminar'), getSubEvents('round-table')]);
  return uniqueById([...seminars, ...roundTables].flatMap((subEvent) => subEvent.speakers));
}

export async function getSpeaker(id: number): Promise<Speaker> {
  return toSpeaker(await httpGet<SpeakerResponse>(`/speaker/${id}/`, { tags: [EVENTS_TAG] }));
}

export async function getWorkshops(): Promise<Workshop[]> {
  const plans = await httpGet<ParticipationPlanResponse[]>(`/workshop/${EVENT_ID}/`, { tags: [EVENTS_TAG] });

  // Sessions only carry a speaker id: fetch each distinct speaker once, in parallel.
  const speakerIds = [...new Set(plans.flatMap((plan) => plan.workshop?.sessions.map((s) => s.speaker) ?? []))];
  const speakers = new Map((await Promise.all(speakerIds.map(getSpeaker))).map((speaker) => [speaker.id, speaker]));

  const workshops = await Promise.all(
    plans.map(async (plan): Promise<Workshop | null> => {
      if (!plan.workshop) return null;
      const sessions = await Promise.all(
        plan.workshop.sessions.flatMap((session) => {
          const speaker = speakers.get(session.speaker);
          if (!speaker) return [];
          return markdownToHtml(session.description).then((descriptionHtml) => ({
            id: session.id,
            name: session.name,
            descriptionHtml,
            date: session.date,
            startTime: session.starting_time,
            endTime: session.ending_time,
            speaker,
          }));
        }),
      );
      sessions.sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`));
      return {
        id: plan.id,
        name: plan.workshop.name,
        descriptionHtml: await markdownToHtml(plan.workshop.description),
        poster: plan.workshop.poster,
        thumbnail: plan.workshop.thumbnail,
        price: plan.price / RIAL_PER_TOMAN,
        sessions,
        startDate: sessions.at(0)?.date ?? null,
        endDate: sessions.at(-1)?.date ?? null,
      };
    }),
  );
  return workshops.filter((workshop): workshop is Workshop => workshop !== null);
}

export async function getWorkshop(id: number): Promise<Workshop | null> {
  return (await getWorkshops()).find((workshop) => workshop.id === id) ?? null;
}

export async function getAttendanceModes(): Promise<AttendanceMode[]> {
  const plans = await httpGet<ParticipationPlanResponse[]>(`/mode/${EVENT_ID}/`, { tags: [EVENTS_TAG] });
  return plans.flatMap((plan) =>
    plan.mode_of_attendance
      ? [
          {
            id: plan.id,
            name: plan.mode_of_attendance.name,
            price: plan.price / RIAL_PER_TOMAN,
            isNationalCodeRequired: plan.mode_of_attendance.is_national_code_required,
          },
        ]
      : [],
  );
}
