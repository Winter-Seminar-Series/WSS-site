'use client';

import { FileUp } from 'lucide-react';
import { useActionState } from 'react';

import { uploadPosterAction } from '@/actions/dashboard.actions';
import type { FormState } from '@/lib/form';
import { Alert } from '@/ui/Alert';
import { Panel } from '@/ui/Panel';
import { SubmitButton } from '@/ui/SubmitButton';
import { ValidatedForm, useFieldErrors } from '@/ui/ValidatedForm';

interface Props {
  currentPosterUrl: string | null;
  open: boolean;
}

const INITIAL_STATE: FormState = {};

export function PosterUploadForm({ currentPosterUrl, open }: Props) {
  const [state, formAction] = useActionState(uploadPosterAction, INITIAL_STATE);

  return (
    <Panel
      id="poster"
      title="Poster session competition"
      description={open ? 'Upload your poster as a PDF of up to 10 MB.' : 'The submission deadline has passed.'}
    >
      <ValidatedForm state={state} action={formAction} className="flex flex-col gap-5">
        <input type="hidden" name="replace" value={String(Boolean(currentPosterUrl))} />
        <label
          htmlFor="poster-file"
          className={`flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-line px-6 py-10 text-center transition-colors ${
            open
              ? 'cursor-pointer hover:border-brand-muted hover:bg-brand-soft/40 has-focus-visible:border-brand'
              : 'cursor-not-allowed bg-canvas'
          }`}
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand">
            <FileUp className="size-6" aria-hidden />
          </span>
          <span className="font-bold text-ink">{currentPosterUrl ? 'Choose a new PDF' : 'Choose your poster PDF'}</span>
          <PosterInput open={open} />
        </label>

        {currentPosterUrl && (
          <p className="text-[0.9375rem] text-muted">
            You have submitted a poster.{' '}
            <a
              href={currentPosterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand-strong underline underline-offset-4"
            >
              View it
            </a>
          </p>
        )}
        {state.error && <Alert tone="error">{state.error}</Alert>}
        {state.success && <Alert tone="success">{state.success}</Alert>}
        <SubmitButton size="md" className="w-full sm:w-auto sm:self-start" disabled={!open}>
          {currentPosterUrl ? 'Replace poster' : 'Upload poster'}
        </SubmitButton>
      </ValidatedForm>
    </Panel>
  );
}

function PosterInput({ open }: { open: boolean }) {
  const error = useFieldErrors('poster');
  return (
    <>
      <input
        id="poster-file"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'poster-error' : undefined}
        name="poster"
        type="file"
        accept="application/pdf"
        disabled={!open}
        required
        className="w-full max-w-xs text-sm text-muted file:me-3 file:min-h-10 file:rounded-full file:border-0 file:bg-surface file:px-4 file:font-semibold file:text-ink file:ring-1 file:ring-line"
      />
      {error && (
        <p id="poster-error" className="text-sm font-medium text-danger">
          {error.join(' ')}
        </p>
      )}
    </>
  );
}
