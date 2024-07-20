import { CertificateInfo } from '../../types';
import { fetchJsonWithAuth } from '../fetch';

type CertificateInfoResponse = {
  id: number;
  participation: number;
  description: string;
  date: string;
  uuid: string;
}[];

export async function fetchCertificateInfos() {
  const url = `${process.env.API_ORIGIN}/api/attachment/1/`;

  const response = await fetchJsonWithAuth<CertificateInfoResponse>(url);

  const certificateInfos: CertificateInfo[] = await Promise.all(
    response.map(async (certificateInfoResponse) => {
      const date = new Date(certificateInfoResponse.date);

      return {
        date,
        description: certificateInfoResponse.description,
        uuid: certificateInfoResponse.uuid,
      };
    }),
  );

  return certificateInfos;
}
