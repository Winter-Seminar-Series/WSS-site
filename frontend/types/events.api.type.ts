/* Wire shapes of the Django `core` app — field names mirror the serializers exactly. */

export interface SpeakerResponse {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string | null;
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
    sessions: WorkshopSessionResponse[];
  } | null;
  mode_of_attendance: ModeOfAttendanceResponse | null;
}
