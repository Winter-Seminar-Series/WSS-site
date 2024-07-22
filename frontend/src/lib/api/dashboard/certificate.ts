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
  const url = `${process.env.API_ORIGIN}/api/attachment/1/`;

  const response = await fetchJsonWithAuth<CertificateInfoResponse>(url);

  const certificateInfos: CertificateInfo[] = response;

  return certificateInfos;
}
