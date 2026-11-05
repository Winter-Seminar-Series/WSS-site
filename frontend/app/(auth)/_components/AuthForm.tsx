'use client';

import { useActionState } from 'react';
import type { ReactNode } from 'react';

import type { FormState } from '@/lib/form';
import { Alert } from '@/ui/Alert';
import { TextField } from '@/ui/FormField';
import { SubmitButton } from '@/ui/SubmitButton';

export interface AuthField {
  name: string;
  label: string;
  type: 'email' | 'password';
  placeholder: string;
  autoComplete: string;
  action?: ReactNode;
}

interface Props {
  /** One sentence under the title: what the form is for. */
  lead: string;
  title: string;
  fields: AuthField[];
  submitLabel: string;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  /** Hidden inputs, e.g. the reset token or the post-login redirect. */
  hidden?: Record<string, string>;
  notice?: string;
  footer?: ReactNode;
}

export function AuthForm({ lead, title, fields, submitLabel, action, hidden = {}, notice, footer }: Props) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      <header>
        <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-ink md:text-5xl">{title}</h1>
        <p className="mt-3 text-lg text-muted">{lead}</p>
      </header>

      {notice && !state.error && !state.success && <Alert tone="success">{notice}</Alert>}
      {state.error && <Alert tone="error">{state.error}</Alert>}
      {state.success && <Alert tone="success">{state.success}</Alert>}

      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div className="flex flex-col gap-5">
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            action={field.action}
            defaultValue={state.values?.[field.name]}
            required
          />
        ))}
      </div>

      <SubmitButton className="mt-1 w-full">{submitLabel}</SubmitButton>
      {footer && <div className="text-center text-[0.9375rem] text-muted">{footer}</div>}
    </form>
  );
}
