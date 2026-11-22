import { EDITIONS } from '@/lib/editions';
import type { Certificate } from '@/types/participant.type';

export interface CertificateGroup {
  /** Edition slug, or `earlier` for certificates of an event the registry doesn't list. */
  key: string;
  label: string;
  certificates: Certificate[];
}

/** Certificates grouped by edition, newest edition first. Empty editions are left out; order inside a group is kept. */
export function groupCertificatesByEdition(certificates: Certificate[]): CertificateGroup[] {
  const groups: CertificateGroup[] = EDITIONS.map((edition) => ({
    key: edition.slug,
    label: edition.label,
    certificates: certificates.filter((certificate) => certificate.eventId === edition.eventId),
  }));

  const known = new Set(EDITIONS.map((edition) => edition.eventId));
  groups.push({
    key: 'earlier',
    label: 'Earlier editions',
    certificates: certificates.filter((certificate) => !known.has(certificate.eventId)),
  });

  return groups.filter((group) => group.certificates.length > 0);
}
