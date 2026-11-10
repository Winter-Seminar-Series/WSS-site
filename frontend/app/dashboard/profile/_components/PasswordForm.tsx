'use client';

import { useActionState } from 'react';

import { changePasswordAction } from '@/actions/auth.actions';
import type { FormState } from '@/lib/form';
import { Alert } from '@/ui/Alert';
import { TextField } from '@/ui/FormField';
import { Panel } from '@/ui/Panel';
import { SubmitButton } from '@/ui/SubmitButton';
import { ValidatedForm } from '@/ui/ValidatedForm';

const INITIAL_STATE: FormState = {};

export function PasswordForm() {
  const [state, formAction] = useActionState(changePasswordAction, INITIAL_STATE);

  return (
    <Panel id="password" title="Password" description="Use at least 8 characters.">
      <ValidatedForm state={state} action={formAction} className="flex flex-col gap-5">
        <div className="grid gap-5 lg:grid-cols-3">
          <TextField
            label="Current password"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            required
          />
          <TextField
            label="New password"
            name="password"
            id="newPassword"
            type="password"
            autoComplete="new-password"
            required
          />
          <TextField
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>
        {state.error && <Alert tone="error">{state.error}</Alert>}
        {state.success && <Alert tone="success">{state.success}</Alert>}
        <SubmitButton size="md" variant="outline" className="self-start">
          Change password
        </SubmitButton>
      </ValidatedForm>
    </Panel>
  );
}
