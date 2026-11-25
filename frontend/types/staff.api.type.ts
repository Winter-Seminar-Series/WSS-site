export interface StaffResponse {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string | null;
  /** BlurHash of the image. Absent from older backends, and empty until it has been computed. */
  image_blurhash?: string;
  /** Optional contact links. Absent from older backends, and empty when not set. */
  website?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface StaffTeamResponse {
  id: number;
  name: string;
  /** Teams arrive sorted by this value. Absent from older backends. */
  display_order?: number;
  /** Members arrive sorted by `display_order`, which is absent from older backends. */
  members: { id: number; display_order?: number; staff: StaffResponse }[];
}
