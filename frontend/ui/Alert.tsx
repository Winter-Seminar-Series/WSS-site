import { CircleAlert, CircleCheck, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';

type AlertTone = 'error' | 'success' | 'warning';

const TONES: Record<AlertTone, { className: string; Icon: typeof CircleAlert }> = {
  error: { className: 'bg-danger-soft text-danger', Icon: CircleAlert },
  success: { className: 'bg-success-soft text-success', Icon: CircleCheck },
  warning: { className: 'bg-warning-soft text-ink', Icon: TriangleAlert },
};

interface Props {
  tone: AlertTone;
  children: ReactNode;
  className?: string;
}

export function Alert({ tone, children, className = '' }: Props) {
  const { className: toneClassName, Icon } = TONES[tone];
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-md p-4 font-medium ${toneClassName} ${className}`}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div>{children}</div>
    </div>
  );
}
