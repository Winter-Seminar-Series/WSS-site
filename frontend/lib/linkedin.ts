import { LINKEDIN_ORGANIZATION_ID } from '@/lib/site';

interface Certification {
  name: string;
  issueDate: string;
  url: string;
  id: string;
}

export function linkedInAddCertificationUrl({ name, issueDate, url, id }: Certification): string {
  const issued = new Date(issueDate);
  const params = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name,
    organizationId: String(LINKEDIN_ORGANIZATION_ID),
    issueYear: String(issued.getUTCFullYear()),
    issueMonth: String(issued.getUTCMonth() + 1),
    certUrl: url,
    certId: id,
  });
  return `https://www.linkedin.com/profile/add?${params}`;
}
