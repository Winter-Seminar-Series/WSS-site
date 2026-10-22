'use client';

import { LoaderCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

import { buttonClasses } from '@/ui/Button';
import type { ButtonSize, ButtonVariant } from '@/ui/Button';

interface Props {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
}

/** Disables itself and shows a spinner while its parent form's action is running. */
export function SubmitButton({ children, variant, size = 'lg', className = '', disabled }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      aria-busy={pending}
      className={`${buttonClasses(variant, size)} ${className}`}
    >
      {pending && <LoaderCircle className="size-5 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}
