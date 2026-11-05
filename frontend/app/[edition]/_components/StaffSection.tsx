import { ArrowRight } from 'lucide-react';

import { getStaffWithPhotos } from '@/api/staff.api';
import { editionHref } from '@/lib/editions';
import type { Edition } from '@/lib/editions';
import { LinkButton } from '@/ui/Button';
import { MARQUEE_REM_PER_SECOND, Marquee } from '@/ui/Marquee';
import { PersonPhoto } from '@/ui/PersonPhoto';
import { SectionHeading } from '@/ui/SectionHeading';

/** A member's width from md (`md:w-40`): with the shared pace, sets the row's duration. */
const MEMBER_REM = 10;

export async function StaffSection({ edition }: { edition: Edition }) {
  const staff = await getStaffWithPhotos(edition.eventId);
  if (staff.length === 0) return null;

  return (
    <section aria-labelledby="staff" className="py-16 md:py-24">
      <div className="mx-auto max-w-300 px-4 md:px-6">
        <SectionHeading
          id="staff"
          title="The team"
          lead={`${staff.length} students volunteer their winter to put the series together.`}
          action={
            <LinkButton href={editionHref(edition, '/about#staff')} variant="outline">
              Meet everyone
              <ArrowRight className="size-4" aria-hidden />
            </LinkButton>
          }
        />
      </div>
      <div className="mt-10">
        <Marquee label="Staff members" durationSeconds={(staff.length * MEMBER_REM) / MARQUEE_REM_PER_SECOND}>
          {staff.map((member) => (
            <li key={member.id} className="flex w-36 shrink-0 flex-col items-center px-2 text-center md:w-40">
              <PersonPhoto
                src={member.image}
                blur={member.imageBlur}
                name={member.name}
                size={112}
                className="rounded-full ring-4 ring-canvas"
              />
              <p className="mt-3 text-sm leading-snug font-bold text-ink">{member.name}</p>
              <p className="mt-0.5 text-xs text-muted">{member.team}</p>
            </li>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
