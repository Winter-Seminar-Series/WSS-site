import { getAttendanceModes, getWorkshops } from '@/api/events.api';
import { CURRENT_EDITION } from '@/lib/editions';
import { httpGet } from '@/services/http';
import type { AttachmentResponse, FileResponse, ParticipationResponse } from '@/types/participant.api.type';
import type { Certificate, Participation, VideoLicense } from '@/types/participant.type';

export async function getParticipations(): Promise<Participation[]> {
  const response = await httpGet<ParticipationResponse[]>(`/participation/${CURRENT_EDITION.eventId}/`, { auth: true });
  return response.map((item) => ({ planId: item.plan, licenseKey: item.license_key }));
}

export async function getCertificates(): Promise<Certificate[]> {
  const response = await httpGet<AttachmentResponse[]>(`/attachment/${CURRENT_EDITION.eventId}/`, { auth: true });
  return response.map((item) => ({ id: item.id, plan: item.plan, date: item.date, fileId: item.UUID }));
}

/** SpotPlayer licenses for every paid plan that has one. */
export async function getVideoLicenses(): Promise<VideoLicense[]> {
  const [participations, workshops, modes] = await Promise.all([
    getParticipations(),
    getWorkshops(CURRENT_EDITION.eventId),
    getAttendanceModes(CURRENT_EDITION.eventId),
  ]);
  const planNames = new Map([...workshops, ...modes].map((plan) => [plan.id, plan.name]));
  return participations.flatMap(({ planId, licenseKey }) =>
    licenseKey ? [{ title: planNames.get(planId) ?? `Plan #${planId}`, licenseKey }] : [],
  );
}

/** Resolves a certificate id to its storage URL. Public: certificates are shared by link. */
export async function getFileUrl(fileId: string): Promise<string> {
  const { attachment } = await httpGet<FileResponse>(`/file/${encodeURIComponent(fileId)}/`);
  return attachment;
}
