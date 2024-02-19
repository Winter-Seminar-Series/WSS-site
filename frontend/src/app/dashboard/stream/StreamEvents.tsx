import { StreamEvent as StreamEventType } from '../../../lib/types';
import StreamEvent from './StreamEvent';

export default function StreamEvents({
  events,
}: {
  events: StreamEventType[];
}) {
  return (
    <div className="w-full">
      {events && events.length ? (
        <div className="flex flex-col">
          {events.map((event) => (
            <StreamEvent key={event.id} streamEvent={event} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-3xl font-semibold">
          No event is currently streaming
        </div>
      )}
    </div>
  );
}
