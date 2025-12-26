import { NextRequest } from 'next/server';

const CALLBACK_URL = 'https://mokh.sforati.ir/callback';

function redirectWithQuery(request: NextRequest): Response {
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(CALLBACK_URL);

  targetUrl.search = incomingUrl.search;

  return Response.redirect(targetUrl.toString(), 307);
}

export async function GET(request: NextRequest): Promise<Response> {
  return redirectWithQuery(request);
}

export async function POST(request: NextRequest): Promise<Response> {
  return redirectWithQuery(request);
}
