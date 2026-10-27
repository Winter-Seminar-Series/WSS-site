import { getAttendanceModes, getWorkshops } from '@/api/events.api';
import { CURRENT_EDITION } from '@/lib/editions';
import { httpGet, isHttpError } from '@/services/http';
import type {
  AddonHoldingResponse,
  AttachmentResponse,
  FileResponse,
  ParticipationResponse,
} from '@/types/participant.api.type';
import type { Certificate, Participation, VideoLicense } from '@/types/participant.type';

export async function getParticipations(): Promise<Participation[]> {
  const response = await httpGet<ParticipationResponse[]>(`/participation/${CURRENT_EDITION.eventId}/`, { auth: true });
  return response.map((item) => ({ planId: item.plan, licenseKey: item.license_key }));
}

/** Add-on id → units the participant already holds in the current edition. */
export async function getAddonHoldings(): Promise<Record<number, number>> {
  try {
    const response = await httpGet<AddonHoldingResponse[]>(`/addon/${CURRENT_EDITION.eventId}/`, { auth: true });
    return Object.fromEntries(response.map((item) => [item.addon, item.quantity]));
  } catch (error) {
    // A backend from before add-ons has no such route: nothing is held.
    if (isHttpError(error, 404)) return {};
    throw error;
  }
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
