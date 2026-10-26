/* Wire shapes of the Django `core` app — field names mirror the serializers exactly. */

export interface SpeakerResponse {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string | null;
  /** BlurHash of the image. Absent from older backends, and empty until it has been computed. */
  image_blurhash?: string;
}

export interface SubEventResponse {
  id: number;
  kind: 'S' | 'W' | 'R' | 'L' | 'P';
  name: string;
  description: string;
  starting_time: string;
  ending_time: string;
  date: string;
  venue: 'V' | 'P';
  link: string;
  poster: string | null;
  thumbnail: string | null;
  poster_blurhash?: string;
  thumbnail_blurhash?: string;
  event: number;
}

/** `/seminar/:event/`, `/lab-talk/:event/` */
export interface SingleSpeakerSubEventResponse {
  sub_event: SubEventResponse;
  speaker: SpeakerResponse;
}

/** `/round-table/:event/` */
export interface RoundTableResponse {
  sub_event: SubEventResponse;
  speakers: SpeakerResponse[];
}

export interface WorkshopSessionResponse {
  id: number;
  workshop: number;
  speaker: number;
  /** Sent by the API since it embeds speakers; absent from older backends. */
  speaker_details?: SpeakerResponse;
  name: string;
  description: string;
  starting_time: string;
  ending_time: string;
  date: string;
}

export interface ModeOfAttendanceResponse {
  id: number;
  name: string;
  is_national_code_required: boolean;
}

/** `/workshop/:event/` and `/mode/:event/` both return participation plans. */
export interface ParticipationPlanResponse {
  id: number;
  /** Rial. */
  price: number;
  event: string;
  kind: 'M' | 'W';
  workshop: {
    name: string;
    description: string;
    poster: string | null;
    thumbnail: string | null;
    poster_blurhash?: string;
    thumbnail_blurhash?: string;
    sessions: WorkshopSessionResponse[];
  } | null;
  mode_of_attendance: ModeOfAttendanceResponse | null;
  /** Absent from older backends. */
  addons?: PlanAddonResponse[];
}

/** An optional extra sold with a plan (lunch, parking…). */
export interface PlanAddonResponse {
  id: number;
  name: string;
  description: string;
  /** Rial, per unit. */
  price: number;
  discountable: boolean;
  is_open: boolean;
  max_per_participant: number;
  /** Units left to sell, or null for no limit. May be cached; checkout counts again. */
  remaining: number | null;
}
