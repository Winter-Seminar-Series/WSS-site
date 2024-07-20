import { NextResponse } from 'next/server';
import { fetchFileInfo } from '../../../lib/api/files/files';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { attachment } = await fetchFileInfo(id);

  try {
    const response = await fetch(attachment);
    if (!response.ok) {
      return NextResponse.json({ status: response.status });
    }

    const contentType = response.headers.get('Content-Type');
    const contentDisposition = response.headers.get('Content-Disposition');
    const fileStream = response.body;

    return new NextResponse(fileStream, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
      },
    });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
