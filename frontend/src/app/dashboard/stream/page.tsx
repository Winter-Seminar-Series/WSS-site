'use server';

import { fetchStreamEvents } from '../../../lib/api/dashboard/stream';
import StreamEvents from './StreamEvents';

export default async function Stream() {
  const streamEvents = await fetchStreamEvents();

  return <StreamEvents events={streamEvents} />;
}
