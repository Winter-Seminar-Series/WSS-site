import { EVENT_ID, httpGet } from '@/services/http';
import type { StaffMember, StaffTeam } from '@/types/event.type';
import type { StaffTeamResponse } from '@/types/staff.api.type';

export const STAFF_TAG = 'staff';

export async function getStaffTeams(): Promise<StaffTeam[]> {
  const teams = await httpGet<StaffTeamResponse[]>(`/staff/${EVENT_ID}/`, { tags: [STAFF_TAG] });
  return teams.map((team) => ({
    id: team.id,
    name: team.name,
    members: team.members.map(({ staff }) => ({
      id: staff.id,
      name: staff.name,
      designation: staff.designation,
      image: staff.image,
    })),
  }));
}

/** Every staff member with a photo, labelled with their team — the landing page's staff strip. */
export async function getStaffWithPhotos(): Promise<(StaffMember & { team: string })[]> {
  const teams = await getStaffTeams();
  return teams.flatMap((team) =>
    team.members.filter((member) => member.image).map((member) => ({ ...member, team: team.name })),
  );
}
