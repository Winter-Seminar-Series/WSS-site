import { ArrowRight } from 'lucide-react';

import { getStaffWithPhotos } from '@/api/staff.api';
import { LinkButton } from '@/ui/Button';
import { Marquee } from '@/ui/Marquee';
import { PersonPhoto } from '@/ui/PersonPhoto';
import { SectionHeading } from '@/ui/SectionHeading';

export async function StaffSection() {
  const staff = await getStaffWithPhotos();
  if (staff.length === 0) return null;

  return (
    <section aria-labelledby="staff" className="bg-canvas pb-14">
      <div className="mx-auto max-w-300 px-6 pt-20 pb-10">
        <SectionHeading
          id="staff"
          overline="The heartbeat of the event"
          title="Staff Members"
          action={
            <LinkButton href="/about#staff" size="lg">
              View All
              <ArrowRight className="size-5" aria-hidden />
            </LinkButton>
          }
        />
      </div>
      <Marquee label="Staff members" durationSeconds={staff.length * 3}>
        {staff.map((member) => (
          <li key={member.id} className="flex w-52 shrink-0 flex-col items-center px-4 text-center">
            <PersonPhoto src={member.image} name={member.name} size={160} className="rounded-full" />
            <p className="mt-3 font-semibold text-ink">{member.name}</p>
            <p className="text-xs text-muted">{member.team}</p>
          </li>
        ))}
      </Marquee>
    </section>
  );
}
