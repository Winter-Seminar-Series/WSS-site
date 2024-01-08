export type Staff = {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string;
  team?: string;
};

export type StaffTeam = {
  id: number;
  name: string;
  members: { id: number; staff: Staff }[];
};
