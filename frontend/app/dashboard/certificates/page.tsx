import { Download, Linkedin } from 'lucide-react';
import type { Metadata } from 'next';

import { getCertificates } from '@/api/participation.api';
import { CopyButton } from '@/components/dashboard/CopyButton';
import { withAuth } from '@/lib/auth-guard';
import { linkedInAddCertificationUrl } from '@/lib/linkedin';
import { SITE_URL } from '@/lib/site';
import { buttonClasses } from '@/ui/Button';

export const metadata: Metadata = { title: 'Certificates' };

export default async function CertificatesPage() {
  const certificates = await withAuth(getCertificates, '/dashboard/certificates');

  if (certificates.length === 0) {
    return (
      <p className="py-20 text-center text-2xl font-semibold text-muted">
        Your certificates will appear here after the event.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {certificates.map((certificate) => {
        const url = `${SITE_URL}/files/${encodeURIComponent(certificate.fileId)}`;
        return (
          <li
            key={certificate.id}
            className="flex flex-col gap-3 rounded-md border border-line-soft p-4 md:flex-row md:items-center"
          >
            <p className="grow font-medium text-ink">{certificate.plan}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={linkedInAddCertificationUrl({
                  name: certificate.plan,
                  issueDate: certificate.date,
                  url,
                  id: certificate.fileId,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses('primary', 'sm')}
              >
                <Linkedin className="size-4" aria-hidden />
                Add to LinkedIn
              </a>
              <CopyButton value={url} label="Copy URL" />
              <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClasses('primary', 'sm')}>
                <Download className="size-4" aria-hidden />
                Download
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
