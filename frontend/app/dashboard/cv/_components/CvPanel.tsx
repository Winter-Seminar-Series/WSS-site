'use client';

import { ExternalLink, FileText, FileUp, Trash2 } from 'lucide-react';
import { useActionState } from 'react';
import type { FormEvent } from 'react';

import { cvAction } from '@/actions/dashboard.actions';
import { formatDateTime } from '@/lib/dates';
import type { FormState } from '@/lib/form';
import type { Cv } from '@/types/participant.type';
import { Alert } from '@/ui/Alert';
import { buttonClasses } from '@/ui/Button';
import { Panel } from '@/ui/Panel';
import { SubmitButton } from '@/ui/SubmitButton';
import { ValidatedForm, useFieldErrors } from '@/ui/ValidatedForm';

interface Props {
  cv: Cv | null;
  /** Edition name, e.g. "11th WSS": the CV belongs to it alone. */
  editionLabel: string;
  open: boolean;
}

const INITIAL_STATE: FormState = {};

function formatSize(bytes: number): string {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function CvPanel({ cv, editionLabel, open }: Props) {
  // One state for both forms: the message always belongs to the last thing the participant did.
  const [state, formAction] = useActionState(cvAction, INITIAL_STATE);

  const confirmDelete = (event: FormEvent<HTMLFormElement>) => {
    if (!window.confirm(`Remove your CV from the ${editionLabel}?`)) event.preventDefault();
  };

  return (
    <Panel
      id="cv"
      title={`Your CV for the ${editionLabel}`}
      description={
        open
          ? 'Upload it as a PDF of up to 5 MB. CVs are kept per edition, so one sent to an earlier edition is not carried over.'
          : 'This edition no longer takes CVs.'
      }
    >
      <div className="flex flex-col gap-5">
        {cv && (
          <div className="flex flex-col gap-4 rounded-2xl bg-canvas p-4 ring-1 ring-line-soft sm:flex-row sm:items-center">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <FileText className="size-6" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-ink" title={cv.fileName}>
                {cv.fileName}
              </p>
              <p className="text-sm text-muted">
                {formatSize(cv.size)} · Updated {formatDateTime(cv.updatedAt)}
              </p>
            </div>
            <div className="flex gap-2">
              {/* A route handler, not the signed URL itself: that expires while the page stays open. */}
              <a
                href="/dashboard/cv/file"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses('outline', 'sm')}
              >
                <ExternalLink className="size-4" aria-hidden />
                View
                <span className="sr-only"> your CV (opens in a new tab)</span>
              </a>
              <form action={formAction} onSubmit={confirmDelete}>
                <input type="hidden" name="intent" value="delete" />
                <SubmitButton variant="danger" size="sm">
                  <Trash2 className="size-4" aria-hidden />
                  Remove
                  <span className="sr-only"> your CV</span>
                </SubmitButton>
              </form>
            </div>
          </div>
        )}

        <ValidatedForm state={state} action={formAction} className="flex flex-col gap-5">
          <label
            htmlFor="cv-file"
            className={`flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-line px-6 py-10 text-center transition-colors ${
              open
                ? 'cursor-pointer hover:border-brand-muted hover:bg-brand-soft/40 has-focus-visible:border-brand'
                : 'cursor-not-allowed bg-canvas'
            }`}
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand">
              <FileUp className="size-6" aria-hidden />
            </span>
            <span className="font-bold text-ink">{cv ? 'Choose a new PDF' : 'Choose your CV'}</span>
            <CvInput open={open} />
          </label>

          {state.error && <Alert tone="error">{state.error}</Alert>}
          {state.success && <Alert tone="success">{state.success}</Alert>}
          <SubmitButton size="md" className="w-full sm:w-auto sm:self-start" disabled={!open}>
            {cv ? 'Replace CV' : 'Upload CV'}
          </SubmitButton>
        </ValidatedForm>
      </div>
    </Panel>
  );
}

function CvInput({ open }: { open: boolean }) {
  const error = useFieldErrors('file');
  return (
    <>
      <input
        id="cv-file"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'cv-file-error' : undefined}
        name="file"
        type="file"
        accept="application/pdf,.pdf"
        disabled={!open}
        required
        className="w-full max-w-xs text-sm text-muted file:me-3 file:min-h-10 file:rounded-full file:border-0 file:bg-surface file:px-4 file:font-semibold file:text-ink file:ring-1 file:ring-line"
      />
      {error && (
        <p id="cv-file-error" className="text-sm font-medium text-danger">
          {error.join(' ')}
        </p>
      )}
    </>
  );
}
