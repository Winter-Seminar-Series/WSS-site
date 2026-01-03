import { NextRequest, NextResponse } from 'next/server';
import { fetchFileInfo } from '../../../lib/api/files/files';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const { attachment } = await fetchFileInfo(id);

    const response = await fetch(attachment);

    if (!response.ok || !response.body) {
      return NextResponse.json(
        { status: response.status },
        { status: response.status },
      );
    }

    const contentType =
      response.headers.get('Content-Type') ?? 'application/octet-stream';
    const contentDisposition =
      response.headers.get('Content-Disposition') ??
      `attachment; filename="${id}"`;

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
      },
    });
  } catch (error) {
    return NextResponse.json({ status: 500 }, { status: 500 });
  }
}
