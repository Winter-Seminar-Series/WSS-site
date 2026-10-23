import type { StaffMember } from '@/types/event.type';

/**
 * Display order of the organising team. The admin enters designations and team names as free text, and they differ
 * between editions ("Co_Head", "Sub Head of X", "Sub-Head of X", "Excutive"), so ranks come from normalised text and
 * unknown values sort after the known ones instead of failing.
 */

const normalise = (text: string) => text.toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();

/** Lower is more senior. Exported so a person on several teams can be shown under their highest role. */
export function roleRank(designation: string): number {
  const role = normalise(designation);
  if (!role) return 7;
  if (role.startsWith('president')) return 0;
  if (role.startsWith('vice president')) return 1;
  if (role.startsWith('sub head')) return 4;
  if (role.startsWith('head') || role.startsWith('co head')) return 2;
  if (role.startsWith('leader')) return 3;
  if (role.startsWith('senior')) return 5;
  return 6;
}

/** First match wins, so list the more specific names first. */
const TEAM_ORDER: readonly string[] = [
  'committee',
  'scientific',
  'executive',
  'excutive',
  'technical',
  'networking',
  'content',
  'social',
  'media',
  'marketing',
  'branding',
  'sponsorship',
  'finance',
  'human',
];

function teamRank(name: string): number {
  const team = normalise(name);
  const index = TEAM_ORDER.findIndex((keyword) => team.includes(keyword));
  return index === -1 ? TEAM_ORDER.length : index;
}

const byText = (a: string, b: string) => a.localeCompare(b, 'en', { sensitivity: 'base' });

/** Committee first, then the teams in `TEAM_ORDER`, then the rest; ties by name, so the order never depends on ids. */
export function sortStaffTeams<T extends { name: string }>(teams: readonly T[]): T[] {
  return [...teams].sort((a, b) => teamRank(a.name) - teamRank(b.name) || byText(a.name, b.name));
}

/** President, vice presidents, heads, leaders, sub-heads, seniors, other roles, then everyone else by name. */
export function sortStaffMembers<T extends Pick<StaffMember, 'name' | 'designation'>>(members: readonly T[]): T[] {
  return [...members].sort(
    (a, b) =>
      roleRank(a.designation) - roleRank(b.designation) ||
      byText(a.designation, b.designation) ||
      byText(a.name, b.name),
  );
}
