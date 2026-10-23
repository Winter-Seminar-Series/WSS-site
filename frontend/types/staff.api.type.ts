export interface StaffResponse {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string | null;
  /** BlurHash of the image. Absent from older backends, and empty until it has been computed. */
  image_blurhash?: string;
}

export interface StaffTeamResponse {
  id: number;
  name: string;
  members: { id: number; staff: StaffResponse }[];
}
