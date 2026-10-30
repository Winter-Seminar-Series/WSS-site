export type SessionLinkKind = 'video' | 'meeting' | 'other';

export interface SessionLinkInfo {
  label: string;
  kind: SessionLinkKind;
}

/** Known hosts, matched by suffix, so `www.youtube.com` and `m.youtube.com` both count. */
const KNOWN_HOSTS: [suffix: string, info: SessionLinkInfo][] = [
  ['youtube.com', { label: 'Watch on YouTube', kind: 'video' }],
  ['youtu.be', { label: 'Watch on YouTube', kind: 'video' }],
  ['aparat.com', { label: 'Watch on Aparat', kind: 'video' }],
  ['skyroom.online', { label: 'Join on Skyroom', kind: 'meeting' }],
  ['zoom.us', { label: 'Join on Zoom', kind: 'meeting' }],
  ['meet.google.com', { label: 'Join on Google Meet', kind: 'meeting' }],
];

/** What the button should say, from where the link points: "Open link" is the fallback for an unknown host. */
export function describeSessionLink(url: URL): SessionLinkInfo {
  const host = url.hostname.toLowerCase();
  const known = KNOWN_HOSTS.find(([suffix]) => host === suffix || host.endsWith(`.${suffix}`));
  return known?.[1] ?? { label: 'Open link', kind: 'other' };
}
