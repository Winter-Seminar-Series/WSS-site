import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';

// 16px text on phones: anything smaller makes iOS Safari zoom into the field on focus.
export const inputClasses =
  'min-h-12 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base font-medium text-ink transition-[border-color,box-shadow] duration-200 placeholder:font-normal placeholder:text-muted/80 hover:border-brand-muted focus:border-brand focus:shadow-[0_0_0_4px] focus:shadow-brand/15 focus:outline-none disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted';

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
    <div className={`grid grid-cols-[1fr_auto] items-start gap-x-2 gap-y-2 ${className}`}>
      <div className="col-start-1 row-start-1 flex min-h-6 items-center">
        <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
          {label}
          {required && (
            <span className="ms-0.5 text-brand" aria-hidden>
              *
            </span>
          )}
        </label>
      </div>
      <div className="col-span-2 min-w-0">{children}</div>
      {action && <div className="col-start-2 row-start-1 flex min-h-6 items-center">{action}</div>}
      {hint && (
        <p id={`${htmlFor}-hint`} className="col-span-2 text-sm text-muted">
          {hint}
        </p>
      )}
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
      <input
        id={id}
        name={name}
        required={required}
        className={inputClasses}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...props}
      />
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
