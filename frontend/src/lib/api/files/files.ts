import { FileInfo } from '../../types';
import { fetchJson } from '../fetch';

type FileInfoResponse = { attachment: string; }

export async function fetchFileInfo(id: string) {
  const url = `${process.env.API_ORIGIN}/api/file/${id}/`;

  const response = await fetchJson<FileInfoResponse>(url);

  const fileInfo: FileInfo = response;

  return fileInfo;
}

