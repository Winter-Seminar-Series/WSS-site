import { Award, CirclePlay, FileImage, PlaySquare, Ticket, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface DashboardTab {
  href: string;
  label: string;
  Icon: LucideIcon;
  /** Tabs are switched off between editions rather than deleted; the pages stay reachable by URL. */
  visible: boolean;
}

export const DASHBOARD_TABS: DashboardTab[] = [
  { href: '/dashboard/profile', label: 'Profile', Icon: UserRound, visible: true },
  { href: '/dashboard/register', label: 'Registration', Icon: Ticket, visible: false },
  { href: '/dashboard/stream', label: 'Stream', Icon: CirclePlay, visible: true },
  { href: '/dashboard/videos', label: 'Videos', Icon: PlaySquare, visible: false },
  { href: '/dashboard/certificates', label: 'Certificates', Icon: Award, visible: true },
  { href: '/dashboard/poster-session', label: 'Poster Session', Icon: FileImage, visible: false },
];

/** Registration switches for the current edition. */
export const REGISTRATION = {
  inPersonOpen: false,
  posterSubmissionOpen: false,
} as const;

export const isInPersonMode = (name: string): boolean => name.toLowerCase().startsWith('in person');
export const isLunchAddOn = (name: string): boolean => name.toLowerCase().includes('lunch');
