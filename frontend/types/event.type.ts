/* App-facing shapes, mapped from the wire types in `api/`. Markdown is already rendered to sanitized HTML. */

export interface Speaker {
  id: number;
  name: string;
  designation: string;
  bioHtml: string;
  image: string | null;
  /** `blurDataURL` for the image, decoded on the server from the API's BlurHash (grey when it has none). */
  imageBlur: string;
}

export type SubEventKind = 'seminar' | 'round-table' | 'lab-talk';

/** A seminar, round table or lab talk — they differ only in how many speakers they have. */
export interface SubEvent {
  id: number;
  kind: SubEventKind;
  name: string;
  descriptionHtml: string;
  /** `YYYY-MM-DD`, Tehran. */
  date: string;
  /** `HH:MM:SS`, Tehran. */
  startTime: string;
  endTime: string;
  poster: string | null;
  posterBlur: string;
  thumbnail: string | null;
  thumbnailBlur: string;
  speakers: Speaker[];
}

export interface WorkshopSession {
  id: number;
  name: string;
  descriptionHtml: string;
  date: string;
  startTime: string;
  endTime: string;
  speaker: Speaker;
}

export interface Workshop {
  id: number;
  name: string;
  descriptionHtml: string;
  poster: string | null;
  posterBlur: string;
  thumbnail: string | null;
  thumbnailBlur: string;
  /** Toman. */
  price: number;
  sessions: WorkshopSession[];
  startDate: string | null;
  endDate: string | null;
}

export interface AttendanceMode {
  id: number;
  name: string;
  /** Toman. */
  price: number;
  isNationalCodeRequired: boolean;
}

export interface StaffMember {
  id: number;
  name: string;
  designation: string;
  image: string | null;
  /** Missing for the hand-written advisors. */
  imageBlur?: string;
  /** Optional contact links; missing for the hand-written advisors. */
  links?: StaffLinks;
}

export interface StaffLinks {
  website?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface StaffTeam {
  id: number;
  name: string;
  members: StaffMember[];
}
