'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

import { filterSelectOptions, findSelectOption } from '@/lib/select-search';
import type { SelectOption } from '@/lib/select-search';
import { useFieldErrors } from '@/ui/ValidatedForm';

// 16px text on phones: anything smaller makes iOS Safari zoom into the field on focus.
// Read-only styles key on the attribute because the `:read-only` pseudo-class also matches every <select>.
export const inputClasses =
  'min-h-12 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base font-medium text-ink transition-[border-color,box-shadow] duration-200 placeholder:font-normal placeholder:text-muted/80 hover:border-brand-muted focus:border-brand focus:shadow-[0_0_0_4px] focus:shadow-brand/15 focus:outline-none disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted [&[readonly]]:cursor-default [&[readonly]]:bg-canvas [&[readonly]]:text-muted';

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  /** Rendered to the right of the label, e.g. a "Forgot password?" link. */
  action?: ReactNode;
  hint?: string;
  children: ReactNode;
  error?: string[];
  className?: string;
}

export function Field({ label, htmlFor, required, action, hint, children, error, className = '' }: FieldProps) {
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
      {error && (
        <p id={`${htmlFor}-error`} className="col-span-2 text-sm font-medium text-danger">
          {error.join(' ')}
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
  const error = useFieldErrors(name);
  const describedBy =
    [props['aria-describedby'], hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <Field
      label={label}
      htmlFor={id}
      required={required}
      action={action}
      hint={hint}
      error={error}
      className={className}
    >
      <input
        {...props}
        id={id}
        name={name}
        required={required}
        className={`${inputClasses} aria-invalid:border-danger aria-invalid:focus:shadow-danger/15`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
    </Field>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: readonly string[] | readonly SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  allowCustom?: boolean;
}

export function SelectField({
  label,
  name,
  options,
  placeholder,
  defaultValue = '',
  allowCustom = false,
}: SelectFieldProps) {
  const error = useFieldErrors(name);
  const selectRef = useRef<HTMLSelectElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState(defaultValue);
  const [query, setQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const choices = options.map((option) => (typeof option === 'string' ? { value: option, label: option } : option));
  // Keep older saved values selectable even when they are absent from the current suggestions.
  for (const value of [defaultValue, selected]) {
    if (value && !choices.some((option) => option.value === value)) choices.push({ value, label: value });
  }
  const search = query?.trim() ?? '';
  const filtered = filterSelectOptions(choices, search);
  if (allowCustom && search && !findSelectOption(choices, search)) {
    filtered.push({ value: search, label: `Use “${search}”` });
    choices.push({ value: search, label: search });
  }
  const visible = [...filtered, { value: '', label: 'None' }];
  const display = choices.find((option) => option.value === selected)?.label ?? selected;

  useEffect(() => {
    const reset = () => {
      setSelected(defaultValue);
      setQuery(null);
      setOpen(false);
      setActive(-1);
    };
    const form = selectRef.current?.form;
    form?.addEventListener('reset', reset);
    return () => form?.removeEventListener('reset', reset);
  }, [defaultValue]);

  useEffect(() => {
    if (open && active >= 0) listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  function choose(value: string) {
    value = findSelectOption(choices, value)?.value ?? value;
    const select = selectRef.current;
    if (select) {
      select.value = value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    setSelected(value);
    setQuery(null);
    setOpen(false);
    setActive(-1);
  }

  return (
    <Field label={label} htmlFor={name} error={error}>
      <div className="relative">
        <input
          id={name}
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={`${name}-options`}
          aria-activedescendant={open && active >= 0 ? `${name}-option-${active}` : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          placeholder={placeholder ?? 'Search…'}
          value={query ?? display}
          maxLength={allowCustom ? 100 : undefined}
          className={`${inputClasses} pe-10 aria-invalid:border-danger`}
          onFocus={() => {
            setOpen(true);
            setActive(-1);
          }}
          onClick={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onBlur={() => {
            if (allowCustom && query !== null) choose(query.trim());
            else {
              setQuery(null);
              setOpen(false);
              setActive(-1);
            }
          }}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              setOpen(true);
              setActive((index) =>
                event.key === 'ArrowDown'
                  ? Math.min(index + 1, visible.length - 1)
                  : index < 0
                    ? visible.length - 1
                    : Math.max(index - 1, 0),
              );
            } else if (open && (event.key === 'Home' || event.key === 'End')) {
              event.preventDefault();
              setActive(event.key === 'Home' ? 0 : visible.length - 1);
            } else if (event.key === 'Enter' && open) {
              event.preventDefault();
              if (active >= 0) choose(visible[active].value);
              else if (allowCustom && query !== null) choose(query.trim());
            } else if (event.key === 'Escape') {
              event.preventDefault();
              setQuery(null);
              setOpen(false);
              setActive(-1);
            }
          }}
        />
        <ChevronDown className="pointer-events-none absolute end-4 top-4 size-4 text-muted" aria-hidden="true" />
        <select
          ref={selectRef}
          name={name}
          defaultValue={defaultValue}
          onChange={(event) => setSelected(event.target.value)}
          hidden
          aria-hidden="true"
        >
          <option value="" />
          {choices.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {open && (
          <ul
            ref={listRef}
            id={`${name}-options`}
            role="listbox"
            aria-label={label}
            className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-line bg-surface p-1 shadow-lg"
          >
            {visible.map((option, index) => (
              <li
                key={option.value}
                id={`${name}-option-${index}`}
                role="option"
                aria-selected={option.value === selected}
                className={`flex min-h-11 cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm ${active === index ? 'bg-brand-soft text-brand' : 'text-ink hover:bg-brand-soft'} ${option.value === selected ? 'font-semibold' : ''}`}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => choose(option.value)}
              >
                {option.label}
              </li>
            ))}
            {!filtered.length && (
              <li role="presentation" className="px-3 py-2.5 text-sm text-muted">
                No matches found
              </li>
            )}
          </ul>
        )}
      </div>
    </Field>
  );
}
