import { ArrowRight, CircleCheck } from 'lucide-react';
import Link from 'next/link';

import { getAttendanceModes } from '@/api/events.api';
import { getParticipations } from '@/api/participation.api';
import { withAuth } from '@/lib/auth-guard';
import { DASHBOARD_TABS } from '@/lib/dashboard';
import { CURRENT_EDITION } from '@/lib/editions';

const REGISTRATION_OPEN = DASHBOARD_TABS.some((tab) => tab.href === '/dashboard/register' && tab.visible);

const PILL = 'flex min-h-10 shrink-0 items-center gap-2 self-start rounded-full px-4 text-sm font-semibold';

/** "Registered: Online" once the participant has paid for a mode of attendance of the current edition. */
export async function RegistrationBadge() {
  const [participations, modes] = await withAuth(
    () => Promise.all([getParticipations(), getAttendanceModes(CURRENT_EDITION.eventId)]),
    '/dashboard/profile',
  );
  const paidPlanIds = new Set(participations.map((participation) => participation.planId));
  const registeredMode = modes.find((mode) => paidPlanIds.has(mode.id));

  if (registeredMode) {
    return (
      <p className={`${PILL} bg-success-soft text-success ring-1 ring-success/20`}>
        <CircleCheck className="size-4" aria-hidden />
        Registered: {registeredMode.name}
      </p>
    );
  }
  if (REGISTRATION_OPEN) {
    return (
      <Link
        href="/dashboard/register"
        className={`${PILL} bg-brand text-white transition-colors hover:bg-brand-strong`}
      >
        Register for the {CURRENT_EDITION.label}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    );
  }
  return (
    <p className={`${PILL} bg-surface text-muted ring-1 ring-line-soft`}>
      Not registered for the {CURRENT_EDITION.label}
    </p>
  );
}
