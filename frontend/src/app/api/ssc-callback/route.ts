import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  return Response.redirect('https://mokh.sforati.ir/callback', 307);
}

export async function GET(request: NextRequest): Promise<Response> {
  return Response.redirect('https://mokh.sforati.ir/callback', 307);
}
