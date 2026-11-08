'use client';

import { useActionState } from 'react';

import { updateProfileAction } from '@/actions/profile.actions';
import type { FormState } from '@/lib/form';
import { GENDERS, GRADES, INTRODUCTION_METHODS, JOBS, MAJORS, PROVINCES } from '@/lib/profile-options';
import type { Profile } from '@/types/participant.type';
import { Alert } from '@/ui/Alert';
import { ChoiceGroup } from '@/ui/ChoiceGroup';
import { Field, SelectField, TextField } from '@/ui/FormField';
import { Panel } from '@/ui/Panel';
import { StickyActionBar } from '@/ui/StickyActionBar';
import { SubmitButton } from '@/ui/SubmitButton';
import { ValidatedForm } from '@/ui/ValidatedForm';

interface Props {
  profile: Profile;
}

const INITIAL_STATE: FormState = {};

export function ProfileForm({ profile }: Props) {
  const [state, formAction] = useActionState(updateProfileAction, INITIAL_STATE);
  // After a failed submit React resets the form; fall back to what the user typed, then to the saved profile.
  const value = (name: keyof Profile): string => state.values?.[name] ?? String(profile[name] ?? '');

  return (
    <ValidatedForm state={state} action={formAction} className="flex flex-col gap-5 md:gap-6">
      <Panel
        id="personal"
        title="Personal info"
        description="Your name is printed on your certificate as written here."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <TextField label="Email" name="email" type="email" value={profile.email} readOnly autoComplete="email" />
          <TextField
            label="Phone number"
            name="phoneNumber"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="09123456789"
            defaultValue={value('phoneNumber')}
            required
          />
          <TextField
            label="First name"
            name="firstName"
            autoComplete="given-name"
            defaultValue={value('firstName')}
            required
          />
          <TextField
            label="Last name"
            name="lastName"
            autoComplete="family-name"
            defaultValue={value('lastName')}
            required
          />
          <SelectField
            label="Province"
            name="city"
            options={PROVINCES}
            placeholder="Choose your province"
            defaultValue={value('city')}
          />
          <TextField label="Birthday" name="birthDate" type="date" defaultValue={value('birthDate')} />
          <TextField
            label="National code"
            name="nationalCode"
            inputMode="numeric"
            maxLength={10}
            hint="Required for in-person attendance."
            defaultValue={value('nationalCode')}
          />
          <ChoiceGroup legend="Gender" name="gender" options={GENDERS} defaultValue={value('gender')} />
        </div>
      </Panel>

      <Panel id="professional" title="Studies and work" description="Helps us match talks and sponsors to who attends.">
        <div className="grid gap-5 lg:grid-cols-2">
          <TextField
            label="University"
            name="university"
            autoComplete="organization"
            defaultValue={value('university')}
          />
          <SelectField
            label="Major"
            name="major"
            options={MAJORS}
            placeholder="Choose your major"
            defaultValue={value('major')}
          />
          <SelectField
            label="Job"
            name="job"
            options={JOBS}
            placeholder="Choose your job"
            defaultValue={value('job')}
          />
          <Field label="Status" htmlFor="isOpenToWork">
            <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line px-4 font-medium text-ink transition-colors hover:border-brand-muted has-checked:border-brand has-checked:bg-brand-soft">
              <input
                id="isOpenToWork"
                name="isOpenToWork"
                type="checkbox"
                defaultChecked={state.values ? state.values.isOpenToWork === 'on' : profile.isOpenToWork}
                className="size-5 accent-brand"
              />
              I&apos;m open to work
            </label>
          </Field>
          <TextField
            label="Fields of interest"
            name="fieldsOfInterest"
            placeholder="e.g. Machine learning, Systems"
            defaultValue={value('fieldsOfInterest')}
            className="lg:col-span-2"
          />
          <ChoiceGroup legend="Grade" name="grade" options={GRADES} defaultValue={value('grade')} />
          <SelectField
            label="How did you hear about us?"
            name="introductionMethod"
            options={INTRODUCTION_METHODS}
            placeholder="Choose one"
            defaultValue={value('introductionMethod')}
          />
          <TextField
            label="LinkedIn"
            name="linkedin"
            placeholder="linkedin.com/in/…"
            defaultValue={value('linkedin')}
          />
          <TextField label="GitHub" name="github" placeholder="github.com/…" defaultValue={value('github')} />
        </div>
      </Panel>

      {state.error && <Alert tone="error">{state.error}</Alert>}
      {state.success && <Alert tone="success">{state.success}</Alert>}
      <StickyActionBar>
        <p className="hidden grow ps-3 text-sm text-muted sm:block">Changes are saved when you press the button.</p>
        <SubmitButton size="md" className="w-full sm:w-auto">
          Save profile
        </SubmitButton>
      </StickyActionBar>
    </ValidatedForm>
  );
}
