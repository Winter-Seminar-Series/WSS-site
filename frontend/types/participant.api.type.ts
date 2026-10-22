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
  grade: Grade;
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

/** `/attachment/:event/` */
export interface AttachmentResponse {
  id: number;
  plan: string;
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
