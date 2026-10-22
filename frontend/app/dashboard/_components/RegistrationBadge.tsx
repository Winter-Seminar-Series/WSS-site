import { CircleCheck } from 'lucide-react';

import { getAttendanceModes } from '@/api/events.api';
import { getParticipations } from '@/api/participation.api';
import { withAuth } from '@/lib/auth-guard';
import { CURRENT_EDITION } from '@/lib/editions';

/** "Registered: Online" once the participant has paid for a mode of attendance of the current edition. */
export async function RegistrationBadge() {
  const [participations, modes] = await withAuth(
    () => Promise.all([getParticipations(), getAttendanceModes(CURRENT_EDITION.eventId)]),
    '/dashboard/profile',
  );
  const paidPlanIds = new Set(participations.map((participation) => participation.planId));
  const registeredMode = modes.find((mode) => paidPlanIds.has(mode.id));

  return (
    <p
      className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium md:px-6 md:py-4 md:text-base ${
        registeredMode ? 'bg-success-soft text-success' : 'bg-canvas text-ink'
      }`}
    >
      {registeredMode && <CircleCheck className="size-5" aria-hidden />}
      {registeredMode ? `Registered: ${registeredMode.name}` : 'Not registered yet'}
    </p>
  );
}
