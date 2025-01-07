import { CertificateInfo } from '../../types';
import { fetchJsonWithAuth } from '../fetch';

type CertificateInfoResponse = {
  id: number;
  plan: string;
  description: string;
  date: string;
  uuid: string;
}[];

export async function fetchCertificateInfos() {
  const url = `${process.env.API_ORIGIN}/api/attachment/${process.env.WSS_ORDER}/`;

  const response = await fetchJsonWithAuth<CertificateInfoResponse>(url);

  const certificateInfos: CertificateInfo[] = await Promise.all(
    response.map((certificateInfoResponse) => {
      const date = new Date(certificateInfoResponse.date);

      return {
        date,
        uuid: certificateInfoResponse.uuid,
        plan: certificateInfoResponse.plan,
      };
    }),
  );

  return certificateInfos;
}
