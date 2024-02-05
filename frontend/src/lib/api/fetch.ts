import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';
import { getSession } from './session';
import { isAuthenticated } from '../auth';
import { redirect } from 'next/navigation';
import { refresh } from './auth/login';

export class FetchError extends Error {
  response: Response;
  status: number;
  message: string;
  constructor({
    status,
    message,
    response,
  }: {
    status: number;
    message: string;
    response: Response;
  }) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    this.response = response;
    this.status = status;
    this.message = message;
  }
}

export async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  body?: object,
  init?: Omit<RequestInit, 'body'>,
): Promise<JSON> {
  const fetchInit: RequestInit = init ?? {};

  fetchInit.headers = {
    ...init?.headers,
    'Content-Type': 'application/json',
  };

  if (body) {
    fetchInit.body = JSON.stringify(decamelizeKeys(body, { deep: true }));
  }

  const response = await fetch(input, fetchInit);

  if (!response.ok) {
    let message: any;
    try {
      message = await response.json();
    } catch (error) {
      message = response.statusText;
    }

    throw new FetchError({
      status: response.status,
      message: message,
      response,
    });
  }

  const data = await response.json();
  const camelCaseData = camelcaseKeys(data, { deep: true });
  return camelCaseData;
}

export async function fetchJsonWithAuth<JSON = unknown>(
  input: RequestInfo,
  body?: object,
  init?: Omit<RequestInit, 'body'>,
) {
  if (!(await isAuthenticated())) {
    redirect('/login');
  }

  const session = await getSession();
  const accessToken = session.accessToken;

  init ??= {};

  init.headers = {
    ...init?.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    return await fetchJson<JSON>(input, body, init);
  } catch (error) {
    if (error instanceof FetchError && error.status === 401) {
      await refresh();
      return await fetchJson<JSON>(input, body, init);
    } else {
      throw error;
    }
  }
}
