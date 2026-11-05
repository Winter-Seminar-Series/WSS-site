import Link from 'next/link';
import type { ButtonHTMLAttributes, ComponentProps } from 'react';

export type ButtonVariant = 'primary' | 'light' | 'outline' | 'outline-light' | 'soft' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white shadow-sm shadow-brand/25 hover:bg-brand-strong',
  light: 'bg-surface text-ink shadow-sm hover:bg-brand-soft',
  outline: 'border border-line bg-surface text-ink hover:border-brand-muted hover:bg-brand-soft',
  'outline-light': 'border border-white/40 text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/10',
  soft: 'bg-brand-soft text-brand-strong hover:bg-brand-muted/50',
  ghost: 'text-brand-strong hover:bg-brand-soft',
  danger: 'text-danger hover:bg-danger-soft',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  // `sm` is still 44px tall on touch screens; it only tightens on devices with a fine pointer.
  sm: 'min-h-11 px-4 text-sm pointer-fine:min-h-9',
  md: 'min-h-11 px-5 text-[0.9375rem]',
  lg: 'min-h-13 px-7 text-base',
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md'): string {
  return `inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-snap select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`;
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
