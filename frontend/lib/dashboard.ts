import { Award, CirclePlay, FileImage, FileUser, KeyRound, PlaySquare, Ticket, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface DashboardTab {
  href: string;
  label: string;
  /** Label in the phone tab bar, where width is tight. Defaults to `label`. */
  shortLabel?: string;
  /** One line under the page title saying what the tab is for. */
  description: string;
  Icon: LucideIcon;
  /** Tabs are switched off between editions rather than deleted; the pages stay reachable by URL. */
  visible: boolean;
  /**
   * On phones, whether the tab sits in the bottom bar itself or in its "More" sheet. The bar holds at most four tabs
   * plus "More", so each keeps a thumb-sized target.
   */
  phone: 'bar' | 'more';
}

export const DASHBOARD_TABS: DashboardTab[] = [
  {
    href: '/dashboard/profile',
    label: 'Profile',
    description: 'Your details appear on your certificate and help us plan the event.',
    Icon: UserRound,
    visible: true,
    phone: 'bar',
  },
  {
    href: '/dashboard/register',
    label: 'Registration',
    shortLabel: 'Register',
    description: 'Choose how you attend, add workshops and extras, then check out.',
    Icon: Ticket,
    visible: true,
    phone: 'bar',
  },
  {
    href: '/dashboard/stream',
    label: 'Stream',
    description: 'Join the sessions you registered for, live.',
    Icon: CirclePlay,
    visible: true,
    phone: 'bar',
  },
  {
    href: '/dashboard/videos',
    label: 'Videos',
    description: 'Licence keys for the recorded sessions.',
    Icon: PlaySquare,
    visible: false,
    phone: 'more',
  },
  {
    href: '/dashboard/certificates',
    label: 'Certificates',
    description: 'Download your certificates or add them to LinkedIn.',
    Icon: Award,
    visible: true,
    phone: 'bar',
  },
  {
    href: '/dashboard/poster-session',
    label: 'Posters',
    description: 'Submit your poster for the poster session competition.',
    Icon: FileImage,
    visible: true,
    phone: 'more',
  },
  {
    href: '/dashboard/cv',
    label: 'CV',
    description: 'Share your CV with this edition. Each edition asks for its own.',
    Icon: FileUser,
    visible: true,
    phone: 'more',
  },
  {
    href: '/dashboard/password',
    label: 'Password',
    description: 'Change the password you sign in with.',
    Icon: KeyRound,
    visible: true,
    phone: 'more',
  },
];

/** Registration switches for the current edition. */
export const REGISTRATION = {
  inPersonOpen: true,
  posterSubmissionOpen: true,
  /** The API also stops taking CVs once the edition's last day is over. */
  cvSubmissionOpen: true,
} as const;

/** Mirrors the API's CVSerializer.MAX_SIZE. */
export const MAX_CV_BYTES = 5 * 1024 * 1024;

export const isInPersonMode = (name: string): boolean => name.toLowerCase().startsWith('in person');
export const isLunchAddOn = (name: string): boolean => name.toLowerCase().includes('lunch');
