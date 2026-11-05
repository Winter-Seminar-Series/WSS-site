import { ExternalLink, KeyRound, PlaySquare } from 'lucide-react';
import type { Metadata } from 'next';

import { getVideoLicenses } from '@/api/participation.api';
import { CopyButton } from '@/components/dashboard/CopyButton';
import { withAuth } from '@/lib/auth-guard';
import { buttonClasses } from '@/ui/Button';
import { EmptyPanel } from '@/ui/Panel';

export const metadata: Metadata = { title: 'Videos' };

export default async function VideosPage() {
  const licenses = await withAuth(getVideoLicenses, '/dashboard/videos');

  if (licenses.length === 0) {
    return (
      <EmptyPanel Icon={PlaySquare} title="No video licences yet">
        When you buy access to the recordings, the licence keys for SpotPlayer appear here.
      </EmptyPanel>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {licenses.map((license) => (
        <li
          key={license.licenseKey}
          className="flex flex-col gap-4 rounded-3xl bg-surface p-5 ring-1 ring-line-soft md:p-6"
        >
          <h2 className="text-lg font-bold text-ink">{license.title}</h2>
          <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-canvas px-4 py-3">
            <KeyRound className="size-5 shrink-0 text-muted" aria-hidden />
            <code className="min-w-0 grow truncate font-mono text-sm text-ink select-all">{license.licenseKey}</code>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <CopyButton value={license.licenseKey} label="Copy licence" />
            <a
              href="https://app.spotplayer.ir/player/help/"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('outline', 'sm')}
            >
              How to use
              <ExternalLink className="size-4" aria-hidden />
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
