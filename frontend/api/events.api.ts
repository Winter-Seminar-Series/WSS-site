import { blurDataUrl } from '@/lib/blurhash';
import { uniqueById } from '@/lib/collections';
import { markdownToHtml } from '@/lib/markdown';
import { httpGet } from '@/services/http';
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
    imageBlur: blurDataUrl(speaker.image_blurhash),
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
    posterBlur: blurDataUrl(subEvent.poster_blurhash),
    thumbnail: subEvent.thumbnail,
    thumbnailBlur: blurDataUrl(subEvent.thumbnail_blurhash),
    speakers: await Promise.all(speakers.map(toSpeaker)),
  };
}

/** Edition-scoped endpoints take the edition's `core_event.id` (`Edition.eventId`). */
export async function getSubEvents(eventId: number, kind: SubEventKind): Promise<SubEvent[]> {
  const path = `/${SUB_EVENT_ENDPOINTS[kind]}/${eventId}/`;
  if (kind === 'round-table') {
    const response = await httpGet<RoundTableResponse[]>(path, { tags: [EVENTS_TAG] });
    return Promise.all(response.map((item) => toSubEvent(kind, item.sub_event, item.speakers)));
  }
  const response = await httpGet<SingleSpeakerSubEventResponse[]>(path, { tags: [EVENTS_TAG] });
  return Promise.all(response.map((item) => toSubEvent(kind, item.sub_event, [item.speaker])));
}

export async function getSubEvent(eventId: number, kind: SubEventKind, id: number): Promise<SubEvent | null> {
  const subEvents = await getSubEvents(eventId, kind);
  return subEvents.find((subEvent) => subEvent.id === id) ?? null;
}

/** Everyone presenting at a seminar or round table of an edition — the landing page's speaker strip. */
export async function getEditionSpeakers(eventId: number): Promise<Speaker[]> {
  const [seminars, roundTables] = await Promise.all([
    getSubEvents(eventId, 'seminar'),
    getSubEvents(eventId, 'round-table'),
  ]);
  return uniqueById([...seminars, ...roundTables].flatMap((subEvent) => subEvent.speakers));
}

export async function getSpeaker(id: number): Promise<Speaker> {
  return toSpeaker(await httpGet<SpeakerResponse>(`/speaker/${id}/`, { tags: [EVENTS_TAG] }));
}

export async function getWorkshops(eventId: number): Promise<Workshop[]> {
  const plans = await httpGet<ParticipationPlanResponse[]>(`/workshop/${eventId}/`, { tags: [EVENTS_TAG] });

  // Sessions embed their speaker (`speaker_details`); an older API sends only the id, so fetch just those.
  const sessions = plans.flatMap((plan) => plan.workshop?.sessions ?? []);
  const embedded = uniqueById(sessions.flatMap((session) => session.speaker_details ?? []));
  const missing = [...new Set(sessions.filter((s) => !s.speaker_details).map((s) => s.speaker))];
  const speakers = new Map(
    (await Promise.all([...embedded.map(toSpeaker), ...missing.map(getSpeaker)])).map((speaker) => [
      speaker.id,
      speaker,
    ]),
  );

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
        posterBlur: blurDataUrl(plan.workshop.poster_blurhash),
        thumbnail: plan.workshop.thumbnail,
        thumbnailBlur: blurDataUrl(plan.workshop.thumbnail_blurhash),
        price: plan.price / RIAL_PER_TOMAN,
        sessions,
        startDate: sessions.at(0)?.date ?? null,
        endDate: sessions.at(-1)?.date ?? null,
      };
    }),
  );
  return workshops.filter((workshop): workshop is Workshop => workshop !== null);
}

export async function getWorkshop(eventId: number, id: number): Promise<Workshop | null> {
  return (await getWorkshops(eventId)).find((workshop) => workshop.id === id) ?? null;
}

export async function getAttendanceModes(eventId: number): Promise<AttendanceMode[]> {
  const plans = await httpGet<ParticipationPlanResponse[]>(`/mode/${eventId}/`, { tags: [EVENTS_TAG] });
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
