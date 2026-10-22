import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';

export const inputClasses =
  'min-h-12 w-full rounded-lg border border-line bg-surface px-4 py-3 text-base font-semibold text-ink placeholder:font-normal placeholder:text-muted focus:border-brand focus:outline-none disabled:bg-canvas';

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  /** Rendered to the right of the label, e.g. a "Forgot password?" link. */
  action?: ReactNode;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, required, action, hint, children, className = '' }: FieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm font-medium tracking-wide text-muted uppercase">
          {label}
          {required && (
            <span className="ms-1 text-brand" aria-hidden>
              *
            </span>
          )}
        </label>
        {action}
      </div>
      {children}
      {hint && <p className="text-sm text-muted">{hint}</p>}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  action?: ReactNode;
  hint?: string;
}

export function TextField({ label, name, id = name, required, action, hint, className, ...props }: TextFieldProps) {
  return (
    <Field label={label} htmlFor={id} required={required} action={action} hint={hint} className={className}>
      <input id={id} name={name} required={required} className={inputClasses} {...props} />
    </Field>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: readonly string[] | readonly { value: string; label: string }[];
  placeholder?: string;
}

export function SelectField({ label, name, id = name, options, placeholder, required, ...props }: SelectFieldProps) {
  return (
    <Field label={label} htmlFor={id} required={required}>
      <select id={id} name={name} required={required} className={inputClasses} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => {
          const { value, label: optionLabel } = typeof option === 'string' ? { value: option, label: option } : option;
          return (
            <option key={value} value={value}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </Field>
  );
}
