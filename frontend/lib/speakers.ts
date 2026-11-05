/**
 * Splits a designation into role and organization. The admin enters it as free text, most often
 * `Role @ Organization` and in older editions `Role at Organization`. Several roles (`… | …`) keep only the first,
 * and text in neither form is a role with no organization.
 */
export function splitDesignation(designation: string): { role: string; organization: string | null } {
  const [first = ''] = designation.split('|');
  const primary = first.trim();
  const match = / @ |@| at /.exec(primary);
  if (!match) return { role: primary, organization: null };

  const organization = primary.slice(match.index + match[0].length).trim();
  return { role: primary.slice(0, match.index).trim(), organization: organization === '' ? null : organization };
}

/**
 * The designation's organization stays: it is often more precise ("Sanger Institute, University of Cambridge"). The
 * admin's current organization names it only when the designation does not.
 */
export function withCurrentOrganization(
  split: { role: string; organization: string | null },
  current: string | undefined,
): { role: string; organization: string | null } {
  return { ...split, organization: split.organization ?? current ?? null };
}

const MINOR_WORDS = new Set(['of', 'the', 'and', 'for', 'at', 'in']);

/** `University of Tehran` → `UT`, `Google` → `G`: stands in for a logo that has not been uploaded. */
export function organizationInitials(name: string): string {
  const words = name
    .replace(/\(.*?\)/g, '')
    .split(/[\s,-]+/)
    .filter((word) => word && !MINOR_WORDS.has(word.toLowerCase()));
  return words
    .slice(0, 3)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}
