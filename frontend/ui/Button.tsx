import Link from 'next/link';
import type { ButtonHTMLAttributes, ComponentProps } from 'react';

export type ButtonVariant = 'primary' | 'light' | 'outline-light' | 'soft' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-strong',
  light: 'bg-surface text-ink hover:bg-surface-hover',
  'outline-light': 'border border-white/30 text-white hover:bg-white/10',
  soft: 'bg-brand-soft text-brand-strong hover:bg-brand-muted/50',
  ghost: 'text-brand hover:bg-brand-soft',
  danger: 'text-danger hover:bg-danger-soft',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-4 text-sm',
  md: 'min-h-11 px-5 text-base',
  lg: 'min-h-14 px-8 text-lg',
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md'): string {
  return `inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant, size, className = '', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={`${buttonClasses(variant, size)} ${className}`} {...props} />;
}

interface LinkButtonProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function LinkButton({ variant, size, className = '', ...props }: LinkButtonProps) {
  return <Link className={`${buttonClasses(variant, size)} ${className}`} {...props} />;
}
