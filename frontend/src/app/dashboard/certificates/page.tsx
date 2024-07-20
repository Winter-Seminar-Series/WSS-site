import { fetchCertificateInfos } from '../../../lib/api/dashboard/certificate';
import CertificateEntry from './CertificateEntry';

export default async function Certificates() {
  const certificateInfos = await fetchCertificateInfos();

  return (
    <div className="space-y-7">
      {certificateInfos.map((certificateInfo, index) => (
        <CertificateEntry key={index} certificateInfo={certificateInfo} />
      ))}
    </div>
  );
}
