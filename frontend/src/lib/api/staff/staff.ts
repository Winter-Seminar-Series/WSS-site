import fetchJson from '../fetchJson';
import type { StaffTeam } from '../../types';

export async function fetchStaffTeams() {
  const eventId = 1;
  const url = `${process.env.API_ORIGIN}/api/staff/${eventId}/`;
  return await fetchJson<[StaffTeam]>(url);
}

export async function fetchStaffs() {
  const staffTeams = await fetchStaffTeams();
  return staffTeams.flatMap((staffTeam) =>
    staffTeam.members.map((member) => ({
      ...member.staff,
      team: staffTeam.name,
    })),
  );
}
