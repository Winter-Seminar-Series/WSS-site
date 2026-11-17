import type { StaffMember } from '@/types/event.type';

/**
 * Display order within each team. The admin enters designations as free text, and they differ
 * between editions ("Co_Head", "Sub Head of X", "Sub-Head of X"), so ranks come from normalised text and
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

const byText = (a: string, b: string) => a.localeCompare(b, 'en', { sensitivity: 'base' });

/** President, vice presidents, heads, leaders, sub-heads, seniors, other roles, then everyone else by name. */
export function sortStaffMembers<T extends Pick<StaffMember, 'name' | 'designation'>>(members: readonly T[]): T[] {
  return [...members].sort(
    (a, b) =>
      roleRank(a.designation) - roleRank(b.designation) ||
      byText(a.designation, b.designation) ||
      byText(a.name, b.name),
  );
}
