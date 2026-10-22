'use client';

import { LoaderCircle, Play } from 'lucide-react';
import { useTransition } from 'react';

import { streamLinkAction } from '@/actions/dashboard.actions';
import { toast } from '@/lib/toast';
import { Button } from '@/ui/Button';

interface Props {
  eventId: number;
  live: boolean;
}

export function AttendButton({ eventId, live }: Props) {
  const [pending, startTransition] = useTransition();

  const attend = () => {
    // Open synchronously so popup blockers allow it, then point it at the room once the link arrives.
    const tab = window.open('', '_blank');
    startTransition(async () => {
      const result = await streamLinkAction(eventId);
      if (!result.ok) {
        tab?.close();
        toast.error(result.error);
        return;
      }
      if (tab) tab.location.href = result.data;
      else window.location.href = result.data;
    });
  };

  return (
    <Button onClick={attend} disabled={pending} variant={live ? 'primary' : 'soft'} className="min-w-28">
      {pending ? <LoaderCircle className="size-5 animate-spin" aria-hidden /> : <Play className="size-5" aria-hidden />}
      Attend
    </Button>
  );
}
