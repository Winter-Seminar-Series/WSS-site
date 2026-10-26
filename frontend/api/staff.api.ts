import { blurDataUrl } from '@/lib/blurhash';
import { roleRank, sortStaffMembers, sortStaffTeams } from '@/lib/staff-order';
import { httpGet } from '@/services/http';
import type { StaffMember, StaffTeam } from '@/types/event.type';
import type { StaffTeamResponse } from '@/types/staff.api.type';

export const STAFF_TAG = 'staff';

export async function getStaffTeams(eventId: number): Promise<StaffTeam[]> {
  const teams = await httpGet<StaffTeamResponse[]>(`/staff/${eventId}/`, { tags: [STAFF_TAG] });
  return sortStaffTeams(
    teams.map((team) => ({
      id: team.id,
      name: team.name,
      members: sortStaffMembers(
        team.members.map(({ staff }) => ({
          id: staff.id,
          name: staff.name,
          designation: staff.designation,
          image: staff.image,
          imageBlur: blurDataUrl(staff.image_blurhash),
          links: {
            website: staff.website || undefined,
            linkedin: staff.linkedin || undefined,
            github: staff.github || undefined,
            email: staff.email || undefined,
          },
        })),
      ),
    })),
  );
}

/**
 * Every staff member with a photo, labelled with their team — the landing page's staff strip. Teams and members
 * keep their display order; someone on several teams appears once, under the team where their role is highest.
 */
export async function getStaffWithPhotos(eventId: number): Promise<(StaffMember & { team: string })[]> {
  const teams = await getStaffTeams(eventId);
  const entries = teams.flatMap((team) =>
    team.members.filter((member) => member.image).map((member) => ({ ...member, team: team.name })),
  );
  const best = new Map<number, (typeof entries)[number]>();
  for (const entry of entries) {
    const current = best.get(entry.id);
    if (!current || roleRank(entry.designation) < roleRank(current.designation)) best.set(entry.id, entry);
  }
  return entries.filter((entry) => best.get(entry.id) === entry);
}
