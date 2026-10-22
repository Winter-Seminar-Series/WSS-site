'use client';

import { useActionState } from 'react';

import { changePasswordAction } from '@/actions/auth.actions';
import type { FormState } from '@/lib/form';
import { Alert } from '@/ui/Alert';
import { TextField } from '@/ui/FormField';
import { SubmitButton } from '@/ui/SubmitButton';

const INITIAL_STATE: FormState = {};

export function PasswordForm() {
  const [state, formAction] = useActionState(changePasswordAction, INITIAL_STATE);

  return (
    <form action={formAction} aria-labelledby="password-change" className="flex flex-col gap-6">
      <h2 id="password-change" className="text-3xl font-bold text-ink">
        Change Password
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        <TextField
          label="Current password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
        />
        <TextField label="New password" name="password" type="password" autoComplete="new-password" required />
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
      <SubmitButton className="w-full">Update Password</SubmitButton>
    </form>
  );
}
