import { StaffLinks } from '@/components/people/StaffLinks';
import type { StaffMember } from '@/types/event.type';
import { PersonPhoto } from '@/ui/PersonPhoto';

interface Props {
  name: string;
  members: StaffMember[];
}

export function TeamSection({ name, members }: Props) {
  const headingId = `team-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-300 px-4 pb-14 md:px-6 md:pb-20">
      <div className="mb-8 flex items-baseline gap-3 border-b border-line-soft pb-4">
        <h3 id={headingId} className="text-2xl font-extrabold tracking-[-0.03em] text-ink md:text-3xl">
          {name}
        </h3>
        <span className="text-sm font-semibold text-muted tabular-nums">{members.length}</span>
      </div>
      <ul className="reveal grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {members.map((member) => (
          <li key={member.id} className="flex flex-col items-center text-center">
            <PersonPhoto
              src={member.image}
              blur={member.imageBlur}
              name={member.name}
              size={136}
              className="max-w-full rounded-full ring-4 ring-canvas"
            />
            <p className="mt-4 leading-snug font-bold text-ink">{member.name}</p>
            {member.designation && <p className="mt-1 text-sm text-muted">{member.designation}</p>}
            {member.links && <StaffLinks name={member.name} links={member.links} />}
          </li>
        ))}
      </ul>
    </section>
  );
}
