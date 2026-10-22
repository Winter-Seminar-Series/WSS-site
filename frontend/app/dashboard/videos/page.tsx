import type { Metadata } from 'next';

import { getVideoLicenses } from '@/api/participation.api';
import { CopyButton } from '@/components/dashboard/CopyButton';
import { withAuth } from '@/lib/auth-guard';
import { buttonClasses } from '@/ui/Button';

export const metadata: Metadata = { title: 'Videos' };

export default async function VideosPage() {
  const licenses = await withAuth(getVideoLicenses, '/dashboard/videos');

  if (licenses.length === 0) {
    return <p className="py-20 text-center text-2xl font-semibold text-muted">You have no video licenses yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-6">
      {licenses.map((license) => (
        <li key={license.licenseKey} className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-ink">{license.title}</h2>
          <div className="flex flex-col gap-3 rounded-md border border-line-soft p-4 md:flex-row md:items-center">
            <code className="grow overflow-hidden text-ellipsis select-all">{license.licenseKey}</code>
            <div className="flex gap-2">
              <a
                href="https://app.spotplayer.ir/player/help/"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses('soft', 'sm')}
              >
                How to use
              </a>
              <CopyButton value={license.licenseKey} label="Copy license" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
