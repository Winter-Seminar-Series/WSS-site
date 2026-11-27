export type Gender = 'M' | 'F' | 'O';
export type Grade = 'B' | 'M' | 'P';

export interface TokenPairResponse {
  access: string;
  refresh: string;
}

/** `/profile/` — the participant's `ParticipantInfo` plus their account email. */
export interface ProfileResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  national_code: string;
  phone_number: string;
  city: string;
  birth_date: string | null;
  gender: Gender;
  university: string;
  major: string;
  job: string;
  is_open_to_work: boolean;
  fields_of_interest: string;
  /** Empty until the participant picks one. */
  grade: Grade | '';
  introduction_method: string;
  linkedin: string;
  github: string;
}

export type ProfileUpdateRequest = Partial<Omit<ProfileResponse, 'id' | 'email'>>;

/** `/participation/:event/` */
export interface ParticipationResponse {
  plan: number;
  license_key: string | null;
}

/** `/addon/:event/` — units of each add-on the participant holds, summed over their purchases. */
export interface AddonHoldingResponse {
  addon: number;
  quantity: number;
}

/** `/attachment/` (every edition) and `/attachment/:event/` */
export interface AttachmentResponse {
  id: number;
  plan: string;
  /** `core_event.id`. Missing from a backend that predates the all-editions list. */
  event?: number;
  description: string;
  date: string;
  UUID: string;
}

/** `/file/:id/` */
export interface FileResponse {
  attachment: string;
}

export interface PosterImageResponse {
  image: string | null;
}

/** `/cv/:event_id/`: the participant's CV for one edition. */
export interface CvResponse {
  /** Signed URL; it expires, so it is fetched fresh for every download (app/dashboard/cv/file). */
  file: string;
  file_name: string;
  /** Bytes. */
  size: number;
  uploaded_at: string;
  updated_at: string;
}
