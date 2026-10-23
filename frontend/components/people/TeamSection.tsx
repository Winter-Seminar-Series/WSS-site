import type { StaffMember } from '@/types/event.type';
import { PersonPhoto } from '@/ui/PersonPhoto';

// Leads first, in this order; everyone else alphabetically by role, people without a role last.
const ROLE_PRIORITY = ['President', 'Vice President', 'Head', 'Sub-Head', 'Senior'];

function rolePriority(designation: string): number {
  const index = ROLE_PRIORITY.findIndex((role) => designation.startsWith(role));
  if (index !== -1) return index;
  return designation ? ROLE_PRIORITY.length : ROLE_PRIORITY.length + 1;
}

function byRole(a: StaffMember, b: StaffMember): number {
  return rolePriority(a.designation) - rolePriority(b.designation) || a.designation.localeCompare(b.designation);
}

interface Props {
  name: string;
  members: StaffMember[];
  /** Keep the given order instead of sorting leads first. */
  preserveOrder?: boolean;
}

export function TeamSection({ name, members, preserveOrder = false }: Props) {
  const ordered = preserveOrder ? members : [...members].sort(byRole);
  const headingId = `team-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <section aria-labelledby={headingId} className="pb-14">
      <div className="mb-10 flex items-center gap-6 px-6 md:px-12">
        <hr className="grow border-line-soft" />
        <h3 id={headingId} className="text-center text-3xl font-bold text-ink md:text-4xl">
          {name}
        </h3>
        <hr className="grow border-line-soft" />
      </div>
      <ul className="mx-auto flex max-w-300 flex-wrap justify-center gap-x-8 gap-y-10 px-6">
        {ordered.map((member) => (
          <li key={member.id} className="flex w-52 flex-col items-center text-center">
            <PersonPhoto
              src={member.image}
              blur={member.imageBlur}
              name={member.name}
              size={200}
              className="rounded-full"
            />
            <p className="mt-3 font-semibold text-ink">{member.name}</p>
            {member.designation && <p className="text-sm text-muted">{member.designation}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
