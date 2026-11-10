import { CircleAlert, CircleCheck, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';

type AlertTone = 'error' | 'success' | 'warning';

const TONES: Record<AlertTone, { className: string; Icon: typeof CircleAlert }> = {
  error: { className: 'border-danger/20 bg-danger-soft text-danger', Icon: CircleAlert },
  success: { className: 'border-success/20 bg-success-soft text-success', Icon: CircleCheck },
  warning: { className: 'border-warning/20 bg-warning-soft text-warning', Icon: TriangleAlert },
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
      tabIndex={tone === 'error' ? -1 : undefined}
      className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-[0.9375rem] font-medium motion-safe:animate-[rise_0.4s_var(--ease-snap)_both] ${toneClassName} ${className}`}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
