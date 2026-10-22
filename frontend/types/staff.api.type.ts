export interface StaffResponse {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string | null;
}

export interface StaffTeamResponse {
  id: number;
  name: string;
  members: { id: number; staff: StaffResponse }[];
}
