import { Award, Download, Linkedin } from 'lucide-react';
import type { Metadata } from 'next';

import { getCertificates } from '@/api/participation.api';
import { CopyButton } from '@/components/dashboard/CopyButton';
import { withAuth } from '@/lib/auth-guard';
import { groupCertificatesByEdition } from '@/lib/certificates';
import { linkedInAddCertificationUrl } from '@/lib/linkedin';
import { SITE_URL } from '@/lib/site';
import { buttonClasses } from '@/ui/Button';
import { EmptyPanel } from '@/ui/Panel';

export const metadata: Metadata = { title: 'Certificates' };

export default async function CertificatesPage() {
  const certificates = await withAuth(getCertificates, '/dashboard/certificates');

  if (certificates.length === 0) {
    return (
      <EmptyPanel Icon={Award} title="No certificates yet">
        Your certificates appear here after each event, for every programme you attended, in every edition.
      </EmptyPanel>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {groupCertificatesByEdition(certificates).map((group) => (
        <section key={group.key} aria-labelledby={`certificates-${group.key}`} className="flex flex-col gap-4">
          <h2 id={`certificates-${group.key}`} className="text-xl font-bold text-ink">
            {group.label}
          </h2>
          <ul className="grid gap-4 lg:grid-cols-2">
            {group.certificates.map((certificate) => {
              const url = `${SITE_URL}/files/${encodeURIComponent(certificate.fileId)}`;
              return (
                <li
                  key={certificate.id}
                  className="flex flex-col gap-5 rounded-3xl bg-surface p-5 ring-1 ring-line-soft md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                      <Award className="size-6" aria-hidden />
                    </span>
                    <h3 className="pt-2.5 text-lg leading-snug font-bold text-ink">{certificate.plan}</h3>
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${buttonClasses('primary', 'sm')} col-span-2`}
                    >
                      <Download className="size-4" aria-hidden />
                      Download
                    </a>
                    <a
                      href={linkedInAddCertificationUrl({
                        name: certificate.plan,
                        issueDate: certificate.date,
                        url,
                        id: certificate.fileId,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClasses('outline', 'sm')}
                    >
                      <Linkedin className="size-4" aria-hidden />
                      Add to LinkedIn
                    </a>
                    <CopyButton value={url} label="Copy link" />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
