import { getAccessToken } from '@/services/session';

/*
 * The only way out to the Django API. Server-side only: the API origin and the session tokens never reach the
 * browser — client components call Server Actions, which call `api/`, which calls this.
 */

const API_ORIGIN = process.env.API_ORIGIN ?? 'http://localhost:8000';
export const API_BASE_URL = `${API_ORIGIN}/api`;

/** Edition-scoped endpoints take the `core_event.id` of the current edition. */
export const EVENT_ID = process.env.WSS_ORDER ?? '10';

/** Public content changes a few times a day at most; 15 minutes keeps pages static without going stale for long. */
export const PUBLIC_REVALIDATE_SECONDS = 900;

/*
 * `next build` never calls the API, so an image builds even while the API is down. During the build every public
 * GET answers an empty list (all of them are lists) with a 1s revalidate, which Next adopts for the page: the
 * build only emits a shell, and the first request after deploy regenerates it with real data (ISR).
 */
const IS_BUILD = process.env.NEXT_PHASE === 'phase-production-build';
const BUILD_PLACEHOLDER = 'data:application/json,[]';

export class HttpError extends Error {
  readonly status: number;
  readonly code: string | null;

  constructor(status: number, message: string, code: string | null = null) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  /** Attach the signed-in participant's access token. Authenticated requests are never cached. */
  auth?: boolean;
  /** Cache tags for public GETs, so a Server Action or webhook can `revalidateTag` them. */
  tags?: string[];
}

/** drf-standardized-errors: `{ type, errors: [{ code, detail, attr }] }`; some views answer with a bare string. */
async function readError(response: Response): Promise<HttpError> {
  const fallback = response.statusText || `Request failed with status ${response.status}`;
  try {
    const body: unknown = await response.json();
    if (typeof body === 'string') return new HttpError(response.status, body);
    if (body && typeof body === 'object' && 'errors' in body && Array.isArray(body.errors)) {
      const [first] = body.errors as unknown[];
      if (first && typeof first === 'object') {
        const detail = 'detail' in first && typeof first.detail === 'string' ? first.detail : fallback;
        const code = 'code' in first && typeof first.code === 'string' ? first.code : null;
        return new HttpError(response.status, detail, code);
      }
    }
  } catch {
    // Non-JSON body (HTML error page from a proxy, empty 404…).
  }
  return new HttpError(response.status, fallback);
}

async function request<T>(path: string, { method = 'GET', body, auth = false, tags }: RequestOptions): Promise<T> {
  const isForm = body instanceof FormData;
  const headers: Record<string, string> = { Accept: 'application/json' };
  // fetch sets the multipart boundary itself for FormData.
  if (body !== undefined && !isForm) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = await getAccessToken();
    if (!token) throw new HttpError(401, 'You need to sign in first.', 'not_authenticated');
    headers.Authorization = `Bearer ${token}`;
  }

  const cacheable = method === 'GET' && !auth;
  if (cacheable && IS_BUILD) return (await (await fetch(BUILD_PLACEHOLDER, { next: { revalidate: 1 } })).json()) as T;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    ...(cacheable ? { next: { revalidate: PUBLIC_REVALIDATE_SECONDS, tags } } : { cache: 'no-store' }),
  });

  if (!response.ok) throw await readError(response);
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export function httpGet<T>(path: string, options: Pick<RequestOptions, 'auth' | 'tags'> = {}): Promise<T> {
  return request<T>(path, { ...options, method: 'GET' });
}

export function httpPost<T>(path: string, body?: unknown, options: Pick<RequestOptions, 'auth'> = {}): Promise<T> {
  return request<T>(path, { ...options, method: 'POST', body });
}

export function httpPut<T>(path: string, body?: unknown, options: Pick<RequestOptions, 'auth'> = {}): Promise<T> {
  return request<T>(path, { ...options, method: 'PUT', body });
}

export function httpPatch<T>(path: string, body?: unknown, options: Pick<RequestOptions, 'auth'> = {}): Promise<T> {
  return request<T>(path, { ...options, method: 'PATCH', body });
}

export function isHttpError(error: unknown, status?: number): error is HttpError {
  return error instanceof HttpError && (status === undefined || error.status === status);
}
