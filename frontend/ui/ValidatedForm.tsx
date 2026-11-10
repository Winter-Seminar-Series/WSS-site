'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ComponentProps } from 'react';

import type { FormState } from '@/lib/form';
import { Alert } from '@/ui/Alert';

const FieldErrors = createContext<Record<string, string[]>>({});

interface Props extends ComponentProps<'form'> {
  state: FormState;
}

/** Shared server-validation feedback; editing a field dismisses its stale error. */
export function ValidatedForm({ state, children, onChange, onSubmit, ...props }: Props) {
  const [clientErrors, setClientErrors] = useState<Record<string, string[]>>({});
  const ref = useRef<HTMLFormElement>(null);
  const [edited, setEdited] = useState<{ state: FormState; names: string[] }>({ state, names: [] });
  if (edited.state !== state) setEdited({ state, names: [] });
  const names = edited.state === state ? edited.names : [];
  const errors = {
    ...Object.fromEntries(Object.entries(state.fieldErrors ?? {}).filter(([name]) => !names.includes(name))),
    ...clientErrors,
  };

  // Focus is an external DOM operation, performed only when a submission returns errors.
  useEffect(() => {
    if (!state.error) return;
    const form = ref.current;
    const first = form?.querySelector<HTMLElement>(
      'input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"], [aria-invalid="true"] input',
    );
    if (first) first.focus();
    else form?.querySelector<HTMLElement>('[role="alert"]')?.focus();
  }, [state]);

  return (
    <FieldErrors value={errors}>
      <form
        {...props}
        ref={ref}
        noValidate
        onSubmit={(event) => {
          // Partially typed dates submit as empty strings; distinguish them from an intentionally blank date.
          const invalid = [...event.currentTarget.elements].filter(
            (control): control is HTMLInputElement => control instanceof HTMLInputElement && control.validity.badInput,
          );
          if (invalid.length) {
            event.preventDefault();
            setClientErrors(
              Object.fromEntries(
                invalid.map((control) => [
                  control.name,
                  [control.type === 'date' ? 'Enter a complete, valid date.' : 'Enter a valid value.'],
                ]),
              ),
            );
            invalid[0].focus();
            return;
          }
          setClientErrors({});
          onSubmit?.(event);
        }}
        onChange={(event) => {
          const target = event.target;
          if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLSelectElement ||
            target instanceof HTMLTextAreaElement
          ) {
            const name = target.name;
            if (clientErrors[name])
              setClientErrors(Object.fromEntries(Object.entries(clientErrors).filter(([field]) => field !== name)));
            if (state.fieldErrors?.[name] && !names.includes(name)) {
              setEdited({ state, names: [...names, name] });
            }
          }
          onChange?.(event);
        }}
      >
        {Object.keys(clientErrors).length > 0 && <Alert tone="error">Please correct the highlighted fields.</Alert>}
        {children}
      </form>
    </FieldErrors>
  );
}

export function useFieldErrors(name: string): string[] | undefined {
  return useContext(FieldErrors)[name];
}
