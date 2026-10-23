import { blurDataUrl } from '@/lib/blurhash';
import { httpGet } from '@/services/http';
import type { StaffMember, StaffTeam } from '@/types/event.type';
import type { StaffTeamResponse } from '@/types/staff.api.type';

export const STAFF_TAG = 'staff';

export async function getStaffTeams(eventId: number): Promise<StaffTeam[]> {
  const teams = await httpGet<StaffTeamResponse[]>(`/staff/${eventId}/`, { tags: [STAFF_TAG] });
  return teams.map((team) => ({
    id: team.id,
    name: team.name,
    members: team.members.map(({ staff }) => ({
      id: staff.id,
      name: staff.name,
      designation: staff.designation,
      image: staff.image,
      imageBlur: blurDataUrl(staff.image_blurhash),
    })),
  }));
}

/** Every staff member with a photo, labelled with their team — the landing page's staff strip. */
export async function getStaffWithPhotos(eventId: number): Promise<(StaffMember & { team: string })[]> {
  const teams = await getStaffTeams(eventId);
  return teams.flatMap((team) =>
    team.members.filter((member) => member.image).map((member) => ({ ...member, team: team.name })),
  );
}
