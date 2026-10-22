'use client';

import { FileUp } from 'lucide-react';
import { useActionState } from 'react';

import { uploadPosterAction } from '@/actions/dashboard.actions';
import type { FormState } from '@/lib/form';
import { Alert } from '@/ui/Alert';
import { Field, inputClasses } from '@/ui/FormField';
import { SubmitButton } from '@/ui/SubmitButton';

interface Props {
  currentPosterUrl: string | null;
  open: boolean;
}

const INITIAL_STATE: FormState = {};

export function PosterUploadForm({ currentPosterUrl, open }: Props) {
  const [state, formAction] = useActionState(uploadPosterAction, INITIAL_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-ink">
        Poster Session Competition{!open && <span className="text-muted"> (deadline passed)</span>}
      </h2>
      <input type="hidden" name="replace" value={String(Boolean(currentPosterUrl))} />
      <Field label="Upload file" htmlFor="poster" hint="PDF only, up to 10MB.">
        <input
          id="poster"
          name="poster"
          type="file"
          accept="application/pdf"
          disabled={!open}
          required
          className={`${inputClasses} file:me-4 file:rounded-md file:border-0 file:bg-brand-soft file:px-4 file:py-2 file:font-semibold file:text-brand`}
        />
      </Field>
      {currentPosterUrl && (
        <p className="text-muted">
          Current file:{' '}
          <a
            href={currentPosterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-brand underline"
          >
            View your uploaded poster
          </a>
        </p>
      )}
      {state.error && <Alert tone="error">{state.error}</Alert>}
      {state.success && <Alert tone="success">{state.success}</Alert>}
      <SubmitButton className="w-full" disabled={!open}>
        <FileUp className="size-5" aria-hidden />
        {currentPosterUrl ? 'Replace Poster' : 'Upload Poster'}
      </SubmitButton>
    </form>
  );
}
